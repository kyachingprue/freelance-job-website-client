import { AlertTriangle, RefreshCcw } from "lucide-react";
import { motion } from "motion/react";

const ErrorLoading = ({ message = "Something went wrong!", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-sky-100 via-white to-orange-100 px-4">

      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="bg-white p-6 rounded-full shadow-lg"
      >
        <AlertTriangle size={50} className="text-red-500" />
      </motion.div>

      {/* Error Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-2xl md:text-3xl font-bold bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent text-center"
      >
        Oops! Failed to Load Jobs
      </motion.h2>

      {/* Error Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-3 text-gray-600 text-center max-w-md"
      >
        {message}
      </motion.p>

      {/* Retry Button */}
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="mt-6 flex items-center gap-2 bg-linear-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition"
        >
          <RefreshCcw size={18} />
          Try Again
        </motion.button>
      )}
    </div>
  );
};

export default ErrorLoading;
