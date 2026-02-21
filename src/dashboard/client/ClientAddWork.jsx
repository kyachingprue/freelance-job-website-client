import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import {
  FileText,
  Figma,
  Link,
  Github,
  MessageSquare,
  Send,
  ArrowLeft,
  Calendar,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const ClientAddWork = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const workData = {
        hireId: id,
        ...data,
        status: "in_progress",
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/add-work", workData);

      if (res.data.insertedId) {
        toast.success("Work assigned successfully 🚀");
        navigate("/dashboard/client-hire-freelancer");
        reset();
      }
    } catch (error) {
      toast.error("Failed to assign work ❌", error?.message);
    }
  };

  return (
    <div className="h-full lg:h-160 overflow-y-auto md:p-2">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className=" md:max-w-4xl mx-auto bg-white/80 backdrop-blur-md 
                   shadow-2xl rounded-2xl p-4 md:p-8 border border-gray-200"
      >
       
        <div className="flex items-center gap-3 md:gap-8 lg:gap-36 pb-5">
          <ArrowLeft size={26} className="cursor-pointer text-gray-600 hover:text-gray-800 " onClick={() => navigate(-1)} />
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center">
            Assign Work to Freelancer
          </h2>
         </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Full Work Details */}
          <div>
            <label className="flex items-center gap-2 font-medium mb-2">
              <FileText size={18} /> Full Work Details
            </label>
            <textarea
              rows="4"
              {...register("workDetails", { required: true })}
              className="w-full p-3 rounded-md border border-gray-400 focus:ring-2 
                         focus:ring-blue-400 outline-none"
              placeholder="Explain complete project requirements..."
            />
            {errors.workDetails && (
              <p className="text-red-500 text-sm mt-1">
                This field is required
              </p>
            )}
          </div>

          {/* Figma Link */}
          <div>
            <label className="flex items-center gap-2 font-medium mb-2">
              <Figma size={18} /> Figma / Design Link
            </label>
            <input
              type="url"
              {...register("figmaLink", { required: true })}
              className="w-full p-3 rounded-md border border-gray-400 focus:ring-2 
                         focus:ring-blue-400 outline-none"
              placeholder="https://figma.com/..."
            />
            {errors.figmaLink && (
              <p className="text-red-500 text-sm mt-1">
                Design link is required
              </p>
            )}
          </div>

          {/* Deadline */}
          <div>
            <label className="flex items-center gap-2 font-medium mb-2">
              <Calendar size={18} /> DeadLine Date
            </label>
            <input
              type="date"
              {...register("deadline", { required: true })}
              className="w-full p-3 rounded-md border border-gray-400 focus:ring-2 
                         focus:ring-blue-400 outline-none"
              placeholder="Select deadline date..."
            />
            {errors.deadline && (
              <p className="text-red-500 text-sm mt-1">
                deadline is required
              </p>
            )}
          </div>

          {/* API Info */}
          <div>
            <label className="flex items-center gap-2 font-medium mb-2">
              <Link size={18} /> API / Backend Info
            </label>
            <textarea
              rows="3"
              {...register("apiInfo", { required: true })}
              className="w-full p-3 rounded-xl border border-gray-400 focus:ring-2 
                         focus:ring-blue-400 outline-none"
              placeholder="API endpoints, authentication details..."
            />
            {errors.apiInfo && (
              <p className="text-red-500 text-sm mt-1">
                Backend info is required
              </p>
            )}
          </div>

          {/* GitHub Repo */}
          <div>
            <label className="flex items-center gap-2 font-medium mb-2">
              <Github size={18} /> GitHub Repository
            </label>
            <input
              type="url"
              {...register("githubRepo", { required: true })}
              className="w-full p-3 rounded-xl border border-gray-400 focus:ring-2 
                         focus:ring-blue-400 outline-none"
              placeholder="https://github.com/..."
            />
            {errors.githubRepo && (
              <p className="text-red-500 text-sm mt-1">
                GitHub repo link is required
              </p>
            )}
          </div>

          {/* Extra Instructions */}
          <div>
            <label className="flex items-center gap-2 font-medium mb-2">
              <MessageSquare size={18} /> Extra Instructions
            </label>
            <textarea
              rows="3"
              {...register("extraInstructions", { required: true })}
              className="w-full p-3 rounded-xl border border-gray-400 focus:ring-2 
                         focus:ring-blue-400 outline-none"
              placeholder="Any additional notes..."
            />
            {errors.extraInstructions && (
              <p className="text-red-500 text-sm mt-1">
                Extra instructions required
              </p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={isSubmitting}
            type="submit"
            className="w-full flex items-center justify-center gap-2 
                       bg-blue-600 hover:bg-blue-700 text-white 
                       py-3 rounded-xl font-semibold transition"
          >
            <Send size={18} />
            {isSubmitting ? "Assigning..." : "Assign Work"}
          </motion.button>

        </form>
      </motion.div>
    </div>
  );
};

export default ClientAddWork;
