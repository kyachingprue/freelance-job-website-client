import { motion } from "motion/react";
import { ArrowDownCircle, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const CategoryCardSection = () => {
  return (
    <section className="pb-10 md:pb-32 bg-sky-100">
      <section
        className="relative h-full py-16 flex items-center justify-center bg-cover bg-center "
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-3xl">
          {/* Floating Icon */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex justify-center mb-6"
          >
            <div className="w-16 h-16 rounded-full bg-linear-to-r from-indigo-500 to-pink-500 flex items-center justify-center shadow-xl">
              <Briefcase size={30} className="text-white" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl font-bold text-white leading-tight"
          >
            Discover High-Demand <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-pink-400">
              Freelance Job Categories
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-300 mt-5 text-base md:text-lg"
          >
            Explore top freelance categories and connect with projects that
            match your skills, passion, and career goals.
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8"
          >
            <Link to="/browse-jobs">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-linear-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-pink-500/40 transition"
              >
                Browse Favorite Jobs
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Down Icon */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="absolute bottom-8 text-white"
        >
          <ArrowDownCircle size={32} />
        </motion.div>
      </section>
   </section>
  );
};

export default CategoryCardSection;
