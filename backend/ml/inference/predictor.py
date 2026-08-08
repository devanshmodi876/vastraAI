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
    print("=== MODEL 1: Creating EfficientNet ===")

    model = models.efficientnet_b0(weights=None)

    print("=== MODEL 2: Replacing classifier ===")

    model.classifier[1] = nn.Linear(
        model.classifier[1].in_features,
        len(CLASSES)
    )

    print("=== MODEL 3: Loading weights ===")

    model.load_state_dict(
        torch.load(
            MODEL_PATH,
            map_location="cpu",
            weights_only=True
        )
    )

    print("=== MODEL 4: Loaded weights ===")

    model.eval()

    return model

def predict_image(image_path):
    global MODEL

    print("=== PREDICT 1 ===")
    print("Image:", image_path)

    if MODEL is None:
        print("=== PREDICT 2: Loading model ===")
        MODEL = load_model()
        print("=== PREDICT 3: Model loaded ===")

    print("=== PREDICT 4: Opening image ===")

    image = Image.open(image_path).convert("RGB")

    print("=== PREDICT 5: Transforming ===")

    image = transform(image).unsqueeze(0)

    print("=== PREDICT 6: Inference ===")

    with torch.inference_mode():
        output = MODEL(image)

        probabilities = torch.softmax(output, dim=1)

        confidence, prediction = torch.max(
            probabilities, 1
        )

    print("=== PREDICT 7: Complete ===")

    return {
        "prediction": CLASSES[prediction.item()],
        "confidence": round(confidence.item() * 100, 2),
    }