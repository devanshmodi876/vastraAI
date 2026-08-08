import { motion } from "framer-motion";
import {
  CheckCircle2,
  MapPin,
  Scissors,
  Shirt,
  Lightbulb,
  Download,
} from "lucide-react";

import ConfidenceBar from "./ConfidenceBar";
import IndiaMap from "./IndiaMap";

function ResultCard({ result, preview }) {
  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-6 pb-16"
    >
      <div className="overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-200">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-8 py-6 text-white">

          <div className="flex items-center gap-3">

            <CheckCircle2
              className="text-green-300"
              size={30}
            />

            <div>

              <p className="text-sm opacity-80">
                AI Analysis Complete
              </p>

              <h2 className="text-3xl font-bold">
                {result.prediction}
              </h2>

            </div>

          </div>

        </div>

        {/* Content */}
        <div className="p-8 space-y-10">

          {/* Hero */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <img
                src={preview}
                alt="Uploaded"
                className="w-full h-[340px] rounded-3xl object-cover shadow-xl"
              />

              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm">
                📷 Uploaded Image
              </div>
            </motion.div>

            {/* Prediction */}
            <div>

              <span className="uppercase tracking-[0.3em] text-indigo-600 font-semibold">
                AI Prediction
              </span>

              <h1 className="mt-3 text-6xl font-black tracking-tight text-gray-900">
                {result.prediction}
              </h1>

              <p className="mt-3 text-xl text-gray-500">
                Traditional Indian Textile
              </p>

              <div className="mt-8">

                <div className="flex justify-between mb-3">

                  <span className="font-medium text-gray-600">
                    AI Confidence
                  </span>

                  <span className="font-bold text-indigo-600">
                    {result.confidence.toFixed(2)}%
                  </span>

                </div>

                <ConfidenceBar value={result.confidence} />

              </div>

            </div>

          </div>

          {/* Quick Information */}
          <div className="flex flex-wrap gap-4">

            <div className="flex items-center gap-3 rounded-full bg-indigo-50 px-6 py-3 border border-indigo-100">
              <MapPin
                size={18}
                className="text-indigo-600"
              />

              <span className="font-medium text-gray-700">
                {result.state}
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-full bg-violet-50 px-6 py-3 border border-violet-100">
              <Scissors
                size={18}
                className="text-violet-600"
              />

              <span className="font-medium text-gray-700">
                {result.technique}
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-full bg-emerald-50 px-6 py-3 border border-emerald-100">
              <Shirt
                size={18}
                className="text-emerald-600"
              />

              <span className="font-medium text-gray-700">
                {result.fabric}
              </span>
            </div>

          </div>

          {/* About */}
          <motion.div
            whileHover={{ y: -3 }}
            className="rounded-3xl border border-gray-200 p-8 shadow-sm"
          >

            <h3 className="text-2xl font-bold mb-4">
              📖 About this Textile
            </h3>

            <p className="leading-8 text-gray-600 text-lg">
              {result.description}
            </p>

          </motion.div>

          {/* Fact + Map */}
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Fact */}
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-yellow-200 bg-yellow-50 p-8"
            >

              <div className="flex items-center gap-3 mb-4">

                <Lightbulb
                  className="text-yellow-600"
                  size={24}
                />

                <h3 className="text-2xl font-bold text-yellow-800">
                  Did You Know?
                </h3>

              </div>

              <p className="leading-8 text-gray-700">
                {result.fact}
              </p>

            </motion.div>

            {/* Map */}
            <IndiaMap state={result.state} />

          </div>

          {/* Download */}
          <a
            href={`https://vastraai-production.up.railway.app/api/report/${result.id}/`}
            target="_blank"
            rel="noreferrer"
            className="flex justify-center items-center gap-3 rounded-3xl bg-gradient-to-r from-emerald-600 to-green-600 py-5 text-xl font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
          >

            <Download size={24} />

            Download Professional PDF Report

          </a>

        </div>

      </div>
    </motion.div>
  );
}

export default ResultCard;