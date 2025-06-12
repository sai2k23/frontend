import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4 bg-gradient-to-tr from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
      <motion.h1
        className="text-4xl sm:text-6xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        🚀 Transform Data Visually
      </motion.h1>

      <motion.p
        className="max-w-2xl text-gray-600 dark:text-gray-300 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Build dynamic Excel-like dashboards that crunch numbers, generate visuals, and give your data a voice — powered by the MERN stack.
      </motion.p>
    </section>
  );
};

export default Hero;
