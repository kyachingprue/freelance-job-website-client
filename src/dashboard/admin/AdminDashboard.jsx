import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import {
  Users,
  Briefcase,
  UserCheck,
  UserX,
  ShieldAlert,
} from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/LoadingSpinner";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch Admin Dashboard Data
  const { data = {}, isLoading } = useQuery({
    queryKey: ["admin-dashboard"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const stats = data?.stats || {};
  const recentUsers = data?.recentUsers || [];
  const recentJobs = data?.recentJobs || [];

  const {
    totalUsers = 0,
    totalFreelancers = 0,
    totalClients = 0,
    totalJobs = 0,
    pendingRoleRequests = 0,
  } = stats;

  return (
    <div className="p-4 h-full lg:h-160 overflow-y-auto bg-slate-50 rounded-xl space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Overview of platform statistics and recent activity
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <DashboardCard
          title="Total Users"
          value={totalUsers}
          icon={<Users />}
          color="bg-blue-500"
        />
        <DashboardCard
          title="Freelancers"
          value={totalFreelancers}
          icon={<UserCheck />}
          color="bg-green-500"
        />
        <DashboardCard
          title="Clients"
          value={totalClients}
          icon={<UserX />}
          color="bg-indigo-500"
        />
        <DashboardCard
          title="Total Jobs"
          value={totalJobs}
          icon={<Briefcase />}
          color="bg-purple-500"
        />
        <DashboardCard
          title="Pending Role Requests"
          value={pendingRoleRequests}
          icon={<ShieldAlert />}
          color="bg-orange-500"
        />
      </div>

      {/* RECENT USERS */}
      {/* RECENT USERS */}
      <Section title="Recent Users">
        {recentUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentUsers.map((user) => (
              <motion.div
                key={user._id}
                whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.12)" }}
                className="flex items-center space-x-4 p-4 border border-gray-300 rounded-xl bg-white transition-transform duration-200"
              >
                {/* User Photo */}
                <img
                  src={user.photoURL || "https://i.ibb.co/placeholder.png"}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border border-gray-200"
                />

                {/* User Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{user.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    {user.isVerified && (
                      <span className="text-blue-500 font-bold">✔ Verified</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Joined: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Action Link */}
                <a
                  href={user.resume || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline text-sm hover:text-blue-600"
                >
                  Resume
                </a>
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyMessage />
        )}
      </Section>

      {/* RECENT JOBS */}
      <Section title="Recent Jobs">
        {recentJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentJobs.map((job) => (
              <motion.div
                key={job._id}
                whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.12)" }}
                className="p-4 border border-gray-300 rounded-xl bg-white transition-transform duration-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex space-x-3">
                    {job.companyLogo && (
                      <img
                        src={job.companyLogo}
                        alt={job.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-800">{job.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{job.category}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Posted: {new Date(job.postedAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Type: {job.jobType} | Position: {job.position} | Level: {job.experienceLevel}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Budget: {job.currency || "$"}{job.budget} ({job.budgetType})
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Proposals: {job.proposals || 0}
                      </p>
                      <p
                        className={`mt-3 text-sm font-medium ${job.status === "active"
                          ? "text-green-600"
                          : job.status === "completed"
                            ? "text-purple-600"
                            : "text-gray-500"
                          }`}
                      >
                        Status: {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </p>
                    </div>
                  </div>

                  {job.featured && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-semibold">
                      Featured
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyMessage />
        )}
      </Section>
    </div>
  );
};

// Dashboard Card Component
const DashboardCard = ({ title, value, icon, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white rounded-2xl shadow-xl hover:shadow-2xl p-5 flex items-center justify-between"
  >
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-xl font-bold mt-1">{value}</h3>
    </div>
    <div className={`${color} text-white p-3 rounded-xl`}>{icon}</div>
  </motion.div>
);

// Section Component
const Section = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow p-5">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="space-y-3">{children}</div>
  </div>
);

// ItemRow Component
const ItemRow = ({ title, status }) => (
  <div className="flex justify-between border border-gray-400 rounded px-4 py-2 hover:bg-gray-50 transition">
    <p className="font-medium">{title}</p>
    <span className="text-sm text-gray-500 capitalize">{status}</span>
  </div>
);

// EmptyMessage Component
const EmptyMessage = () => (
  <p className="text-gray-400 italic">No data available</p>
);

export default AdminDashboard;