import { motion } from "motion/react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-56">

        {/* Loading Bar */}
        <div className="relative h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute h-full w-1/3 rounded-full 
            bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"
            initial={{ x: "-100%" }}
            animate={{ x: "300%" }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="mt-4 text-center text-sm font-medium tracking-wide
          text-gray-300"
        >
          Loading, please wait...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
