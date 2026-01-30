import { motion } from "motion/react";

const categories = [
  { title: "Web Development", jobs: 1240, image: "https://i.ibb.co.com/F1rRXcC/360-F-214879686-R3-HFJlk6-WLr1kcdvy6-Q9rt-NASKN0-BZBS.jpg" },
  { title: "Graphic Design", jobs: 860, image: "https://i.ibb.co.com/n8wkGzHD/graphic-design-1500-x-900-picture-lpuf40e9jm621ews.jpg" },
  { title: "Writing & Translation", jobs: 730, image: "https://i.ibb.co.com/7JHtvhkc/Stylish-Writing-panorama-f964294e2f8a9a922ed0119cf4807145-606bae97546bd.jpg" },
  { title: "Software Engineer", jobs: 980, image: "https://i.ibb.co.com/gbdGKy3X/What-is-a-Software-Engineer.png" },
  { title: "Digital Marketing", jobs: 690, image: "https://i.ibb.co.com/8DXjSTkm/Digital-marketing.jpg" },
  { title: "Mobile App Development", jobs: 820, image: "https://i.ibb.co.com/RTnSP9BY/mobile-application-development-guidelines-riseuplabs.jpg" },
  { title: "Video & Animation", jobs: 540, image: "https://i.ibb.co.com/mVkVQGkB/pngtree-a-modern-workspace-featuring-dual-monitors-displaying-video-editing-software-and-image-17131.jpg" },
  { title: "Virtual Assistance", jobs: 610, image: "https://i.ibb.co.com/TxLw2PMT/feature-image-July19-2-960x540.png" },
  { title: "Data Science & Analytics", jobs: 460, image: "https://i.ibb.co.com/S7dpF8wR/2021-11-Data-Science-Vs-Data-Analytics.jpg" },
  { title: "DSA (Data Structure & Algorithm)", jobs: 390, image: "https://i.ibb.co.com/nZZB3qn/DSA-MSA-Technosoft.png" },
  { title: "SEO & SEM", jobs: 580, image: "https://i.ibb.co.com/9HGRBNWC/seo-vs-sem.jpg" },
  { title: "Business & Consulting", jobs: 440, image: "https://i.ibb.co.com/JT4cjTn/Business-Growth-Consultant-details-mobile.jpg" },
  { title: "Computer Science", jobs: 720, image: "https://i.ibb.co.com/7Nz76nD2/360-F-1686616242-Vohj1m-CN1-Q7qq4w-Hj3-UIl-Vym6a-Dman-Pf.jpg" },
];

const CategoryData = () => {
  return (
    <section className="bg-gray-900 py-20 md:py-32 px-4">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl py-2 font-extrabold text-center mb-3
        bg-linear-to-r from-indigo-400 to-pink-500
        bg-clip-text text-transparent"
      >
        Browse by Categories
      </motion.h2>

      {/* Description */}
      <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
        Explore work opportunities in various fields and find projects that match your skills.
      </p>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white/5 backdrop-blur-lg border hover:border-2 border-white/10
            rounded-2xl overflow-hidden cursor-pointer
            hover:border-indigo-400/40 hover:shadow-xl"
          >
            {/* Image */}
            <div className="h-40 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="p-5 text-center">
              <h3 className="text-lg font-bold text-white mb-1">
                {cat.title}
              </h3>
              <p className="text-sm text-indigo-400">
                {cat.jobs}+ Jobs Available
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryData;
