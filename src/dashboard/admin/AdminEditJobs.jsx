import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { Save, X } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";

const AdminEditJobs = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // formData state (state optional, তবে update handle করতে convenient)
  const [formData, setFormData] = useState({});

  // Fetch job data by ID
  const { data: jobData, isLoading } = useQuery({
    queryKey: ["adminJob", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/jobs/${id}`);
      return res.data;
    },
    onSuccess: (data) => setFormData(data), // input fields কে populate করবে
  });

  // Update job mutation
  const updateJobMutation = useMutation({
    mutationFn: async (updatedJob) => {
      const res = await axiosSecure.patch(`/admin/jobs/${id}`, updatedJob);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Job updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["adminJob", id] });
      navigate("/dashboard/admin-jobs");
    },
    onError: () => {
      toast.error("Failed to update job.");
    },
  });

  // Input change handler
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      return;
    }

    if (name.startsWith("client.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        client: { ...prev.client, [key]: value },
      }));
    } else if (name === "skills") {
      setFormData((prev) => ({ ...prev, skills: value.split(",").map(s => s.trim()) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...jobData,                     
      ...formData,                    
      client: {                       
        ...jobData.client,
        ...formData.client
      },
      skills: formData.skills || jobData.skills,         
      companyLogo: formData.companyLogo || jobData.companyLogo
    };

    // If companyLogo is a file, send as FormData
    const finalPayload = payload.companyLogo instanceof File
      ? Object.keys(payload).reduce((fd, key) => {
        if (key === "companyLogo") fd.append(key, payload[key]);
        else if (key === "skills" || key === "client") fd.append(key, JSON.stringify(payload[key]));
        else fd.append(key, payload[key]);
        return fd;
      }, new FormData())
      : payload;

    updateJobMutation.mutate(finalPayload);
  };

  if (isLoading) {
    return <LoadingSpinner/>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="w-full h-full md:h-160 overflow-y-auto mx-auto p-6 bg-white shadow-lg rounded-xl"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Edit Job</h2>
        <button
          onClick={() => navigate("/dashboard/admin-jobs")}
          className="flex items-center gap-1 text-red-600 hover:underline"
        >
          <X size={18} /> Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="flex w-full justify-between flex-col md:flex-row gap-4">
          {/* Job Title */}
          <div className="w-full">
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={jobData.title}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          {/* BudgetType */}
          <div className="w-full">
            <label className="block font-semibold mb-1">BudgetType</label>
            <input
              type="text"
              name="title"
              defaultValue={jobData.budgetType}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Category & Job Type */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Category</label>
            <input
              type="text"
              name="category"
              defaultValue={jobData.category}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">Job Type</label>
            <input
              type="text"
              name="jobType"
              defaultValue={jobData.jobType}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Position & Experience */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Position</label>
            <input
              type="text"
              name="position"
              defaultValue={jobData.position}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">Experience Level</label>
            <input
              type="text"
              name="experienceLevel"
              defaultValue={jobData.experienceLevel}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Budget & Currency */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Budget</label>
            <input
              type="number"
              name="budget"
              defaultValue={jobData.budget}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">Currency</label>
            <input
              type="text"
              name="currency"
              defaultValue={jobData.currency}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label className="block font-semibold mb-1">Deadline</label>
          <input
            type="date"
            name="deadline"
            defaultValue={jobData.deadline}
            onChange={handleChange}
            className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            defaultValue={jobData.description}
            onChange={handleChange}
            className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            rows={5}
          />
        </div>

        {/* Company Logo */}
        <div>
          <label className="block font-semibold mb-1">Company Logo URL</label>
          <input
            type="text"
            name="companyLogo"
            defaultValue={jobData.companyLogo}
            onChange={handleChange}
            className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block font-semibold mb-1">
            Skills (comma separated)
          </label>
          <input
            type="text"
            name="skills"
            defaultValue={jobData.skills.join(", ")}
            onChange={handleChange}
            className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Client Info */}
        <div className="mt-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-xl mb-2">Client Info</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-gray-600">Client Name</label>
              <input
                type="text"
                name="client.name"
                placeholder="Name"
                defaultValue={jobData.client.name}
                onChange={handleChange}
                className="border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600">Client Email</label>
              <input
                type="email"
                name="client.email"
                placeholder="Email"
                defaultValue={jobData.client.email}
                onChange={handleChange}
                className="border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600">Client Location</label>
              <input
                type="text"
                name="client.location"
                placeholder="Location"
                defaultValue={jobData.client.location}
                onChange={handleChange}
                className="border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600">Client Rating</label>
              <input
                type="number"
                name="client.rating"
                placeholder="Rating"
                defaultValue={jobData.client.rating}
                onChange={handleChange}
                className="border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600">Client Total Jobs Post</label>
              <input
                type="number"
                name="client.totalJobsPosted"
                placeholder="Total Jobs Posted"
                defaultValue={jobData.client.totalJobsPosted}
                onChange={handleChange}
                className="border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600">Client Verified</label>
              <input
                type="boolean"
                name="client.verified"
                placeholder="Verified"
                defaultValue={jobData.client.verified}
                onChange={handleChange}
                className="border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex items-center my-5 gap-2 bg-sky-800 text-white px-5 py-2 rounded-lg hover:bg-sky-600 transition"
        >
          <Save size={18} /> Save Changes
        </button>
      </form>
    </motion.div>
  );
};

export default AdminEditJobs;
