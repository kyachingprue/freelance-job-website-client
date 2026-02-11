import { motion, AnimatePresence } from "motion/react";
import { Bell, X } from "lucide-react";
import { Link } from "react-router-dom";

const Notifications = ({ isOpen, setIsOpen, notifications = [] }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-3 w-80 bg-white shadow-2xl rounded-2xl border border-gray-100 z-50 hidden md:block"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              <Bell size={18} />
              Notifications
            </h3>
            <button onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-center text-gray-500 py-6">
                No notifications yet
              </p>
            ) : (
              notifications.map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-3 cursor-pointer border-b last:border-none"
                >
                  <p className="text-sm text-gray-700">{item.message}</p>
                  <span className="text-xs text-gray-400">
                    {item.time}
                  </span>
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notifications;
