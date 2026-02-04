import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Info } from "lucide-react";
import { Link } from "react-router-dom";

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-700/50 rounded-xl overflow-hidden shadow-lg">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none hover:bg-gray-600 transition"
      >
        <div className="flex items-center gap-3">
          <Info className="w-5 h-5 text-indigo-400" />
          <h3 className="text-white font-bold text-lg md:text-xl">{title}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-indigo-400" />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="px-6 pb-4 text-gray-300 text-sm md:text-base"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FreelanceCard = () => {
  const accordionData = [
    {
      title: "What is Freelancing?",
      content:
        "Freelancing is a way to work independently, offering your skills to clients worldwide. It provides flexibility, skill growth, and financial independence.",
    },
    {
      title: "Benefits of Freelancing",
      content:
        "Freelancing allows you to control your schedule, pick projects you like, work remotely, earn globally, and improve professionally.",
    },
    {
      title: "Tips for Freelancers",
      content:
        "Build a strong portfolio, communicate clearly, meet deadlines, and keep learning. Platforms like Upwork, Fiverr, and Freelancer.com are good starting points.",
    },
  ];

  return (
    <section className="bg-blue-200 min-h-screen flex items-center justify-center px-4 md:px-20 py-16">
      <motion.div
        className="flex flex-col md:flex-row bg-blue-950 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Left: 3D Freelance Image */}
        <motion.div
          className="md:w-1/2 w-full relative overflow-hidden cursor-pointer"
          whileHover={{ scale: 1.05, rotateY: 10, rotateX: 5 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <img
            src="https://i.ibb.co.com/pBP0kH4x/stock-photo-beautiful-young-freelancer-man-using-laptop-sitting-cafe-table-happy.webp"
            alt="Freelance 3D"
            className="w-full h-full object-contain md:h-125 md:object-cover"
          />
        </motion.div>

        {/* Right: Accordion Info + Button */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center gap-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Freelance Information
          </h2>

          <div className="flex flex-col gap-4">
            {accordionData.map((item, index) => (
              <AccordionItem
                key={index}
                title={item.title}
                content={item.content}
              />
            ))}
          </div>

          <Link to="/browse-jobs">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full font-semibold w-max shadow-lg"
            >
              View Details
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default FreelanceCard;
