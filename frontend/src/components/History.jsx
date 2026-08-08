import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock3, Sparkles, Search, MapPin } from "lucide-react";
import api, { API_BASE } from "../services/api";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get("predict/");
      setHistory(res.data);
    } catch (err) {
      console.error("Failed to load history", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = history.filter((item) =>
    item.predicted_class
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-5 text-center text-gray-400">
        Loading history...
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400">
        <Sparkles className="mx-auto mb-3 text-indigo-500" size={32} />
        <p>No predictions yet.</p>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="mb-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-white">
              🧵 Prediction History
            </h2>

            <p className="text-sm text-slate-400">
              {history.length} {history.length === 1 ? "Analysis" : "Analyses"}
            </p>

          </div>

          <div className="bg-indigo-600 px-3 py-2 rounded-xl text-sm font-semibold">
            AI
          </div>

        </div>

      </div>

      {/* Search */}
      <div className="relative mb-6">

        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search textile..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl bg-slate-800 border border-slate-700 py-3 pl-10 pr-4 text-white placeholder:text-slate-400 outline-none focus:border-indigo-500"
        />

      </div>

      {/* Cards */}
      <div className="space-y-4">

        {filteredHistory.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.05,
            }}
            whileHover={{
              scale: 1.02,
            }}
            className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden cursor-pointer hover:border-indigo-500 transition"
          >

          <img
            src={`https://vastraai-production.up.railway.app${item.image}`}
            alt={item.predicted_class}
            className="w-full h-28 object-cover"
          />

            <div className="p-4">

              <div className="flex justify-between items-start">

                <h3 className="font-bold text-white capitalize">
                  {item.predicted_class}
                </h3>

                <span className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full">
                  {Number(item.confidence).toFixed(1)}%
                </span>

              </div>

              {/* Origin */}
              <div className="flex items-center gap-2 mt-3 text-slate-400 text-sm">

                <MapPin size={15} />

                <span>
                  {item.state || "Unknown"}
                </span>

              </div>

              {/* Time */}
              <div className="flex items-center gap-2 mt-2 text-slate-500 text-xs">

                <Clock3 size={14} />

                {new Date(item.created_at).toLocaleDateString()} •{" "}
                {new Date(item.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}

              </div>

            </div>

          </motion.div>
        ))}

      </div>
    </>
  );
}

export default History;