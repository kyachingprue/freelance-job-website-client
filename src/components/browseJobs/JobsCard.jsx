import { motion } from "motion/react";
import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  ArrowRight,
  Layers,
  Bookmark,
  Box
} from "lucide-react";

const JobsCard = ({ job }) => {
  const {
    title,
    jobType,
    postedAt,
    description,
    skills,
    budget,
    budgetType,
    companyLogo,
    client,
    deadline,
    category,
    position
  } = job;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="bg-white rounded-2xl border border-gray-300 shadow-sm p-5 w-full max-w-sm hover:shadow-xl"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
          <img
            src={companyLogo}
            alt={client.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold text-slate-800">
            {title}
          </h3>

          <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
            <MapPin size={14} />
            <span>{client.location}</span>
          </div>
        </div>
      </div>

      {/* Job meta */}
      <div className="flex flex-col items-start gap-1 text-sm my-3">
        <div className="flex items-center gap-2">
          <Layers size={16} />
          <span className="text-lg font-medium text-gray-700">{category}</span>
        </div>
        <div className="flex gap-5 items-center">
          <div className="flex items-center gap-1">
            <Box size={14} />
            <span className="text-sm text-gray-600">{jobType}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bookmark size={14} />
            <span className="text-sm text-gray-600">{position}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center py-2">
        <div className="flex flex-col items-center gap-0.5">
          <p className="text-sm font-semibold">Release Date:</p>
          <div className="flex items-center gap-1">
            <Clock size={14} color="gray" />
            <span className="text-sm text-gray-600">{postedAt}</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <p className="text-sm font-semibold">Deadline Date:</p>
          <div className="flex items-center gap-1">
            <Clock size={14} color="gray" />
            <span className="text-sm text-gray-600">{deadline}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 mt-3 line-clamp-3">
        {description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mt-4">
        {skills.slice(0, 3).map((skill, index) => (
          <span
            key={index}
            className="bg-blue-700/30 text-slate-600 text-xs px-3 py-1 rounded-lg"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-1 text-blue-600 font-semibold">
          <DollarSign size={18} />
          <span>
            {budget}
            <span className="text-sm font-normal text-slate-500">
              /{budgetType === "Hourly" ? "Hour" : "Fixed"}
            </span>
          </span>
        </div>

        <motion.button
          whileHover={{ x: 5 }}
          className="flex items-center gap-1 text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100"
        >
          Apply Now
          <ArrowRight size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default JobsCard;
