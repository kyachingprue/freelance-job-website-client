import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "motion/react";
import { DollarSign } from "lucide-react";
import LoadingSpinner from "../../components/LoadingSpinner";

const AdminPayments = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments/admin");
      return res.data;
    },
  });

  // ✅ Loading Skeleton
  if (isLoading) {
    return <LoadingSpinner/>
  }

  return (
    <div className="p-4 h-full lg:h-160 overflow-y-auto">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-6 flex items-center gap-2"
      >
        <DollarSign size={22} />
        All Payments
      </motion.h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-sky-900 text-gray-50 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Email <span className="text-pink-300">(Client/Freelancer)</span></th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Method</th>
              <th className="px-6 py-4">Transaction ID</th>
              <th className="px-6 py-4">Paid At</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment, index) => (
              <tr
                key={payment._id}
                className=" hover:bg-gray-50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <td className="px-6 py-4 font-medium">
                  {index + 1}
                </td>
                <td className="flex py-4 flex-col gap-1">
                  <p className="text-sm font-bold text-gray-800">Client:
                    <span className="text-sky-900"> {payment.email}</span></p>
                  <p className="text-sm font-bold text-gray-800">Freelancer:
                    <span className="text-sky-900">{payment.freelancerEmail}</span></p>
                </td>
                <td className="px-6 py-4 font-semibold text-green-600">
                  ${payment.amount}
                </td>
                <td className="px-6 py-4 capitalize">
                  {payment.paymentMethod}
                </td>
                <td className="px-6 py-4 text-xs text-gray-500">
                  {payment.transactionId}
                </td>
                <td className="px-6 py-4 text-xs text-gray-500">
                  {new Date(payment.paidAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPayments;