import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import {
  Briefcase,
  CheckCircle,
  DollarSign,
  Users,
} from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/LoadingSpinner";

const ClientDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["client-dashboard", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/client/dashboard?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const stats = data?.stats || {};
  const recentJobs = data?.recentJobs || [];
  const recentHires = data?.recentHires || [];
  const recentPayments = data?.recentPayments || [];

  const {
    totalJobs = 0,
    activeJobs = 0,
    completedJobs = 0,
    totalHires = 0,
    totalSpent = 0,
  } = stats;

  return (
    <div className="p-4 bg-slate-50 h-full lg:h-160 overflow-y-auto space-y-8 rounded-xl">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Client Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your projects and track spending
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <DashboardCard title="Total Jobs" value={totalJobs} icon={<Briefcase />} color="bg-blue-500" />
        <DashboardCard title="Active Jobs" value={activeJobs} icon={<Briefcase />} color="bg-indigo-500" />
        <DashboardCard title="Completed Jobs" value={completedJobs} icon={<CheckCircle />} color="bg-green-500" />
        <DashboardCard title="Total Hires" value={totalHires} icon={<Users />} color="bg-purple-500" />
        <DashboardCard title="Total Spent" value={`$${totalSpent}`} icon={<DollarSign />} color="bg-emerald-500" />
      </div>

      {/* RECENT JOBS */}
      <Section title="Recent Jobs">
        {recentJobs.length > 0 ? (
          <div className="space-y-3">
            {recentJobs.map((job) => (
              <div
                key={job._id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-300 rounded-lg p-4 shadow-xl hover:shadow-2xl transition-shadow duration-200 bg-white hover:bg-gray-100"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {job.category} • {job.position} • {job.jobType}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Posted: {new Date(job.postedAt).toLocaleDateString()} • Budget: {job.currency} {job.budget}
                  </p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${job.status === "Open"
                        ? "bg-green-100 text-green-800"
                        : job.status === "Closed"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                  >
                    {job.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No recent jobs posted.</p>
        )}
      </Section>

      {/* RECENT HIRES */}
      <Section title="Recent Hires">
        {recentHires.length > 0 ? (
          <div className="space-y-3">
            {recentHires.map((hire) => (
              <div
                key={hire._id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-200 rounded-lg p-4 shadow-xl hover:shadow-2xl hover:bg-gray-100 transition-shadow duration-200 bg-white"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{hire.jobTitle || "Untitled Job"}</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Freelancer: {hire.freelancerEmail || "Unknown"} • Hired At: {new Date(hire.createdAt).toLocaleDateString()}
                  </p>
                  {hire.amount && (
                    <p className="text-gray-400 text-xs mt-1">
                      Budget: {hire.currency || "USD"} {hire.amount}
                    </p>
                  )}
                </div>
                <div className="mt-2 md:mt-0">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${hire.status === "active"
                        ? "bg-blue-100 text-blue-800"
                        : hire.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : hire.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                  >
                    {hire.status || "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No recent hires yet.</p>
        )}
      </Section>

      {/* RECENT PAYMENTS */}
      <Section title="Recent Payments">
        {recentPayments.length > 0 ? (
          <div className="space-y-3">
            {recentPayments.map((payment) => (
              <div
                key={payment._id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-300 rounded-lg p-4 shadow-xl hover:shadow-2xl hover:bg-gray-100 transition-shadow duration-200 bg-white"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    ${payment.amount || "0.00"}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Freelancer: {payment.freelancerEmail || "Unknown"} • Hire ID: {payment.hireId || "N/A"}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Paid At: {new Date(payment.paidAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Paid
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No recent payments yet.</p>
        )}
      </Section>

    </div>
  );
};

const DashboardCard = ({ title, value, icon, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white rounded-2xl shadow-xl hover:shadow-2xl p-5 flex justify-between items-center"
  >
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-xl font-bold mt-1">{value}</h3>
    </div>
    <div className={`${color} text-white p-3 rounded-xl`}>
      {icon}
    </div>
  </motion.div>
);

const Section = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl shadow p-6"
  >
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="space-y-3">{children}</div>
  </motion.div>
);

const ItemRow = ({ title, status }) => (
  <div className="flex justify-between border-b pb-2">
    <p>{title || "Untitled"}</p>
    <span className="text-sm text-gray-500 capitalize">{status}</span>
  </div>
);

const EmptyMessage = () => (
  <p className="text-gray-400">No data available.</p>
);

export default ClientDashboard;