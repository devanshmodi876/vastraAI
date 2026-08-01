# VastraAI 👕🤖

An AI-powered textile classification web application that identifies fabric types from images using Deep Learning.

---

## Features

- AI-based textile classification
- React frontend
- Django REST Framework backend
- PyTorch CNN model
- REST API integration
- Image upload
- Real-time prediction

---

## Tech Stack

### Frontend

- React
- Vite
- CSS

### Backend

- Django
- Django REST Framework
- PostgreSQL
- Pillow

### AI

- PyTorch
- Torchvision
- OpenCV
- NumPy

---

## Project Structure

```text
frontend/
backend/
README.md
```

---

## Installation

### Clone

```bash
git clone https://github.com/YOUR_USERNAME/vastraAI.git

cd vastraAI
```

---

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## API

POST

```
http://127.0.0.1:8000/api/predict/
```

Form Data

```
image : image file
```

Response

```json
{
    "prediction": "Cotton"
}
```

---

## Screenshots

(Add screenshots here)

---

## Future Improvements

- Authentication
- Prediction History
- Confidence Score
- Top-3 Predictions
- Model Retraining
- Deployment

---

## Version

Current Version

```
v1.0.0
```

---

## License

MIT License

---

## Author

Devansh Modi