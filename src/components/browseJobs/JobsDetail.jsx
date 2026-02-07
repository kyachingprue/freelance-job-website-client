import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  Layers,
  Award,
  Users,
  Clock,
  Tag,
  Sparkles,
} from "lucide-react";

const JobsDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/jobsData.json")
      .then((res) => res.json())
      .then((data) => {
        const foundJob = data.find((item) => item._id === id);
        setJob(foundJob || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  /* ===== LOADING ===== */
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  /* ===== NOT FOUND ===== */
  if (!job) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 text-xl">
        Job not found ❌
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-sky-100 py-20 px-4"
    >
      <div className="w-full md:max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-8 space-y-10">

        {/* ===== HERO ===== */}
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <img
            src={job.companyLogo}
            alt="Company"
            className="w-24 h-24 rounded-2xl border border-gray-300 object-cover"
          />

          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
              {job.title}
              {job.featured && <Sparkles className="text-yellow-400" />}
            </h1>
            <p className="text-gray-500 mt-1">{job.category}</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md"
          >
            Apply Now
          </motion.button>
        </div>

        {/* ===== META ===== */}
        <div className="flex flex-wrap gap-3 text-sm">
          <Meta icon={<Briefcase />} text={job.jobType} />
          <Meta icon={<Layers />} text={job.position} />
          <Meta icon={<Award />} text={job.experienceLevel} />
          <Meta icon={<Tag />} text={job.status} />
          <Meta icon={<Users />} text={`${job.proposals} Proposals`} />
        </div>

        {/* ===== DESCRIPTION ===== */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Job Description</h2>
          <p className="text-gray-600 leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* ===== SKILLS ===== */}
        {Array.isArray(job.skills) && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ===== BUDGET & TIME ===== */}
        <div className="grid sm:grid-cols-2 gap-4 bg-gray-50 rounded-2xl p-5">
          <Detail
            icon={<DollarSign />}
            label="Budget"
            value={`${job.budget} ${job.currency} (${job.budgetType})`}
          />
          <Detail icon={<Calendar />} label="Deadline" value={job.deadline} />
          <Detail icon={<Clock />} label="Posted At" value={job.postedAt} />
          <Detail
            icon={<MapPin />}
            label="Client Location"
            value={job.client?.location}
          />
        </div>

        {/* ===== CLIENT ===== */}
        <div className="border-t border-gray-400 pt-6">
          <h2 className="text-lg font-semibold mb-4">Client Information</h2>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 space-y-2 text-sm text-gray-700">
              <p><strong>Name:</strong> {job.client?.name}</p>
              <p><strong>Rating:</strong> ⭐ {job.client?.rating}</p>
              <p><strong>Total Jobs Posted:</strong> {job.client?.totalJobsPosted}</p>
            </div>

            {job.client?.verified ? (
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <CheckCircle size={18} />
                Verified Client
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-500 font-medium">
                <XCircle size={18} />
                Not Verified
              </div>
            )}
          </div>
        </div>

      </div>
    </motion.section>
  );
};

/* ===== META BADGE ===== */
const Meta = ({ icon, text }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full">
    <span className="text-indigo-600">{icon}</span>
    <span className="font-medium">{text}</span>
  </div>
);

/* ===== DETAIL ROW ===== */
const Detail = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <span className="text-indigo-600 mt-1">{icon}</span>
    <div>
      <p className="text-sm font-semibold text-gray-700">{label}</p>
      <p className="text-sm text-gray-500">{value}</p>
    </div>
  </div>
);

export default JobsDetail;
