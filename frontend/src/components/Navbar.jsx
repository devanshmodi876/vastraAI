import { Moon, Sparkles, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200">

      <div className="max-w-screen-2xl mx-auto h-18 px-8 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <motion.img
            src={logo}
            alt="VastraAI Logo"
            className="w-10 h-10 object-contain"
            whileHover={{
              rotate: 8,
              scale: 1.08,
            }}
            transition={{ duration: 0.2 }}
          />

          <div>
            <h1 className="text-4xl font-bold">VastraAI</h1>
            <p className="text-gray-500 text-sm">
              Textile Intelligence Platform
            </p>
          </div>
        </div>

        {/* Navigation */}

        <nav className="hidden md:flex gap-10 font-medium text-gray-600">

          <a
            href="#"
            className="hover:text-indigo-600 transition"
          >
            Home
          </a>

          <a
            href="#"
            className="hover:text-indigo-600 transition"
          >
            History
          </a>

          <a
            href="#"
            className="hover:text-indigo-600 transition"
          >
            About
          </a>

        </nav>

        {/* Right Side */}

        <div className="flex items-center gap-4">

          <button className="p-3 rounded-xl hover:bg-gray-100 transition">

            <Moon size={20} />

          </button>

          <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-xl hover:bg-black transition">

            <Code2 size={18} />

            GitHub

          </button>

        </div>

      </div>

    </header>
  );
}

export default Navbar;