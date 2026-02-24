import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { CreditCard } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { motion } from "motion/react";
import LoadingSpinner from "../../components/LoadingSpinner";

const ClientPaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch payments using TanStack Query v5
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["client-payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>

      <div className="w-full lg:max-w-6xl h-full lg:h-160 overflow-y-auto bg-sky-500/10 backdrop-blur-lg shadow-2xl rounded-3xl p-6 border border-white/40">

        <h2 className="text-2xl font-bold mb-6 bg-linear-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent flex items-center justify-start gap-2">
          <CreditCard className="text-blue-500" size={26} /> <span className="pb-1">Payment History</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-center border-separate border-spacing-y-3">

            {/* Table Head */}
            <thead>
              <tr className="bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl">
                <th className="py-4 rounded-l-xl uppercase">Hire ID</th>
                <th className="py-4 uppercase">Email</th>
                <th className="py-4 uppercase">Amount</th>
                <th className="py-4 uppercase">Transaction ID</th>
                <th className="py-4 rounded-r-xl uppercase">Paid At</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {payments.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-4 text-gray-500">No payments found.</td>
                </tr>
              )}

              {payments.map((payment) => (
                <motion.tr
                  key={payment._id}
                  className="bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all hover:bg-amber-100 duration-300 rounded-xl"
                >
                  <td className="py-4 px-3 rounded-l-xl font-medium text-gray-700">{payment.hireId}</td>
                  <td className="py-4 text-gray-700">{payment.email}</td>
                  <td className="py-4 text-gray-700">${payment.amount}</td>
                  <td className="py-4 text-gray-700">{payment.transactionId}</td>
                  <td className="py-4 rounded-r-xl text-gray-700">
                    {new Date(payment.paidAt).toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientPaymentHistory;