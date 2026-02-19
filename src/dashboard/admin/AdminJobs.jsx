import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AdminJobs = () => {
  const axiosSecure = useAxiosSecure();
  const [viewJob, setViewJob] = useState(null);
  const [editJob, setEditJob] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch Jobs using TanStack Query
  const { data: jobs = [], refetch } = useQuery({
    queryKey: ["adminJobs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/jobs");
      return res.data;
    },
  });

  // ✅ Delete with Toast Confirmation
  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-gray-800">
          Are you sure you want to delete this job?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await axiosSecure.delete(`/admin/jobs/${id}`);
                toast.success("Job Deleted Successfully ✅");
                refetch();
              } catch (error) {
                toast.error("Delete Failed ❌", error?.message);
              }
            }}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full lg:h-160 overflow-y-auto p-4"
    >
      <h2 className="text-xl md:text-2xl font-bold mb-6">All Jobs ({jobs?.length})</h2>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-sky-200">
            <tr>
              <th className="p-3 uppercase text-left">Image</th>
              <th className="p-3 uppercase text-left">Title</th>
              <th className="p-3 uppercase text-left">Category</th>
              <th className="p-3 uppercase text-center">Budget</th>
              <th className="p-3 uppercase text-center">Status</th>
              <th className="p-3 uppercase text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr
                key={job._id}
                className="border-b border-gray-300 hover:bg-white bg-gray-100 transition"
              >
                <td className="p-3">
                  <img className="w-8 h-8 md:w-12 md:h-12 rounded-full" src={job.companyLogo} alt={job.title} />
                </td>
                <td className="p-3">{job.title}</td>
                <td className="p-3">{job.category}</td>
                <td className="p-3 text-center">
                  {job.currency} {job.budget}
                </td>
                <td className="p-3 text-center">{job.status}</td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    {/* View */}
                    <button
                      onClick={() => navigate(`/job-details/${job._id}`)}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg flex items-center gap-1 hover:scale-105 transition"
                    >
                      <Eye size={16} /> View
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => navigate(`/dashboard/admin-job-edit/${job._id}`)}
                      className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-lg flex items-center gap-1 hover:scale-105 transition"
                    >
                      <Pencil size={16} /> Edit
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded-lg flex items-center gap-1 hover:scale-105 transition"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {viewJob && (
        <JobViewModal job={viewJob} onClose={() => setViewJob(null)} />
      )}

      {/* Edit Modal */}
      {editJob && (
        <JobEditModal
          job={editJob}
          onClose={() => setEditJob(null)}
          refetch={refetch}
        />
      )}
    </motion.div>
  );
};

export default AdminJobs;
