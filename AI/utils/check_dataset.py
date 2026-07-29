from pathlib import Path

dataset = Path("dataset/raw")

for folder in dataset.iterdir():
    if folder.is_dir():
        images = list(folder.glob("*"))
        print(f"{folder.name}: {len(images)} images")