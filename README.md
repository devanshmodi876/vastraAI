# 🧵 VastraAI

<p align="center">

AI-Powered Indian Textile Recognition Platform

Identify traditional Indian textiles using Deep Learning and explore their heritage through an interactive web experience.

</p>

---

## ✨ Features

- 🤖 AI-based Textile Classification
- 🧵 Recognition of Traditional Indian Textiles
- 📊 Confidence Score Visualization
- 🗺️ Interactive India Map Highlighting Textile Origin
- 📖 Detailed Textile Information
- 💡 Interesting Facts about each Textile
- 📄 Downloadable PDF Report
- 📚 Prediction History
- 📤 Drag & Drop Image Upload
- 🎨 Modern Responsive UI
- ⚡ Animated Loading Experience
- 🔔 Toast Notifications

---

## 📸 Screenshots

### Landing Page

(Add screenshot)

### Upload & Prediction

(Add screenshot)

### AI Result

(Add screenshot)

### Prediction History

(Add screenshot)

### PDF Report

(Add screenshot)

---

## 🏗 Architecture

```
React Frontend
       │
Axios API
       │
Django REST Framework
       │
PyTorch AI Model
       │
PostgreSQL Database
```

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- Axios

### Backend

- Django
- Django REST Framework
- PostgreSQL

### AI

- PyTorch
- Torchvision
- Pillow

---

## 📂 Project Structure

```text
vastraAI/

├── frontend/
│   ├── src/
│   ├── assets/
│   └── components/
│
├── backend/
│   ├── api/
│   ├── config/
│   └── media/
│
├── AI/
│   ├── models/
│   ├── inference/
│   └── training/
│
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/VastraAI.git

cd VastraAI
```

---

### Backend

```bash
cd backend

python -m venv .venv

source .venv/bin/activate
```

Windows

```bash
.venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run

```bash
python manage.py migrate

python manage.py runserver
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 📄 API

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/predict/ | Predict Textile |
| GET | /api/predict/ | Prediction History |
| GET | /api/report/{id}/ | Download PDF |

---

## 🧠 AI Model

The AI model is trained using PyTorch for classification of traditional Indian textiles.

Currently supported:

- Ajrakh
- Bandhani
- Chikankari
- Ikat
- Lehariya

The prediction response includes:

- Textile Name
- Confidence Score
- Origin State
- Fabric
- Technique
- Description
- Historical Fact

---

## 📈 Future Roadmap

- Support for more textile classes
- Cloud deployment
- Mobile application
- Improved dataset
- Explainable AI
- Multilingual support

---

## 👨‍💻 Author

**Devansh Modi**

B.Tech Computer Science Student

Passionate about AI, Full Stack Development and Indian Textile Heritage.

---

## ⭐ Show your support

If you like this project, consider giving it a ⭐ on GitHub.