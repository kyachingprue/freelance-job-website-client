import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

const ClientHireFreelancer = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: hires = [], isLoading } = useQuery({
    queryKey: ["clientHires", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/hires/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner/>;
  }

  return (
    <div className="p-2 h-full md:h-160 overflow-y-auto w-full md:p-6">
      <h2 className="text-2xl font-bold mb-6">Hired Freelancers</h2>

      {hires.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No freelancers hired yet.</p>
        </div>
      ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {hires.map((hire) => (
              <motion.div
                key={hire._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white/80 backdrop-blur-md border border-gray-200 
                 shadow-lg rounded-2xl p-6 transition-all duration-300 
                 hover:shadow-2xl hover:border-blue-400"
              >
                {/* Profile Section */}
                <div className="flex items-center gap-4">
                  <img
                    src={hire.freelancerProfile}
                    alt={hire.freelancerName}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                  />

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {hire.freelancerName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {hire.freelancerEmail}
                    </p>
                  </div>
                </div>

                {/* Job Info */}
                <div className="mt-4 space-y-2">
                  <p className="text-sm">
                    <span className="text-sm md:text-base font-bold text-gray-700">Job:</span>{" "}
                    <span className="text-blue-600 font-medium">
                      {hire.jobTitle}
                    </span>
                  </p>

                  <div className="flex flex-row items-center gap-2">
                    <p className="text-sm font-bold text-gray-500">
                      Hired At:
                    </p>
                    <span className="text-sm text-blue-500">{new Date(hire.hiredAt).toLocaleDateString()}</span>
                  </div>

                  {/* Status Badge */}
                  <div className="flex flex-row items-center gap-2">
                    <p className="text-gray-700 text-sm md:text-base font-bold">Status:</p>
                    <span className="inline-block px-3 py-1.5 text-xs rounded-full 
                         bg-green-100 text-green-700 font-medium">
                      {hire.status || "In Progress"}
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/hire-details/${hire._id}`)
                    }
                    className="flex-1 bg-blue-600 hover:bg-blue-700 
                     text-white py-2 rounded-xl text-sm font-medium 
                     transition"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/dashboard/add-work/${hire._id}`)
                    }
                    className="flex-1 border border-blue-600 text-blue-600 
                     hover:bg-blue-200 py-2 rounded-xl text-sm 
                     font-medium transition"
                  >
                    Add Work
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
      )}
    </div>
  );
};

export default ClientHireFreelancer;
