import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Briefcase, Calendar, User, DollarSign, ArrowLeft } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const FreelancerViewWorks = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: works = [], isLoading } = useQuery({
    queryKey: ["freelancerWork", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/add-work/${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner/>;

  return (
    <section>
      <div className="flex items-center gap-2">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition">
          <ArrowLeft size={20} className="cursor-pointer" />
          <p className="hover:underline">Back to Active Jobs</p>
        </button>
      </div>
      <div className="p-4 h-full lg:h-160 overflow-y-auto gap-6 grid grid-cols-1">
        {works.map((work) => (
          <motion.div
            key={work._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            className="bg-linear-to-br from-indigo-950 to-purple-800 text-white p-6 rounded-2xl shadow-xl"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                {/* Company Logo */}
                <img
                  src={work.hireInfo?.companyLogo}
                  alt="logo"
                  className="w-16 h-16 rounded-full mb-4 border-2 border-white"
                />

                {/* Job Title */}
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Briefcase size={18} />
                  {work.hireInfo?.jobTitle}
                </h2>

                <p className="flex items-center gap-2 mt-2">
                  <User size={16} />
                  {work.hireInfo?.clientName}
                </p>

                <p className="flex items-center gap-2">
                  <DollarSign size={16} />
                  {work.hireInfo?.bidAmount} {work.hireInfo?.currency}
                </p>

                <p className="flex items-center gap-2">
                  <Calendar size={16} />
                  Deadline: {work.deadline}
                </p>
              </div>
              <div>
                {work.status === "in_progress" && (
                  <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full w-fit font-semibold animate-pulse">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    Project In Progress 🚀
                  </div>
                )}

                {work.status === "submitted" && (
                  <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full w-fit font-semibold">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    Work Submitted ⏳ Waiting for Review
                  </div>
                )}

                {work.status === "completed" && (
                  <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full w-fit font-semibold">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    Project Completed ✅
                  </div>
                )}
              </div>
            </div>

            {/* Work Details */}
            <div className="mt-4 bg-white text-black p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Work Details</h3>
              <p className="text-sm">{work.workDetails}</p>
            </div>

            <div className="mt-3 bg-white text-black p-4 rounded-lg">
              <h3 className="font-semibold mb-2">API Info</h3>
              <p className="text-sm">{work.apiInfo}</p>
            </div>

            <div className="mt-3 bg-white text-black p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Extra Instructions</h3>
              <p className="text-sm">{work.extraInstructions}</p>
            </div>

            <div className="mt-4 flex gap-3">
              <a
                href={work.figmaLink}
                target="_blank"
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                Figma
              </a>

              <a
                href={work.githubRepo}
                target="_blank"
                className="bg-green-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-green-300 transition"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        ))}
      </div>
   </section>
  );
};

export default FreelancerViewWorks;