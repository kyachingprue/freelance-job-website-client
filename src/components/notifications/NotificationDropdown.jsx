import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "motion/react";


const NotificationDropdown = ({ close }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/notifications/${user.email}`
      );
      return res.data;
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 mt-3 w-96 bg-white shadow-2xl rounded-xl p-4 z-50"
    >
      <h3 className="font-semibold text-lg mb-3">Notifications</h3>

      <div className="max-h-80 overflow-y-auto space-y-3">
        {notifications.slice(0, 5).map((noti) => (
          <div
            key={noti._id}
            className={`p-3 rounded-lg text-sm ${noti.status === "unread"
                ? "bg-blue-100 font-medium"
                : "bg-gray-100"
              }`}
          >
            {noti.message}
            <p className="text-xs text-gray-500 mt-1">
              {new Date(noti.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <Link
        to="/notifications"
        onClick={close}
        className="block text-center mt-4 text-blue-600 font-medium hover:underline"
      >
        View All Notifications
      </Link>
    </motion.div>
  );
};

export default NotificationDropdown;
