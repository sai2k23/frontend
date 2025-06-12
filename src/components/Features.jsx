import { FaTable, FaChartBar, FaCloudUploadAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const features = [
  {
    icon: <FaTable className="text-4xl text-indigo-600 drop-shadow-lg" />,
    title: "Excel-like Grid",
    desc: "Interactive spreadsheets with filters, formulas, and sorting like Excel.",
  },
  {
    icon: <FaChartBar className="text-4xl text-pink-500 drop-shadow-lg" />,
    title: "Analytics Dashboard",
    desc: "Generate visual dashboards with real-time stats and beautiful charts.",
  },
  {
    icon: (
      <FaCloudUploadAlt className="text-4xl text-green-500 drop-shadow-lg" />
    ),
    title: "Import/Export Excel",
    desc: "Easily upload, preview, and export Excel data in a few clicks.",
  },
];

const Features = () => {
  const handleClick = () => {
    toast("🔐 Please login to access this feature!", {
  icon: false,
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});
  };
  return (
    <section
      id="features"
      className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900"
    >
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300">
          ✨ Core Features
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">
          Empower your data workflow with intelligent and intuitive tools.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            onClick={handleClick}
            className="relative group bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105 overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Shine animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10 group-hover:opacity-30 opacity-0 transition-all duration-300 blur-sm pointer-events-none" />

            <div className="flex justify-center mb-5">{feature.icon}</div>
            <h3 className="text-xl font-bold text-center text-indigo-600 dark:text-indigo-300 mb-2">
              {feature.title}
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-300">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
