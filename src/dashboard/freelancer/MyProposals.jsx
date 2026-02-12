import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { CheckCircle, XCircle } from "lucide-react";
import ErrorLoading from "../../components/ErrorLoading";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../../components/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

const MyProposals = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  // Fetch proposals
  const { data: proposals, isLoading, isError } = useQuery({
    queryKey: ["userProposals", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/proposals/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });


  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorLoading/>;

  return (
    <div className="min-h-full p-2 bg-gray-200">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <h1 className="text-2xl font-bold p-6 border-b border-gray-200">
          My Proposals
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Image","Job Title", "Bid Amount", "Estimated Time", "Status", "Created At"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {proposals?.map((proposal) => (
                <motion.tr
                  key={proposal._id}
                  className="bg-white hover:bg-sky-100"
                >
                  <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                    <img src={proposal?.companyLogo} alt="Company Logo" className="w-10 h-10 rounded-full object-cover" />
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
                  <td className=" whitespace-nowrap text-sm font-semibold">
                    {proposal.status === "pending" && (
                      <span className="flex items-center bg-yellow-600/20 rounded-full py-1.5 px-4 gap-1 text-yellow-800">
                        <XCircle size={16} /> Pending
                      </span>
                    )}
                    {proposal.status === "approved" && (
                      <span className="flex items-center  bg-green-600/20 rounded-full py-1.5 px-4 gap-1 text-green-600">
                        <CheckCircle size={16} /> Approved
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
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyProposals;
