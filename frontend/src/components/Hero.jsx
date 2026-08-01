import { motion } from "framer-motion";
import { BrainCircuit, ShieldCheck, Sparkles } from "lucide-react";

function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-6xl mx-auto text-center py-12"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-indigo-700 text-sm font-medium"
      >
        <Sparkles size={16} />
        AI Powered Textile Recognition
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-5xl md:text-6xl font-extrabold leading-tight text-gray-900"
      >
        Preserving India's
        <span className="block bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
          Textile Heritage
        </span>
        Through Artificial Intelligence
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 max-w-3xl mx-auto text-lg text-gray-600 leading-8"
      >
        Upload an image and instantly identify traditional Indian textiles,
        discover their origin, weaving techniques, fabric, and cultural
        significance using deep learning.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div
          whileHover={{ y: -8, scale: 1.03 }}
          className="rounded-2xl bg-white shadow-lg border border-gray-100 p-6"
        >
          <BrainCircuit className="mx-auto text-indigo-600" size={34} />
          <h3 className="mt-4 font-bold text-xl">98%+ Accuracy</h3>
          <p className="text-gray-500 mt-2">
            Deep learning powered textile recognition.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -8, scale: 1.03 }}
          className="rounded-2xl bg-white shadow-lg border border-gray-100 p-6"
        >
          <ShieldCheck className="mx-auto text-emerald-600" size={34} />
          <h3 className="mt-4 font-bold text-xl">Instant Analysis</h3>
          <p className="text-gray-500 mt-2">
            Predictions in just a few seconds.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -8, scale: 1.03 }}
          className="rounded-2xl bg-white shadow-lg border border-gray-100 p-6"
        >
          <Sparkles className="mx-auto text-violet-600" size={34} />
          <h3 className="mt-4 font-bold text-xl">Rich Information</h3>
          <p className="text-gray-500 mt-2">
            Learn history, fabric, and weaving techniques.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Hero;