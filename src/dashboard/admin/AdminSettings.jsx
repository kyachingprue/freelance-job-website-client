import { useState } from "react";
import { motion } from "motion/react";
import { Users, UserCheck, UserMinus, Settings, Bell } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner";

const AdminSettings = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  // Fetch all users
  const { data: allUsers = [], isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      setUsers(res.data);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4 md:p-10 rounded-lg bg-gray-100 h-full lg:h-160 overflow-y-auto space-y-8">
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-extrabold text-gray-800">Admin Dashboard</h1>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition">
          <Settings size={20} /> Settings
        </button>
      </div>

      {/* --- Summary Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4"
        >
          <div className="bg-indigo-100 p-3 rounded-full">
            <Users size={28} className="text-indigo-600" />
          </div>
          <div>
            <h3 className="text-gray-500">Total Users</h3>
            <p className="text-2xl font-bold text-gray-800">{users.length}</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4"
        >
          <div className="bg-green-100 p-3 rounded-full">
            <UserCheck size={28} className="text-green-600" />
          </div>
          <div>
            <h3 className="text-gray-500">Active Users</h3>
            <p className="text-2xl font-bold text-gray-800">
              {allUsers.filter((u) => u.isActive).length}
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4"
        >
          <div className="bg-red-100 p-3 rounded-full">
            <UserMinus size={28} className="text-red-600" />
          </div>
          <div>
            <h3 className="text-gray-500">Inactive Users</h3>
            <p className="text-2xl font-bold text-gray-800">
              {users.filter((u) => !u.isActive).length}
            </p>
          </div>
        </motion.div>
      </div>

      {/* --- Users Table --- */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-175 w-full text-left">
          <thead className="bg-gray-600 text-gray-50">
            <tr>
              {["Name", "Email", "Role", "Status", "Created At"].map((header) => (
                <th
                  key={header}
                  className="px-4 py-2 text-sm font-medium uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <motion.tr
                key={user._id}
                className="border-b border-gray-200 shadow-md hover:shadow-2xl hover:bg-gray-50 transition-all"
              >
                <td className="px-4 py-2 text-gray-800 font-medium">{user.name}</td>
                <td className="px-4 py-2 text-gray-700">{user.email}</td>
                <td className="px-4 py-2 text-gray-700 capitalize">{user.role}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${user.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Notifications Preview --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-yellow-100 p-4 rounded-xl shadow flex items-center gap-4"
        >
          <Bell size={24} className="text-yellow-700" />
          <div>
            <h4 className="font-semibold text-gray-800">New Role Requests</h4>
            <p className="text-gray-600">You have 5 pending requests.</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-indigo-100 p-4 rounded-xl shadow flex items-center gap-4"
        >
          <Bell size={24} className="text-indigo-700" />
          <div>
            <h4 className="font-semibold text-gray-800">System Alerts</h4>
            <p className="text-gray-600">No critical alerts today.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminSettings;