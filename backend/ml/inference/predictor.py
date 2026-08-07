import gc
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

MODEL = None

def load_model():
    print("STEP 1")
    model = models.efficientnet_b0(weights=None)

    print("STEP 2")
    model.classifier[1] = nn.Linear(
        model.classifier[1].in_features,
        len(CLASSES)
    )

    print("STEP 3")
    state = torch.load(MODEL_PATH, map_location="cpu")

    print("STEP 4")
    model.load_state_dict(state)

    print("STEP 5")
    model.eval()

    return model
def predict_image(image_path):
    print("Predict started")

    if MODEL is None:
        print("Loading model")
        MODEL = load_model()

    print("Opening image")