import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torchvision import datasets
from torchvision import transforms
from torchvision import models

device = torch.device(
"cuda" if torch.cuda.is_available() else "cpu"
)
print(f"Using device: {device}")

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

dataset = datasets.ImageFolder(
    "AI/dataset/raw", transform=transform
)
print(dataset.classes)

loaders = DataLoader(
    dataset, batch_size=16, shuffle=True
)

model = models.efficientnet_b0(weights="DEFAULT")

model.classifier[1] = nn.Linear(
    model.classifier[1].in_features, 5
)

model.to(device)

criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

epochs = 5

for epoch in range(epochs):
    
    print(f"Epoch {epoch+1}")

    for images, labels in loaders:
        images = images.to(device)
        labels = labels.to(device)

        optimizer.zero_grad()

        outputs = model(images)

        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

    print(f"Loss: {loss.item()}")

torch.save(model.state_dict(), "AI/models/textile_classifier.pth")

print("Model saved!")