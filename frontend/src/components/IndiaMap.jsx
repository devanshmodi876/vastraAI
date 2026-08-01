import { useEffect } from "react";
import { motion } from "framer-motion";
import IndiaMapSvg from "../assets/india-map.svg?react";
import "./IndiaMap.css";

const stateIds = {
  Gujarat: "INGJ",
  Rajasthan: "INRJ",
  Maharashtra: "INMH",
  Karnataka: "INKA",
  Kerala: "INKL",
  "Tamil Nadu": "INTN",
  Telangana: "INTG",
  "Andhra Pradesh": "INAP",
  Odisha: "INOR",
  Orissa: "INOR",
  Punjab: "INPB",
  Haryana: "INHR",
  Delhi: "INDL",
  Bihar: "INBR",
  Assam: "INAS",
  "West Bengal": "INWB",
  "Uttar Pradesh": "INUP",
  "Madhya Pradesh": "INMP",
  Chhattisgarh: "INCT",
  Jharkhand: "INJH",
  Goa: "INGA",
};

function IndiaMap({state}) {

  useEffect(() => {
    document
      .querySelectorAll(".india-map path")
      .forEach((path) => {
        path.classList.remove("active");
        path.style.fill = "";
      });

    if (!state) return;

    const states = state.split(",").map((s) => s.trim());

    states.forEach((name) => {
      const id = stateIds[name];

      if (id) {
        const selected = document.getElementById(id);

        if (selected) {
          selected.style.fill = "#7C3AED";
        }
      }
    });
  }, [state]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl bg-white border border-gray-200 shadow-xl p-4"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        🗺️ Origin Map
      </h2>

      <p className="text-gray-500 mb-6">
        Traditional origin of the predicted textile
      </p>

      <div className="flex justify-center">
        <div>
          <IndiaMapSvg className="india-map w-full max-w-lg mx-auto" />
      </div>
      </div>
    </motion.div>
  );
}

export default IndiaMap;