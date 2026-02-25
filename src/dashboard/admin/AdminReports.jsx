import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "motion/react";
import {
  Users,
  UserCheck,
  Briefcase,
  DollarSign,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import LoadingSpinner from "../../components/LoadingSpinner";

const COLORS = ["#4ade80", "#facc15", "#f87171", "#60a5fa", "#a78bfa"];

const AdminReports = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["adminReports"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/reports");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner/>
  }

  // Destructure with fallback to 0 or empty arrays
  const {
    totalUsers = 0,
    totalClients = 0,
    totalFreelancers = 0,
    totalPayments = 0,
    paidPayments = 0,
    pendingPayments = 0,
    jobsPerCategory = {},
    completedWork = 0,
    inProgressWork = 0,
  } = data || {};

  // Pie chart data
  const paymentData = [
    { name: "Paid", value: paidPayments },
    { name: "Pending", value: pendingPayments },
  ];

  const workData = [
    { name: "Completed", value: completedWork },
    { name: "In Progress", value: inProgressWork },
  ];

  // Convert jobsPerCategory object to array for LineChart
  const jobsPerCategoryData = Object.entries(jobsPerCategory || {}).map(
    ([category, count]) => ({ category, count })
  );

  return (
    <div className="p-6 space-y-6 h-full lg:h-160 overflow-y-auto">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white shadow-md rounded-xl p-5 flex items-center space-x-4">
          <Users className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <p className="text-xl font-bold">{totalUsers}</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-white shadow-md rounded-xl p-5 flex items-center space-x-4">
          <UserCheck className="w-8 h-8 text-green-500" />
          <div>
            <p className="text-gray-500 text-sm">Clients</p>
            <p className="text-xl font-bold">{totalClients}</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-white shadow-md rounded-xl p-5 flex items-center space-x-4">
          <Briefcase className="w-8 h-8 text-purple-500" />
          <div>
            <p className="text-gray-500 text-sm">Freelancers</p>
            <p className="text-xl font-bold">{totalFreelancers}</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-white shadow-md rounded-xl p-5 flex items-center space-x-4">
          <DollarSign className="w-8 h-8 text-yellow-500" />
          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <p className="text-xl font-bold">${totalPayments}</p>
          </div>
        </motion.div>
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white shadow-md rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">Payments Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={paymentData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {paymentData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-white shadow-md rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">Work Submissions</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={workData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {workData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Jobs Per Category */}
      <motion.div whileHover={{ scale: 1.02 }} className="bg-white shadow-md rounded-xl p-5">
        <h3 className="text-lg font-semibold mb-4">Jobs Per Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={jobsPerCategoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default AdminReports;