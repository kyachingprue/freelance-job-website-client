import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";

const ClientProposals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ✅ Fetch proposals for logged-in client
  const { data: proposals = [], refetch, isLoading } = useQuery({
    queryKey: ["clientProposals", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/proposals/client/${user.email}`
      );
      return res.data;
    },
  });

  // ✅ Handle Status Change
  const handleStatusChange = async (proposalId, newStatus) => {
    try {
      await axiosSecure.patch(
        `/proposals/status/${proposalId}`,
        { status: newStatus }
      );

      toast.success("Status updated successfully ✅");
      refetch();
    } catch (error) {
      toast.error("Failed to update status ❌", error?.message);
    }
  };

  if (isLoading) {
    return <LoadingSpinner/>;
  }

  return (
    <div className="md:p-6 h-160 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">
        Client Proposals ({proposals.length})
      </h2>

      {proposals.length === 0 ? (
        <div className="text-gray-500 text-center py-10">
          No proposals received yet.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Freelancer</th>
                <th className="px-4 py-3">Job Title</th>
                <th className="px-4 py-3">Bid</th>
                <th className="px-4 py-3">Estimated Time</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {proposals.map((proposal) => (
                <tr
                  key={proposal._id}
                  className="border-t border-gray-300 hover:bg-sky-50"
                >
                  {/* Freelancer Info */}
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={proposal.freelancerProfile || null}
                      alt={proposal.freelancerName}
                      className="w-10 h-10 rounded-full object-cover border border-sky-500"
                    />
                    <div>
                      <p className="font-medium">
                        {proposal.freelancerName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {proposal.freelancerEmail}
                      </p>
                    </div>
                  </td>

                  {/* Job Title */}
                  <td className="px-4 py-3">
                    <span className="text-blue-950 bg-sky-500/15 rounded-full py-1.5 px-4">{proposal.jobTitle}</span>
                  </td>

                  {/* Bid */}
                  <td className="px-4 py-3 font-medium">
                    ${proposal.bidAmount}
                  </td>

                  {/* Estimated Time */}
                  <td className="px-4 py-3">
                    {proposal.estimatedTime} days
                  </td>

                  {/* Status Dropdown */}
                  <td className="px-4 py-3">
                    {proposal.status === "accepted" ? (
                      <span className="text-green-600 bg-green-600/20 px-4 py-1.5 rounded-full font-medium">
                        Accepted
                      </span>
                    ) : proposal.status === "rejected" ? (
                      <span className="text-red-600 bg-red-600/20 py-1.5 px-4 rounded-full font-medium">
                        Rejected
                      </span>
                    ) : (
                      <select
                        value={proposal.status}
                        onChange={(e) =>
                          handleStatusChange(
                            proposal._id,
                            e.target.value
                          )
                        }
                        className="border px-2 py-1 rounded-md"
                      >
                        <option value="pending">Pending</option>
                        <option value="accepted">Accept</option>
                        <option value="rejected">Reject</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClientProposals;
