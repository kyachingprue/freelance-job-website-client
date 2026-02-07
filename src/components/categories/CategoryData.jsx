import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

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
  { title: "DSA", jobs: 390, image: "https://i.ibb.co.com/nZZB3qn/DSA-MSA-Technosoft.png" },
  { title: "SEO & SEM", jobs: 580, image: "https://i.ibb.co.com/9HGRBNWC/seo-vs-sem.jpg" },
  { title: "Business & Consulting", jobs: 440, image: "https://i.ibb.co.com/JT4cjTn/Business-Growth-Consultant-details-mobile.jpg" },
  { title: "Computer Science", jobs: 720, image: "https://i.ibb.co.com/7Nz76nD2/360-F-1686616242-Vohj1m-CN1-Q7qq4w-Hj3-UIl-Vym6a-Dman-Pf.jpg" },
];

const CategoryData = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/browse-jobs?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="bg-sky-100 py-20 md:py-32 px-4">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl py-2 font-extrabold text-center mb-3
        bg-linear-to-r from-indigo-500 to-pink-600
        bg-clip-text text-transparent"
      >
        Browse by Categories
      </motion.h2>

      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Explore work opportunities in various fields and find projects that match your skills.
      </p>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => handleCategoryClick(cat.title)}
            className="bg-white/60 backdrop-blur-lg border border-gray-300 cursor-pointer
            rounded-2xl overflow-hidden
            hover:border-indigo-400/40 hover:shadow-xl"
          >
            <div className="h-40 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>

            <div className="p-5 text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {cat.title}
              </h3>
              <p className="text-sm text-indigo-600">
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
