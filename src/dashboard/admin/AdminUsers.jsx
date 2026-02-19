import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import { Eye, Trash2, ShieldCheck, ShieldX, X } from "lucide-react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";

const AdminUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedUser, setSelectedUser] = useState(null);

  // ✅ Fetch Users with TanStack Query
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // ✅ Delete User
  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-gray-800">
          Are you sure you want to delete this user?
        </p>

        <div className="flex justify-end gap-3">
          {/* Cancel Button */}
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>

          {/* Delete Button */}
          <button
            onClick={async () => {
              toast.dismiss(t.id);

              try {
                await axiosSecure.delete(`/users/${id}`);
                toast.success("User Deleted Successfully ✅");
                refetch();
              } catch (error) {
                toast.error("Delete Failed ❌", error?.message);
              }
            }}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  if (isLoading) {
    return <LoadingSpinner/>;
  }

  return (
    <div className="h-full lg:h-160 overflow-y-auto p-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-6"
      >
        All Users ({users.length})
      </motion.h2>

      <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
        <table className="min-w-full">
          <thead className="bg-linear-to-r from-indigo-500 to-purple-500 text-white">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Verified</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="border-b border-gray-300 bg-gray-100 hover:bg-white transition"
              >
                {/* User Info */}
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={u.photoURL}
                    alt="profile"
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-semibold">{u.name}</p>
                    <p className="text-sm text-gray-500 break-all">
                      {u.email}
                    </p>
                  </div>
                </td>

                {/* Role */}
                <td className="p-3 capitalize font-medium">
                  <span className="py-1.5 px-4 rounded-full bg-pink-500/10"> {u.role}</span>
                </td>

                {/* Verified */}
                <td className="p-3">
                  {u.isVerified ? (
                    <span className="flex items-center gap-1 text-green-600 font-medium">
                      <ShieldCheck size={16} /> Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-500 font-medium">
                      <ShieldX size={16} /> Not Verified
                    </span>
                  )}
                </td>

                {/* Action */}
                <td className="p-3 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => setSelectedUser(u)}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                    >
                      <Eye size={16} /> View
                    </button>

                    <button
                      onClick={() => handleDelete(u._id)}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
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

      {/* ✅ View Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl p-6 w-full max-w-2xl relative overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedUser(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              >
                <X />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <img
                  src={selectedUser.photoURL}
                  className="w-20 h-20 rounded-full border object-cover"
                  alt="profile"
                />
                <div>
                  <h3 className="text-xl font-bold">
                    {selectedUser.name}
                  </h3>
                  <p className="text-gray-500 break-all">
                    {selectedUser.email}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p><strong>Role:</strong> {selectedUser.role}</p>
                <p><strong>Title:</strong> {selectedUser.title}</p>
                <p><strong>Skills:</strong> {selectedUser.skills?.join(", ")}</p>
                <p><strong>GitHub:</strong> {selectedUser.github}</p>
                <p><strong>LinkedIn:</strong> {selectedUser.linkedin}</p>
                <p><strong>Resume:</strong> {selectedUser.resume}</p>
                <p><strong>Verified:</strong> {selectedUser.isVerified ? "Yes" : "No"}</p>
                <p><strong>Role Request Sent:</strong> {selectedUser.roleRequestSent ? "Yes" : "No"}</p>
                <p><strong>Description:</strong> {selectedUser.description}</p>
                <p><strong>Created At:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminUsers;
