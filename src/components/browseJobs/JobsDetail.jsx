import { useNavigate, useParams } from "react-router-dom";
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
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ErrorLoading from "../ErrorLoading";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const JobsDetail = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { data: job, isLoading, isError, refetch } = useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/jobs/${id}`)
      return res.data;
    },
    enabled: !!id,
  })

  const { data: userData } = useQuery({
    queryKey: ['userData', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`)
      return res.data;
    }
  })
 
  if (isLoading) {
    return <LoadingSpinner/>
  }

  if (isError || !job)
    return (
      <ErrorLoading
        message="Job details not found."
        onRetry={refetch}
      />
    );
  
  const handleApplyClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setIsModalOpen(true);
  };

  const onSubmit = async (data) => {
    try {
      const proposalData = {
        jobId: id,
        jobTitle: job.title,
        freelancerId: user.uid,
        freelancerProfile: userData?.photoURL || user?.photoURL,
        companyLogo: job.companyLogo,
        freelancerName: user.displayName,
        freelancerEmail: user.email,
        clientEmail: job.client?.email,
        coverLetter: data.coverLetter,
        bidAmount: data.bidAmount,
        status: "pending",
        estimatedTime: data.estimatedTime,
        createdAt: new Date(),
      };

      await axiosPublic.post("/proposals", proposalData);
      toast.success("Proposal submitted successfully!");
      setIsModalOpen(false);
      navigate("/dashboard/freelancer-proposals");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit proposal.");
    }
  };

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
            onClick={handleApplyClick}
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
      {/* ===== PROPOSAL FORM MODAL ===== */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-semibold mb-4">Submit Your Proposal</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cover Letter
              </label>
              <textarea
                {...register("coverLetter", { required: true })}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                rows={4}
                placeholder="Write your proposal..."
              />
              {errors.coverLetter && (
                <span className="text-red-500 text-sm">
                  Cover letter is required
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bid Amount
              </label>
              <input
                type="number"
                {...register("bidAmount", { required: true })}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter your bid amount"
              />
              {errors.bidAmount && (
                <span className="text-red-500 text-sm">Bid amount is required</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Estimated Time (Days)
              </label>
              <input
                type="number"
                {...register("estimatedTime", { required: true })}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter estimated completion days"
              />
              {errors.estimatedTime && (
                <span className="text-red-500 text-sm">
                  Estimated time is required
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Submit Proposal
            </button>
          </form>
        </Modal>
      )}
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
