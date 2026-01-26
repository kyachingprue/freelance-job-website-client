import { motion } from "motion/react";
import { ArrowRight, Briefcase, Users } from "lucide-react";
import { useEffect, useState } from "react";

const floatAnimation = {
  animate: {
    y: [0, -15, 0],
  },
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const Banner = () => {
  const [counts, setCounts] = useState({
    freelancers: 0,
    clients: 0,
    success: 0,
  });

  useEffect(() => {
    const targets = {
      freelancers: 50,
      clients: 25,
      success: 99,
    };

    const interval = setInterval(() => {
      setCounts((prev) => ({
        freelancers:
          prev.freelancers < targets.freelancers
            ? prev.freelancers + 1
            : targets.freelancers,
        clients:
          prev.clients < targets.clients
            ? prev.clients + 1
            : targets.clients,
        success:
          prev.success < targets.success
            ? prev.success + 1
            : targets.success,
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-black via-gray-900 to-black text-white">

      {/* 3D Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-125 h-125 bg-indigo-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-100 h-100 bg-pink-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 items-center gap-16">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-block mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/10 text-sm"
          >
            🚀 The Future of Freelancing
          </motion.span>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Hire Top <span className="text-indigo-400">Freelancers</span> <br />
            Or Get Hired <span className="text-pink-400">Faster</span>
          </h1>

          <p className="mt-6 text-gray-400 max-w-xl">
            A next-generation freelance platform connecting talented professionals
            with global clients using smart matching and modern workflows.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              Hire Talent <ArrowRight size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl border border-white/20 bg-white/5 backdrop-blur hover:bg-white/10"
            >
              Find Work
            </motion.button>
          </div>

          {/* Stats */}
          <div className="mt-14 flex gap-10">
            <div>
              <h3 className="text-3xl font-bold text-white">
                {counts.freelancers}K+
              </h3>
              <p className="text-sm text-gray-400">Freelancers</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">
                {counts.clients}K+
              </h3>
              <p className="text-sm text-gray-400">Clients</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">
                {counts.success}%
              </h3>
              <p className="text-sm text-gray-400">Success Rate</p>
            </div>
          </div>
        </motion.div>

        {/* Right 3D Cards */}
        <div className="relative hidden md:block">

          {/* Card 1 */}
          <motion.div
            {...floatAnimation}
            className="absolute top-0 left-10 w-64 p-5 rounded-2xl bg-white/10 backdrop-blur border border-white/10 shadow-2xl"
            whileHover={{ rotateY: 15, rotateX: -10 }}
          >
            <Briefcase className="text-indigo-400 mb-3" />
            <h4 className="font-semibold">Post a Job</h4>
            <p className="text-sm text-gray-400 mt-2">
              Reach thousands of skilled freelancers instantly.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            {...floatAnimation}
            transition={{ ...floatAnimation.transition, delay: 1 }}
            className="absolute top-40 right-0 w-72 p-5 rounded-2xl bg-white/10 backdrop-blur border border-white/10 shadow-2xl"
            whileHover={{ rotateY: -15, rotateX: 10 }}
          >
            <Users className="text-pink-400 mb-3" />
            <h4 className="font-semibold">Hire Smart</h4>
            <p className="text-sm text-gray-400 mt-2">
              AI-powered matching for perfect collaboration.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            {...floatAnimation}
            transition={{ ...floatAnimation.transition, delay: 2 }}
            className="absolute bottom-0 right-15 w-60 p-5 rounded-2xl bg-white/10 backdrop-blur border border-white/10 shadow-2xl"
            whileHover={{ rotateY: 10, rotateX: 10 }}
          >
            <h4 className="font-semibold">Secure Payments</h4>
            <p className="text-sm text-gray-400 mt-2">
              Protected escrow & fast global payouts.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
