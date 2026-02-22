import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "motion/react";
import {
  Star,
  Briefcase,
  Calendar,
  DollarSign,
  Building2,
  User,
} from "lucide-react";
import LoadingSpinner from "../../components/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

const FreelancerReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: hires = [], isLoading } = useQuery({
    queryKey: ["freelancerReviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/hires/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (hires.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700">
          No Reviews Yet
        </h2>
        <p className="text-gray-500">
          You haven't received any ratings yet.
        </p>
      </div>
    );
  }

  return (
    <section className="h-full lg:h-160 overflow-y-auto">
       <h2 className="text-2xl font-bold text-start pl-4 text-gray-800 mb-6">Freelancer Reviews</h2>
      <div className="p-3 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hires.map((hire) => (
          <motion.div
            key={hire._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl"
          >
            {/* Company Logo */}
            <div className="relative">
              <img
                src={hire.companyLogo}
                alt="Company Logo"
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow text-sm font-semibold flex items-center gap-1">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                {hire.rating?.toFixed(1) || "0.0"}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5 space-y-3">
              {/* Job Title */}
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Briefcase size={18} className="text-indigo-500" />
                {hire.jobTitle}
              </h3>

              {/* Client */}
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <User size={16} className="text-blue-500" />
                Client: {hire.clientName}
              </p>

              {/* Budget */}
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <DollarSign size={16} className="text-green-600" />
                {hire.bidAmount} {hire.currency} ({hire.budgetType})
              </p>

              {/* Status */}
              <p className="text-sm flex items-center gap-2">
                <Building2 size={16} className="text-purple-500" />
                Status:
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${hire.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : hire.status === "in_progress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                    }`}
                >
                  {hire.status}
                </span>
              </p>

              {/* Hired Date */}
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <Calendar size={14} />
                Hired At: {new Date(hire.hiredAt).toLocaleDateString()}
              </p>

              {/* ⭐ Dynamic Star Rating */}
              <div className="flex items-center gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className={`${star <= Math.round(hire.rating || 0)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                      }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
   </section>
  );
};

export default FreelancerReviews;