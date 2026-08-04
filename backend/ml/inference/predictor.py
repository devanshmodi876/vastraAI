import torch
import torch.nn as nn

from torchvision import models
from torchvision import transforms

from PIL import Image
from pathlib import Path    

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "models" / "textile_classifier.pth"

CLASSES = [
    "ajrakh",
    "bandhani",
    "chikankari",
    "ikat",
    "lehariya"
]

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])  

def load_model():
    model = models.efficientnet_b0(weights=None)
    model.classifier[1] = nn.Linear(
        model.classifier[1].in_features,
        len(CLASSES)
    )
    model.load_state_dict(
        torch.load(
            MODEL_PATH,
            map_location=torch.device("cpu")
        )
    )
    model.eval()
    return model

MODEL = load_model()
def predict_image(image_path):
    image = Image.open(image_path).convert("RGB")
    image = transform(image).unsqueeze(0)
    with torch.no_grad():
        output = MODEL(image)
        probabilities = torch.softmax(output, dim=1)
        confidence, prediction = torch.max(probabilities, 1)
    return {
        "prediction": CLASSES[prediction.item()],
        "confidence": round(confidence.item() * 100, 2)
    }