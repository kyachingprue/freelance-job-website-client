import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { CheckCircle, Eye, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import ErrorLoading from "../../components/ErrorLoading";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../../components/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

const MyProposals = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: proposals = [], isLoading, isError } = useQuery({
    queryKey: ["userProposals", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/proposals/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorLoading />;

  return (
    <div className="h-full md:h-150 overflow-y-auto p-2 bg-gray-200">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <h1 className="text-2xl font-bold p-6 border-b border-gray-200">
          My Proposals
        </h1>

        {/* ✅ If No Data Found */}
        {proposals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl mb-4"
            >
              📭
            </motion.div>

            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No Applied Jobs Found
            </h2>

            <p className="text-gray-500 mb-6">
              You haven't applied to any jobs yet.
            </p>

            <Link to="/browse-jobs">
              <button className="px-6 py-3 bg-sky-600 text-white rounded-lg shadow-md hover:bg-sky-700 transition">
                Browse Jobs
              </button>
            </Link>
          </motion.div>
        ) : (
          /* ✅ Show Table If Data Exists */
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Image",
                    "Job Title",
                    "Bid Amount",
                    "Estimated Time",
                    "Status",
                    "Created At",
                    "Action",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody >
                {proposals.map((proposal) => (
                  <tr
                    key={proposal._id}
                    className="bg-white hover:bg-sky-100 "
                  >
                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      <img
                        src={proposal?.companyLogo}
                        alt="Company Logo"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>

                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      {proposal.jobTitle}
                    </td>

                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-700">
                      ${proposal.bidAmount}
                    </td>

                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-700">
                      {proposal.estimatedTime} days
                    </td>

                    <td className="whitespace-nowrap text-sm font-semibold">
                      {proposal.status === "pending" && (
                        <span className="flex items-center bg-yellow-600/20 rounded-full py-1.5 px-4 gap-1 text-yellow-800">
                          <XCircle size={16} /> Pending
                        </span>
                      )}
                      {proposal.status === "accepted" && (
                        <span className="flex items-center bg-green-600/20 rounded-full py-1.5 px-4 gap-1 text-green-600">
                          <CheckCircle size={16} /> Accepted
                        </span>
                      )}
                      {proposal.status === "rejected" && (
                        <span className="flex items-center bg-red-600/10 rounded-full py-1.5 px-4 gap-1 text-red-600">
                          <XCircle size={16} /> Rejected
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                      {new Date(proposal.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                      <Link
                        to={`/job-details/${proposal.jobId}`}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline transition duration-200"
                      >
                        <Eye size={18} />
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProposals;
