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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hires.map((hire) => (
            <motion.div
              key={hire._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition"
            >
              <img
                src={hire.freelancerProfile}
                alt={hire.freelancerName}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />

              <h3 className="text-lg font-semibold text-center">
                {hire.freelancerName}
              </h3>

              <p className="text-center text-sm text-gray-500">
                {hire.freelancerEmail}
              </p>

              <div className="mt-4">
                <p className="font-medium">
                  Job Title:
                  <span className="text-blue-600 ml-1">
                    {hire.jobTitle}
                  </span>
                </p>

                <p className="text-sm text-gray-400 mt-2">
                  Hired At: {new Date(hire.hiredAt).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-4 text-center">
                <button
                  onClick={() => navigate(`/dashboard/hire-details/${hire._id}`)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  View Details
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
