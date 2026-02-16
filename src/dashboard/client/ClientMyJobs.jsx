import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import toast from "react-hot-toast";
import { Eye, Plus,X } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

const ClientMyJobs = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);


  const { register, handleSubmit, reset } = useForm();

  // ✅ Fetch client jobs
  const { data: jobs = [], refetch, isLoading } = useQuery({
    queryKey: ["clientJobs", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/jobs/client/${user.email}`);
      return res.data;
    },
  });

  // ✅ Create Job
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const jobData = {
        title: data.title,
        category: data.category,
        jobType: data.jobType,
        position: data.position,
        experienceLevel: data.experienceLevel,
        budgetType: data.budgetType,
        budget: Number(data.budget),
        currency: data.currency,
        deadline: data.deadline,
        description: data.description,
        companyLogo: data.companyLogo,

        // ✅ convert skills string to array
        skills: data.skills
          ? data.skills.split(",").map(skill => skill.trim())
          : [],

        // ✅ nested client object (VERY IMPORTANT)
        client: {
          name: user?.displayName || "Unknown",
          email: user?.email,
          location: "Canada",
          rating: 0,
          totalJobsPosted: 0,
          verified: true,
        },

        proposals: 0,
        status: "Open",
        featured: data.featured || false,
        postedAt: new Date().toISOString().split("T")[0],
      };

      await axiosSecure.post("/jobs", jobData);

      toast.success("Job posted successfully 🎉");
      setOpenModal(false);
      reset();
      refetch();
    } catch (error) {
      toast.error("Failed to post job ❌", error?.message);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner/>
  }
  return (
    <div className="md:p-6 h-full md:h-160 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Total Jobs ({jobs?.length})</h2>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm md:text-base hover:bg-indigo-700 transition"
        >
          <Plus size={18} /> Create New Job
        </button>
      </div>

      {/* Table or Empty */}
      {jobs.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No jobs posted yet.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase">
              <tr>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Budget</th>
                <th className="px-6 py-3">Deadline</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id} className="border-t hover:bg-sky-100 border-gray-400">
                  <td className="px-6 py-3">
                    <img className="w-10 h-9 rounded-md object-cover" src={job?.companyLogo} alt={job?.title} />
                  </td>
                  <td className="px-6 py-3">{job.title}</td>
                  <td className="px-6 py-3">
                    <span className="bg-blue-700/20 rounded-full py-1.5 px-4">{job.category}</span>
                  </td>
                  <td className="px-6 py-3">
                    {job.currency} {job.budget}
                  </td>
                  <td className="px-6 py-3">{job.deadline}</td>
                  <td className="px-6 py-3 text-green-600 font-medium">
                    {job.status}
                  </td>
                  <td className="px-6 py-3 text-green-600 font-medium">
                    <Link to={`/job-details/${job._id}`} className="flex items-center gap-2 hover:underline text-blue-500">
                    <Eye size={17} /> View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence >
        {openModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center py-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-6 relative max-h-[95vh] overflow-y-auto"
            >
              <button
                onClick={() => setOpenModal(false)}
                className="absolute top-3 right-3 text-gray-500"
              >
                <X />
              </button>

              <h3 className="text-xl font-bold mb-4">Create New Job</h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                <div className="grid md:grid-cols-2 gap-4">

                  {/* Job Title */}
                  <div>
                    <label className="block font-medium mb-1">Job Title</label>
                    <input
                      {...register("title", { required: true })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="Enter job title"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block font-medium mb-1">Category</label>
                    <input
                      {...register("category", { required: true })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="Web Development, DSA, etc."
                    />
                  </div>

                  {/* Job Type */}
                  <div>
                    <label className="block font-medium mb-1">Job Type</label>
                    <select
                      {...register("jobType", { required: true })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                      <option value="Remote">Remote</option>
                      <option value="Onsite">Onsite</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  {/* Position */}
                  <div>
                    <label className="block font-medium mb-1">Position Level</label>
                    <select
                      {...register("position", { required: true })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                      <option value="Junior">Junior</option>
                      <option value="Mid">Mid</option>
                      <option value="Senior">Senior</option>
                    </select>
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block font-medium mb-1">Experience Level</label>
                    <select
                      {...register("experienceLevel", { required: true })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                      <option value="Entry">Entry</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>

                  {/* Budget Type */}
                  <div>
                    <label className="block font-medium mb-1">Budget Type</label>
                    <select
                      {...register("budgetType", { required: true })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                      <option value="Fixed">Fixed</option>
                      <option value="Hourly">Hourly</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block font-medium mb-1">Budget</label>
                    <input
                      type="number"
                      {...register("budget", { required: true })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>

                  {/* Currency */}
                  <div>
                    <label className="block font-medium mb-1">Currency</label>
                    <select
                      {...register("currency", { required: true })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                      <option value="USD">USD</option>
                      <option value="BDT">BDT</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>

                  {/* Deadline */}
                  <div>
                    <label className="block font-medium mb-1">Deadline</label>
                    <input
                      type="date"
                      {...register("deadline", { required: true })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>

                  {/* Company Logo */}
                  <div>
                    <label className="block font-medium mb-1">Company Logo URL</label>
                    <input
                      {...register("companyLogo", {required: true})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="Paste image URL"
                    />
                  </div>

                </div>

                {/* Skills */}
                <div>
                  <label className="block font-medium mb-1">
                    Skills (comma separated)
                  </label>
                  <input
                    {...register("skills", {required: true})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block font-medium mb-1">Job Description</label>
                  <textarea
                    {...register("description", { required: true })}
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>

                {/* Featured */}
                <div className="flex items-center gap-2">
                  <input type="checkbox" {...register("featured")} />
                  <label>Mark as Featured Job</label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-lg text-white font-medium transition ${loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                >
                  {loading ? "Posting Job..." : "Post Job"}
                </button>

              </form>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClientMyJobs;
