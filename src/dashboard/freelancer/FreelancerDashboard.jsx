import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import {
  Briefcase,
  CheckCircle,
  DollarSign,
  FileText,
} from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/LoadingSpinner";

const FreelancerDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["freelancer-dashboard", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/freelancer/dashboard?email=${user.email}`
      );
      return res.data; // return FULL response
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // Safe destructuring
  const stats = data?.stats || {};
  const recentSubmissions = data?.recentSubmissions || [];

  const {
    totalHires = 0,
    submittedWorks = 0,
    completedWorks = 0,
    totalEarnings = 0,
    totalProposals = 0,
  } = stats;

  return (
    <div className="p-4 h-full lg:h-160 overflow-y-auto bg-slate-50 rounded-xl space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Freelancer Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Overview of your freelance activity and earnings
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="flex flex-wrap justify-between items-center">
        <DashboardCard
          title="Total Proposals"
          value={totalProposals}
          icon={<FileText />}
          color="bg-blue-500"
        />
        <DashboardCard
          title="Total Hires"
          value={totalHires}
          icon={<Briefcase />}
          color="bg-indigo-500"
        />
        <DashboardCard
          title="Submitted Works"
          value={submittedWorks}
          icon={<CheckCircle />}
          color="bg-purple-500"
        />
        <DashboardCard
          title="Completed Works"
          value={completedWorks}
          icon={<CheckCircle />}
          color="bg-green-500"
        />
        <DashboardCard
          title="Total Earnings"
          value={`$${totalEarnings}`}
          icon={<DollarSign />}
          color="bg-emerald-500"
        />
      </div>

      {/* RECENT SUBMISSIONS */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow p-6"
      >
        <h2 className="text-xl font-semibold mb-4">
          Recent Submissions
        </h2>

        <div className="space-y-4">
          {recentSubmissions.length > 0 ? (
            recentSubmissions.map((submission) => (
              <div
                key={submission._id}
                className="border border-gray-300 rounded-xl p-4 shadow-2xl hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-800">
                    Hire ID: {submission.hireId}
                  </p>

                  <span
                    className={`text-sm px-2 py-1 rounded-full capitalize ${submission.payment_status === "paid"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                      }`}
                  >
                    {submission.payment_status}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  {submission.message}
                </p>

                <div className="flex gap-4 mt-3 text-sm">
                  <a
                    href={submission.liveLink}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    Live Preview
                  </a>

                  <a
                    href={submission.githubLink}
                    target="_blank"
                    className="text-gray-700 hover:underline"
                  >
                    GitHub Repo
                  </a>
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  Submitted: {new Date(submission.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No submissions yet.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const DashboardCard = ({ title, value, icon, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white rounded-2xl shadow-md hover:shadow-2xl p-3 flex items-center justify-between gap-3"
  >
    <div>
      <p className="text-gray-600 font-bold text-sm">{title}</p>
      <h3 className="text-xl font-bold mt-1">{value}</h3>
    </div>
    <div className={`${color} text-white p-3 rounded-xl`}>
      {icon}
    </div>
  </motion.div>
);

export default FreelancerDashboard;