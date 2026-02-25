import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { DollarSign, Briefcase, CheckCircle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import LoadingSpinner from "../../components/LoadingSpinner";

const FreelancerEarnings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // 🔥 Fetch Hires
  const { data: hires = [], isLoading: hiresLoading } = useQuery({
    queryKey: ["freelancer-hires", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/hires?freelancerEmail=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // 🔥 Fetch Payments
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["freelancer-payments", user?.email],
    queryFn: async () => {
      // encode email to prevent '@' breaking URL
      const freelancerEmail = encodeURIComponent(user?.email);
      const res = await axiosSecure.get(`/payments?freelancerEmail=${freelancerEmail}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // 🔹 Fetch Work Submissions
  const { data: submissions = [], isLoading: submissionsLoading } = useQuery({
    queryKey: ["freelancer-submissions", user?.email],
    queryFn: async () => {
      const email = encodeURIComponent(user?.email);
      const res = await axiosSecure.get(`/work-submissions?freelancerEmail=${email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (hiresLoading || isLoading || submissionsLoading) return <LoadingSpinner />;

  // 🔹 Calculate Top Cards
  const totalEarnings = payments.reduce((sum, p) => sum + Number(p.amount), 0);
  const activeJobs = hires.filter(h => h.status !== "completed").length;
  const totalSubmissions = submissions.length;

  // 🔥 Chart Data (Monthly Earnings)
  const chartData = payments.map((payment) => ({
    date: new Date(payment.paidAt).toLocaleDateString(),
    amount: Number(payment.amount),
  }));

  return (
    <div className="w-full h-full lg:h-160 overflow-y-auto rounded-xl p-4 space-y-6">

      {/* ================= TOP CARDS ================= */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Total Earnings */}
        <div className="bg-linear-to-r from-green-500 to-emerald-600 text-white p-6 rounded-3xl shadow-xl flex items-center justify-between">
          <div>
            <h3 className="text-lg">Total Earnings</h3>
            <p className="text-3xl font-bold mt-2">
              ${totalEarnings}
            </p>
          </div>
          <DollarSign size={50} />
        </div>

        {/* Active Jobs */}
        <div className="bg-linear-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-3xl shadow-xl flex items-center justify-between">
          <div>
            <h3 className="text-lg">Active Jobs</h3>
            <p className="text-3xl font-bold mt-2">
              {activeJobs}
            </p>
          </div>
          <Briefcase size={50} />
        </div>

        {/* Work Submissions */}
        <div className="bg-linear-to-r from-yellow-500 to-orange-600 text-white p-6 rounded-3xl shadow-xl flex items-center justify-between">
          <div>
            <h3 className="text-lg">Work Submissions</h3>
            <p className="text-3xl font-bold mt-2">{totalSubmissions}</p>
          </div>
          <CheckCircle size={50} />
        </div>

      </div>

      {/* ================= LINE CHART ================= */}
      <div className="bg-white p-6 rounded-3xl shadow-xl">
        <h3 className="text-xl font-semibold mb-4">
          Earnings Overview
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#6366F1"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ================= PAYMENTS TABLE ================= */}
      <div className="bg-white p-6 rounded-3xl shadow-xl">
        <h3 className="text-xl font-semibold mb-4">
          Payment History
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full rounded-xl text-center">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3">Client</th>
                <th className="py-3">Amount</th>
                <th className="py-3">Transaction ID</th>
                <th className="py-3">Paid At</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="bg-white hover:bg-sky-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-xl border border-gray-200"
                >
                  <td className="py-4">
                    {payment.email}
                  </td>
                  <td className="py-4">
                    ${payment.amount}
                  </td>
                  <td className="py-4">
                    {payment.transactionId}
                  </td>
                  <td className="py-4">
                    {new Date(payment.paidAt).toLocaleString()}
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

export default FreelancerEarnings;