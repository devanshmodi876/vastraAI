import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

const facts = [
  "Ajrakh printing involves up to 16 dyeing stages.",
  "Bandhani artisans tie thousands of tiny knots by hand.",
  "Chikankari embroidery flourished during the Mughal era.",
  "Ikat patterns are dyed before the fabric is woven.",
  "Lehariya is famous for its vibrant wave-like patterns."
];

function LoadingScreen() {
  const [step, setStep] = useState(0);
  const [fact, setFact] = useState("");

  useEffect(() => {
    setFact(facts[Math.floor(Math.random() * facts.length)]);

    const timers = [
      setTimeout(() => setStep(1), 700),
      setTimeout(() => setStep(2), 1500),
      setTimeout(() => setStep(3), 2300),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl bg-white shadow-2xl border border-gray-200 p-10"
    >
      <div className="text-center">

        <motion.img
          src={logo}
          alt="logo"
          className="w-20 h-20 mx-auto"
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
        />

        <h2 className="mt-5 text-3xl font-bold">
          VastraAI
        </h2>

        <p className="text-gray-500 mt-2">
          Analyzing Textile...
        </p>

      </div>

      {/* Progress */}

      <div className="mt-8 h-3 rounded-full bg-gray-200 overflow-hidden">

        <motion.div
          className="h-full bg-gradient-to-r from-indigo-600 to-violet-600"
          initial={{ width: 0 }}
          animate={{
            width:
              step === 0
                ? "20%"
                : step === 1
                ? "50%"
                : step === 2
                ? "80%"
                : "100%",
          }}
        />

      </div>

      {/* Steps */}

      <div className="mt-8 space-y-4">

        <Step
          active={step >= 0}
          done={step > 0}
        >
          Uploading image
        </Step>

        <Step
          active={step >= 1}
          done={step > 1}
        >
          Extracting textile features
        </Step>

        <Step
          active={step >= 2}
          done={step > 2}
        >
          Comparing patterns
        </Step>

        <Step
          active={step >= 3}
          done={false}
        >
          Preparing prediction
        </Step>

      </div>

      {/* Fact */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-10 rounded-2xl bg-indigo-50 border border-indigo-100 p-5"
      >

        <h3 className="font-semibold text-indigo-700">
          💡 Textile Fact
        </h3>

        <p className="mt-2 text-gray-600">
          {fact}
        </p>

      </motion.div>

    </motion.div>
  );
}

function Step({ children, active, done }) {
  return (
    <div
      className={`flex items-center gap-3 transition-all duration-300 ${
        active ? "opacity-100" : "opacity-40"
      }`}
    >
      <span className="text-xl">
        {done ? "✅" : "⏳"}
      </span>

      <span>{children}</span>
    </div>
  );
}

export default LoadingScreen;