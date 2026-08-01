import { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, Image as ImageIcon, Sparkles } from "lucide-react";
import api from "../services/api";
import LoadingScreen from "./LoadingScreen";
import toast from "react-hot-toast";

function UploadCard({ setResult, preview, setPreview }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    const imageURL = URL.createObjectURL(file);
    setPreview(imageURL);  

    setResult(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (!file) return;

    setImage(file);

    const imageURL = URL.createObjectURL(file);
    setPreview(imageURL);

    setResult(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handlePredict = async () => {
    if (!image) {
      toast.error("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);

      const response = await api.post("predict/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data);
      toast.success("Textile identified successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-6 pb-16"
    >
    {loading ? (
          <LoadingScreen />
        ) : (
          <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-gray-200 p-8">

            {/* Upload Area */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-indigo-400 rounded-3xl p-10 text-center bg-gradient-to-br from-indigo-50 to-violet-50 transition"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
              >
                <UploadCloud
                  size={70}
                  className="mx-auto text-indigo-600"
                />
              </motion.div>

              <h2 className="text-3xl font-bold mt-6 text-gray-800">
                Upload Textile Image
              </h2>

              <p className="text-gray-500 mt-3">
                Drag & Drop your image here
              </p>

              <p className="text-gray-400 mt-1">
                PNG • JPG • JPEG
              </p>

              <div className="my-8 flex items-center justify-center gap-4">
                <div className="h-px bg-gray-300 w-24"></div>

                <span className="text-gray-500">
                  OR
                </span>

                <div className="h-px bg-gray-300 w-24"></div>
              </div>

              <label className="cursor-pointer inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition">
                <ImageIcon size={20} />

                Browse Image

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                />
              </label>
            </motion.div>

            {/* Preview */}
            {preview && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-10 flex justify-center"
              >
                <img
                  src={preview}
                  alt="Preview"
                  className="w-[420px] h-[420px] rounded-3xl object-cover shadow-2xl border"
                />
              </motion.div>
            )}

            {/* Analyze Button */}
            {image && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-10 flex justify-center"
              >
                <motion.button
                  whileHover={{
                    scale: 1.04,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={handlePredict}
                  disabled={loading}
                  className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-lg font-semibold px-10 py-4 rounded-2xl shadow-xl disabled:opacity-60"
                >
                  <Sparkles size={20} />

                  {loading
                    ? "AI is analyzing..."
                    : "Analyze Textile"}
                </motion.button>
              </motion.div>
            )}
          </div>
        )}
    </motion.div>
  );
}

export default UploadCard;