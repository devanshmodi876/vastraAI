import { useState } from "react";
import api from "../services/api";

function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setResult(null);
  };

  const handlePredict = async () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      setLoading(true);

      const response = await api.post("predict/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "50px auto",
        textAlign: "center",
      }}
    >
      <h1>VastraAI</h1>

      <p>Discover India's Traditional Textiles with AI</p>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      {selectedImage && (
        <>
          <div style={{ marginTop: "20px" }}>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Preview"
              width="300"
            />
          </div>

          <button
            onClick={handlePredict}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Predict Textile
          </button>
        </>
      )}

      {loading && <p>Predicting...</p>}

      {result && (
        <div
          style={{
            marginTop: "30px",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>{result.prediction}</h2>

          <p><strong>Confidence:</strong> {result.confidence}%</p>

          <p><strong>State:</strong> {result.state}</p>

          <p><strong>Technique:</strong> {result.technique}</p>

          <p><strong>Fabric:</strong> {result.fabric}</p>

          <p>{result.description}</p>
        </div>
      )}
    </div>
  );
}

export default Home;