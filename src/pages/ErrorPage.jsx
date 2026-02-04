import { Link } from "react-router-dom";
import { motion } from "motion/react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-900 via-indigo-950 to-black px-4">
      {/* Animated Error Illustration */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-lg"
      >
        {/* Floating freelance icons */}
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute -top-10 -left-10 text-yellow-400 text-4xl"
        >
          💻
        </motion.div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute -top-8 right-0 text-pink-500 text-5xl"
        >
          ✍️
        </motion.div>
        <motion.div
          animate={{ x: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 text-green-400 text-5xl"
        >
          📊
        </motion.div>

        {/* Central Error Graphic */}
        <motion.div
          className="text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-4">
            404
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-6">
            Oops! The job you are looking for cannot be found.
          </p>

          {/* Button */}
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-linear-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Go Back Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
