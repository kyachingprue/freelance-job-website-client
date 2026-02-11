import { motion } from "motion/react";
import { Briefcase } from "lucide-react";

const CategoryBanner = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative w-full h-110 shadow-xl pt-16 md:pt-16 cursor-pointer"
    >
      {/* Background Image */}
      <img
        src="https://i.ibb.co.com/F1rRXcC/360-F-214879686-R3-HFJlk6-WLr1kcdvy6-Q9rt-NASKN0-BZBS.jpg"
        alt="Category Banner"
        className="w-full h-full object-cover brightness-90 transition-transform duration-700 group-hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-start p-12">
        {/* Icon + Title */}
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="bg-indigo-600 text-white p-3 rounded-full shadow-lg"
          >
            <Briefcase size={24} />
          </motion.div>
          <h1 className="text-3xl md:text-5xl py-2 font-extrabold bg-linear-to-r from-indigo-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Discover the Best Freelance <br /> Opportunities
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-white/90 text-lg max-w-lg mb-4">
          Build websites and web applications for clients worldwide. Find freelance projects that match your skills.
        </p>

        {/* Jobs count */}
        <motion.div
          whileHover={{ x: 6 }}
          className="text-indigo-100 font-semibold flex items-center gap-2 text-lg"
        >
          1240+ Freelance Jobs Available
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CategoryBanner;
