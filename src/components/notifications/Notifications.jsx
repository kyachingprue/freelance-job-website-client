import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Notifications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: notifications = [] } = useQuery({
    queryKey: ["allNotifications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/notifications/${user.email}`
      );
      return res.data;
    },
  });

  return (
    <section className="bg-gray-200">
      <div className="max-w-5xl min-h-screen mx-auto py-24 px-4">
        <h2 className="text-2xl font-bold mb-6">All Notifications</h2>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center bg-white shadow-lg rounded-2xl p-12"
            >
              <div className="text-5xl mb-4">🔔</div>

              <h3 className="text-2xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                No Notifications Yet
              </h3>

              <p className="text-gray-500 mt-3 max-w-sm">
                You don’t have any notifications at the moment.
                Once someone interacts with your work, it will appear here.
              </p>
            </motion.div>
          ) : (
            notifications.map((noti) => (
              <motion.div
                key={noti._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 hover:shadow-xl hover:-translate-y-1 transition-all rounded-xl shadow-sm ${noti.status === "unread"
                    ? "bg-blue-50 border-l-4 border-blue-500"
                    : "bg-white"
                  }`}
              >
                <p>{noti.message}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(noti.createdAt).toLocaleString()}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </div>
   </section>
  );
};

export default Notifications;
