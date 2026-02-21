import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "motion/react";
import { Github, Globe, User, CheckCircle, Loader } from "lucide-react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useParams } from "react-router-dom";

const ClientViewSubmissions = () => {
  const axiosSecure = useAxiosSecure();
  const { hireId } = useParams();


  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ["clientSubmissions", hireId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/client-submissions/by-hire/${hireId}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner/>;

  return (
    <div className="p-6 grid md:grid-cols-2 gap-4">
      {submissions.map((sub) => (
        <motion.div
          key={sub._id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200"
        >
          {/* Freelancer Info */}
          <p className="flex items-center gap-2 text-gray-700 mb-2">
            <User size={16} /> {sub.freelancerEmail}
          </p>

          {/* Status */}
          <div className="mb-2">
            {sub.status === "submitted" && (
              <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full w-fit font-semibold">
                <Loader className="animate-spin" size={16} /> Submitted
              </div>
            )}
            {sub.status === "in_progress" && (
              <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full w-fit font-semibold">
                <span>🚀 In Progress</span>
              </div>
            )}
            {sub.status === "completed" && (
              <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full w-fit font-semibold">
                <CheckCircle size={16} /> Completed
              </div>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-4 mt-3">
            <a
              href={sub.liveLink}
              target="_blank"
              className="flex items-center gap-1 bg-indigo-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-600 transition"
            >
              <Globe size={16} /> Live Project
            </a>

            <a
              href={sub.githubLink}
              target="_blank"
              className="flex items-center gap-1 bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-900 transition"
            >
              <GitHub size={16} /> GitHub Repo
            </a>
          </div>

          {/* Message */}
          <p className="mt-3 text-gray-700 font-medium">Message / Note:</p>
          <p className="text-gray-600 text-sm">{sub.message}</p>

          {/* Submitted At */}
          <p className="mt-2 text-gray-500 text-xs">
            Submitted At: {new Date(sub.submittedAt).toLocaleString()}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default ClientViewSubmissions;