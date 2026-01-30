import { motion } from "motion/react";

const JobBanner = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-gray-900 via-indigo-950 to-black text-white py-32 px-6">

      {/* Soft glow background */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-600/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-20 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Explore Your
            <span className="block bg-linear-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
              Freelance Career
            </span>
          </h1>

          <p className="mt-6 text-gray-300 max-w-xl">
            Work with global clients, earn securely, and build your future
            with top freelance opportunities around the world.
          </p>
        </motion.div>

        {/* RIGHT FEATURED 3D ANIMATION */}
        <motion.div
          className="relative perspective-distant"
          initial={{ opacity: 0, rotateY: 25, scale: 0.85 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          transition={{ duration: 1.2 }}
          whileHover={{ rotateY: -15, rotateX: 8 }}
        >
          {/* Main Glass Card */}
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">

            <h3 className="text-2xl font-bold mb-6">
              🌍 Featured Freelance Highlights
            </h3>

            <div className="space-y-4 text-gray-300">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="flex items-center gap-3"
              >
                <span className="w-3 h-3 bg-indigo-400 rounded-full"></span>
                Remote jobs from 50+ countries
              </motion.div>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="flex items-center gap-3"
              >
                <span className="w-3 h-3 bg-pink-400 rounded-full"></span>
                Secure payments & contracts
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="flex items-center gap-3"
              >
                <span className="w-3 h-3 bg-purple-400 rounded-full"></span>
                High-paying verified clients
              </motion.div>
            </div>

            {/* Floating 3D badges */}
            <motion.div
              className="absolute -top-6 -right-6 bg-indigo-500/30 backdrop-blur-md px-5 py-2 rounded-2xl text-sm font-semibold"
              animate={{ y: [0, -14, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🚀 Top Projects
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-6 bg-pink-500/30 backdrop-blur-md px-5 py-2 rounded-2xl text-sm font-semibold"
              animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity }}
            >
              💼 Trusted Clients
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JobBanner;
