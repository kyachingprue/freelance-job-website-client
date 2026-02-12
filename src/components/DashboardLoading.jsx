import { motion } from "motion/react";

const DashboardLoading = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50 p-6">

      {/* Top Header Skeleton */}
      <div className="flex justify-between items-center mb-8">
        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {[1, 2, 3, 4].map((item) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: item * 0.1 }}
            className="bg-white rounded-2xl shadow-md p-6 space-y-4"
          >
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-32 bg-gray-300 rounded animate-pulse"></div>
          </motion.div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="h-6 w-40 bg-gray-200 rounded mb-6 animate-pulse"></div>

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((row) => (
            <div
              key={row}
              className="grid grid-cols-4 gap-4"
            >
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Animation */}
      <div className="flex justify-center mt-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
      </div>
    </div>
  );
};

export default DashboardLoading;
