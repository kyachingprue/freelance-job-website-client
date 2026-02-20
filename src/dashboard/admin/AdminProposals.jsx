import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdminProposals = () => {
  const axiosSecure = useAxiosSecure();

  const { data: proposals = [], isLoading, isError } = useQuery({
    queryKey: ["adminProposals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/proposals");
      return res.data;
    },
  });

  const getStatusStyle = (status) => {
    if (status === "pending") {
      return "bg-yellow-100 text-yellow-700";
    } else if (status === "accepted" || status === "confirm") {
      return "bg-green-100 text-green-700";
    } else if (status === "rejected") {
      return "bg-red-100 text-red-700";
    } else {
      return "bg-gray-100 text-gray-600";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load proposals.
      </p>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          All Proposals
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-linear-to-r from-indigo-600 to-blue-600 text-white">
                <th className="px-4 py-3 text-left">Job Title</th>
                <th className="px-4 py-3 text-left">Freelancer</th>
                <th className="px-4 py-3 text-left">Client</th>
                <th className="px-4 py-3 text-left">Bid</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {proposals.map((proposal, index) => (
                <tr
                  key={proposal._id}
                  className={`border-b hover:bg-gray-50 transition duration-200 ${index % 2 === 0 ? "bg-gray-50/40" : ""
                    }`}
                >
                  {/* Job Title */}
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {proposal.jobTitle}
                  </td>

                  {/* Freelancer */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={proposal.freelancerProfile}
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                      <div>
                        <p className="font-semibold text-gray-700">
                          {proposal.freelancerName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {proposal.freelancerEmail}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Client */}
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-700">
                      {proposal.clientName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {proposal.clientLocation}
                    </p>
                  </td>

                  {/* Bid */}
                  <td className="px-4 py-3 font-semibold text-indigo-600">
                    {proposal.currency} {proposal.bidAmount}
                    <p className="text-sm text-gray-500">
                      {proposal.budgetType}
                    </p>
                  </td>

                  {/* Time */}
                  <td className="px-4 py-3 text-gray-600">
                    {proposal.estimatedTime} days
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(proposal.createdAt).toLocaleDateString()}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold transition duration-300 ${getStatusStyle(
                        proposal.status
                      )}`}
                    >
                      {proposal.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {proposals.length === 0 && (
            <p className="text-center text-gray-500 py-6">
              No proposals found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProposals;