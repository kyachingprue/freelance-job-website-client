import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CheckCircle } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdminRoleRequests = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch role requests
  const { data: requests = [], refetch } = useQuery({
    queryKey: ["roleRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/role-requests");
      return res.data;
    },
  });

  // Accept Handler
  const handleAccept = async (request) => {
    try {
      const res = await axiosSecure.patch(
        `/role-requests/accept/${request._id}`,
        {
          userEmail: request.userEmail,
          requestRole: request.requestRole,
        }
      );

      if (res.data.success) {
        toast.success("Role updated successfully!");
        refetch();
      }
    } catch (error) {
      toast.error("Something went wrong!",error?.message);
    }
  };

  return (
    <div className="h-full lg:h-160 overflow-y-auto">

      <div className="w-full max-w-6xl bg-sky-500/15 backdrop-blur-lg shadow-2xl rounded-3xl p-6 border border-white/40">

        <h2 className="text-2xl font-bold text-center mb-6 bg-linear-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent">
          Role Requests Management
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-center border-separate border-spacing-y-3">

            {/* Table Head */}
            <thead>
              <tr className="bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl">
                <th className="py-4 rounded-l-xl uppercase">Profile</th>
                <th className="py-4 uppercase">Email</th>
                <th className="py-4 uppercase">Current Role</th>
                <th className="py-4 uppercase">Requested Role</th>
                <th className="py-4 uppercase">Status</th>
                <th className="py-4 rounded-r-xl uppercase">Role Setup</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {requests.map((req) => (
                <tr
                  key={req._id}
                  className="bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-xl"
                >
                  <td className="py-4 px-3 rounded-l-xl ">
                    <img src={req.userProfile} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
                  </td>
                  <td className="py-4 font-medium text-gray-700">
                    {req.userEmail}
                  </td>

                  <td className="py-4 capitalize text-gray-700">
                    <span className="py-1.5 px-4 rounded-full bg-pink-500/20">{req.currentRole}</span>
                  </td>

                  <td className="py-4 capitalize text-gray-600 font-semibold">
                    {req.requestRole}
                  </td>

                  <td className="py-4">
                    <span
                      className={`px-4 py-1 text-sm font-semibold rounded-full text-white shadow-md ${req.status === "pending"
                          ? "bg-linear-to-r from-yellow-400 to-orange-500"
                          : "bg-linear-to-r from-green-400 to-emerald-600"
                        }`}
                    >
                      {req.status}
                    </span>
                  </td>

                  <td className="py-4 rounded-r-xl">
                    <button
                      onClick={() => handleAccept(req)}
                      disabled={req.requestRole !== "client"}
                      className={`flex items-center justify-center gap-2 mx-auto px-5 py-2 rounded-full text-white font-semibold transition-all duration-300 shadow-md ${req.status === "pending"
                          ? "bg-linear-to-r from-green-500 to-emerald-600 hover:scale-110 hover:shadow-xl"
                          : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                      <CheckCircle size={18} />
                      Accept
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminRoleRequests;