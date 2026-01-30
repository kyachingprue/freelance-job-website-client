import React from "react";
import { Briefcase, Calendar, DollarSign, MapPin, Users } from "lucide-react";
import { motion } from "motion/react";

const JobsCard = ({ jobData }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, rotateX: 2, rotateY: -2 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 rounded-2xl shadow-2xl text-white hover:shadow-3xl transition-all duration-300 relative overflow-hidden"
    >
      {/* Card Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold truncate">{jobData.title}</h3>
        {jobData.featured && (
          <span className="text-yellow-400 font-semibold text-sm uppercase">
            Featured
          </span>
        )}
      </div>

      {/* Category */}
      <p className="text-sm mb-2 flex items-center gap-2">
        <Briefcase size={16} /> {jobData.category}
      </p>

      {/* Client Info */}
      <p className="text-sm mb-2 flex items-center gap-2">
        <Users size={16} /> {jobData.client.name} ({jobData.client.location})
      </p>

      {/* Job Meta */}
      <div className="flex flex-wrap gap-4 text-sm mb-4">
        <p className="flex items-center gap-1">
          <DollarSign size={16} /> {jobData.budget} {jobData.currency}
        </p>
        <p className="flex items-center gap-1">
          <Calendar size={16} /> {jobData.deadline}
        </p>
        <p className="flex items-center gap-1">
          <MapPin size={16} /> {jobData.jobType}
        </p>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {jobData.skills.map((skill, index) => (
          <span
            key={index}
            className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-200 mb-4 line-clamp-3">
        {jobData.description}
      </p>

      {/* Action Button */}
      <button className="w-full bg-white/20 hover:bg-white/40 transition-colors px-4 py-2 rounded-xl font-medium">
        View Job
      </button>
    </motion.div>
  );
};

export default JobsCard;
