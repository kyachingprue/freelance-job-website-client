import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import {
  Briefcase,
  DollarSign,
  Clock,
  User,
  Mail,
  CheckCircle,
  Send,
  Github,
  Link as LinkIcon,
  Eye,
  User2,
  Star,
} from "lucide-react";
import LoadingSpinner from "../../components/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ActiveJobs = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch Active Jobs
  const { data: activeJobs = [], isLoading, refetch } = useQuery({
    queryKey: ["freelancerHires", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/hires/${user.email}`
      );
      return res.data;
    },
  });

  // ✅ React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ✅ Submit Work Handler
  const onSubmit = async (data) => {
    try {
      const submissionData = {
        ...data,
        hireId: selectedJob._id, 
        freelancerEmail: user.email,
        clientEmail: selectedJob.clientEmail,
        status: "submitted",
        submittedAt: new Date(),
      };

      // 1️⃣ Save Work Submission
      const submissionRes = await axiosSecure.post(
        "/work-submissions",
        submissionData
      );

      if (submissionRes.data.insertedId) {
        toast.success("✅ Work submitted successfully!");
      }

      // 2️⃣ Create Notification for Client
       await axiosSecure.post("/notifications", {
        receiverEmail: selectedJob.clientEmail,
        message: `${user.displayName} submitted work for ${selectedJob.jobTitle}`,
        status: "unread",
        createdAt: new Date(),
      });

      // Reset form & state
      reset();
      setSelectedJob(null);
      refetch();
    } catch (error) {
      toast.error(`❌ Failed to submit work: ${error?.message}`);
    }
  };

  if (isLoading) {
    return <LoadingSpinner/>
  }

  return (
    <section className="h-full lg:h-160 overflow-y-auto p-4">
      <div>
        <h3 className="text-xl md:text-2xl text-gray-800 font-bold px-2 pb-4">All Active Jobs</h3>
      </div>
      <div className="p-2 grid md:grid-cols-2 gap-6">
        {activeJobs.map((job) => (
          <motion.div
            key={job._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
            className="bg-linear-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-xl"
          >
            {/* Company Logo */}
            <img
              src={job.companyLogo}
              alt="logo"
              className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-white"
            />

            {/* Job Title */}
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Briefcase size={18} /> {job.jobTitle}
            </h2>

            <p className="flex items-center gap-2 mt-2">
              <User size={16} /> {job.clientName}
            </p>

            <p className="flex items-center gap-2">
              <Mail size={16} /> {job.clientEmail}
            </p>

            <p className="flex items-center gap-2 mt-2">
              <DollarSign size={16} />
              {job.bidAmount} {job.currency} ({job.budgetType})
            </p>

            <p className="flex items-center gap-2">
              <Clock size={16} /> {job.estimatedTime} Days
            </p>

            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
              <div>
                <p className="flex items-center gap-2 mt-2">
                  <CheckCircle size={16} /> Status: {job.status}
                </p>

                <p className="text-sm mt-2">
                  Hired At: {new Date(job.hiredAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                {/* Rating Section */}
                <div className="mt-3">
                  <p className="text-gray-200 text-sm md:text-base font-bold mb-1">
                    Rating:
                  </p>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        className={`${star <= Math.round(job.rating || 0)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                          }`}
                      />
                    ))}

                    <span className="ml-2 text-sm text-gray-100">
                      {job.rating ? job.rating.toFixed(1) : "0.0"}
                    </span>

                    {job.totalReviews && (
                      <span className="text-xs text-gray-500">
                        ({job.totalReviews} reviews)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button className="bg-white flex items-center gap-1 text-indigo-600 px-3 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
                onClick={() => navigate('/dashboard/freelancer-view-work')}>
                <Eye size={20}/> View Work
              </button>

              <button
                onClick={() => setSelectedJob(job)}
                className="bg-yellow-400 text-black px-3 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition flex items-center gap-1"
              >
                <Send size={16} /> Submit Work
              </button>
              <button
                onClick={() => navigate('/dashboard/freelancer-profile-setting')}
                className="bg-sky-300 text-black px-3 py-2 rounded-lg font-semibold hover:bg-sky-400 transition flex items-center gap-1"
              >
                <User2 size={16} /> Update Profile
              </button>
            </div>
          </motion.div>
        ))}

        {/* ✅ Submit Work Modal */}
        {selectedJob && (
          <div className="fixed inset-0 bg-linear-to-r from-indigo-950 to-blue-900 bg-opacity-50 flex justify-center items-center z-50">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl"
            >
              <h2 className="text-xl font-bold mb-4 text-center">
                Submit Work
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-700">Live Link</label>
                  <input
                    type="text"
                    placeholder="Live Project Link"
                    className="input border border-gray-400 rounded-md py-2 px-4 w-full"
                    {...register("liveLink", { required: true })}
                  />
                  {errors.liveLink && (
                    <p className="text-red-500 text-sm">
                      Live project link is required
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-700">GitHub Link</label>
                  <input
                    type="text"
                    placeholder="GitHub Repository Link"
                    className="input border border-gray-400 rounded-md py-2 px-4 w-full"
                    {...register("githubLink", { required: true })}
                  />
                  {errors.githubLink && (
                    <p className="text-red-500 text-sm">
                      GitHub link is required
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-700">Message / Note</label>
                  <textarea
                    placeholder="Add a message or note for the client"
                    className="textarea border border-gray-400 rounded-md py-2 px-4 w-full"
                    {...register("message", { required: true })}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm">
                      Message is required
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg font-semibold hover:scale-105 transition"
                >
                  Submit
                </button>
              </form>

              <button
                onClick={() => setSelectedJob(null)}
                className="mt-4 text-center border border-gray-300 hover:bg-linear-to-r from-black to-blue-950 rounded-md py-2 text-red-500 hover:text-white w-full hover:scale-105 transition"
              >
                Cancel
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ActiveJobs;