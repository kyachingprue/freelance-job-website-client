import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Bell, CheckCircle, Circle } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FreelancerNotifications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: notifications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["freelancerNotifications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/notifications/${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner text-indigo-600"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load notifications.
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto h-full md:h-160 overflow-y-auto">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="text-indigo-600" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">
          My Notifications
        </h2>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          No notifications yet.
        </div>
      ) : (
        <div className="space-y-4">
          {notifications
            .sort(
              (a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
            )
            .map((noti) => (
              <motion.div
                key={noti._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-5 rounded-2xl shadow-sm border transition-all ${noti.status === "unread"
                    ? "bg-indigo-50 border-indigo-400"
                    : "bg-white border-gray-200"
                  }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-start gap-3">
                    {noti.status === "unread" ? (
                      <Circle
                        size={18}
                        className="text-indigo-600 mt-1"
                      />
                    ) : (
                      <CheckCircle
                        size={18}
                        className="text-green-500 mt-1"
                      />
                    )}

                    <div>
                      <p className="text-gray-800 font-medium">
                        {noti.message}
                      </p>

                      <p className="text-sm text-gray-400 mt-1">
                        {new Date(
                          noti.createdAt
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {noti.status === "unread" && (
                    <span className="text-xs px-3 py-1 bg-indigo-600 text-white rounded-full">
                      New
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
        </div>
      )}
    </div>
  );
};

export default FreelancerNotifications;
