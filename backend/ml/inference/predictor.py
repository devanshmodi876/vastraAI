import os

# Reduce PyTorch CPU memory/thread usage on Railway
os.environ["OMP_NUM_THREADS"] = "1"
os.environ["MKL_NUM_THREADS"] = "1"

import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = BASE_DIR / "models" / "textile_classifier.pth"

CLASSES = [
    "ajrakh",
    "bandhani",
    "chikankari",
    "ikat",
    "lehariya",
]


transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])


MODEL = None


def load_model():
    print("Loading textile model...")

    model = models.efficientnet_b0(weights=None)

    model.classifier[1] = nn.Linear(
        model.classifier[1].in_features,
        len(CLASSES)
    )

    model.load_state_dict(
        torch.load(
            MODEL_PATH,
            map_location="cpu",
            weights_only=True
        )
    )

    model.eval()

    print("Textile model loaded successfully")

    return model


def predict_image(image_path):

    global MODEL

    print("Predict started")
    print("Image:", image_path)

    if MODEL is None:
        MODEL = load_model()

    print("Opening image...")

    image = Image.open(image_path).convert("RGB")

    image = transform(image).unsqueeze(0)

    print("Running inference...")

    with torch.inference_mode():
        output = MODEL(image)

        probabilities = torch.softmax(output, dim=1)

        confidence, prediction = torch.max(
            probabilities,
            1
        )

    result = {
        "prediction": CLASSES[prediction.item()],
        "confidence": round(
            confidence.item() * 100,
            2
        ),
    }

    print("Prediction result:", result)

    return result