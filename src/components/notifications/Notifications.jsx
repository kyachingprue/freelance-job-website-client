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
    <section className="bg-sky-50">
      <div className="max-w-5xl min-h-screen mx-auto py-24 px-4">
        <h2 className="text-2xl font-bold mb-6">All Notifications</h2>

        <div className="space-y-4">
          {notifications.map((noti) => (
            <motion.div
              key={noti._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl shadow-sm ${noti.status === "unread"
                ? "bg-blue-50 border-l-4 border-blue-500"
                : "bg-white"
                }`}
            >
              <p>{noti.message}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(noti.createdAt).toLocaleString()}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
   </section>
  );
};

export default Notifications;
