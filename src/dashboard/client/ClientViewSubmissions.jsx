import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "motion/react";
import {
  Globe,
  User,
  CheckCircle,
  Loader,
  Github,
  ArrowLeft,
  DollarSign,
  Star,
} from "lucide-react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

const ClientViewSubmissions = () => {
  const axiosSecure = useAxiosSecure();
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [ratings, setRatings] = useState({});

  const { data: submissions = [], isLoading, refetch } = useQuery({
    queryKey: ["clientSubmissions", jobId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/client-submissions/by-job/${jobId}`
      );
      return res.data;
    },
  });

  const handleMarkAsCompleted = async (submissionId) => {
    try {
      // ✅ 1. PATCH request to mark work as completed
      const res = await axiosSecure.patch(`/work-submissions/complete/${submissionId}`);

      if (res.data.success) {
        const submission = res.data.updatedSubmission;

        // ✅ 2. Create notification for freelancer
        await axiosSecure.post("/notifications", {
          receiverEmail: submission.freelancerEmail, // freelancer email from submission
          message: `Your work for "${submission.jobTitle}" has been marked as completed by the client.`,
          status: "unread",
          createdAt: new Date(),
        });

        // ✅ 3. Show success toast
        toast.success("Work marked as completed and freelancer notified!");

        // ✅ 4. Refresh submissions to update UI
        refetch();
      } else {
        toast.error("❌ Failed to mark work as completed");
      }
    } catch (error) {
      console.error("Mark as Completed Error:", error);
      toast.error("❌ Failed to mark work as completed");
    }
  };

  const handleRatingSubmit = async (submission) => {
    try {
      if (!submission.clientRating || submission.clientRating < 1) {
        return toast.error("Please select a rating!");
      }

      const res = await axiosSecure.patch("/freelancer-hires/add-rating", {
        hireId: submission.hireId, // must exist in submission
        rating: submission.clientRating,
      });

      if (res.data.success) {
        toast.success("Rating submitted successfully!");
        navigate("/dashboard/client-hire-freelancer");
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit rating");
    }
  };

  const handlePayment = async (submission) => {
    try {
      const res = await axiosSecure.patch("/freelancer-hires/make-payment", {
        hireId: submission.hireId,
      });

      if (res.data.success) {
        toast.success("Payment Successful!");
        refetch();
      }
    } catch (error) {
      toast.error("Payment failed", error?.message);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-3 h-full lg:h-160 overflow-y-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-700 hover:text-indigo-600 transition font-semibold"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      {/* If No Data */}
      {submissions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            No Submissions Found
          </h2>
          <p className="text-gray-500">
            There are no submissions for this job yet.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {submissions.map((sub) => (
            <motion.div
              key={sub._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200"
            >
              {/* Freelancer Info */}
              <p className="flex items-center gap-2 text-gray-700 mb-2">
                <User size={16} /> {sub.freelancerEmail}
              </p>

              {/* Status */}
              <div className="mb-2">
                {sub.status === "submitted" && (
                  <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full w-fit font-semibold">
                    <Loader className="animate-spin" size={16} />
                    Submitted
                  </div>
                )}
                {sub.status === "in_progress" && (
                  <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full w-fit font-semibold">
                    🚀 In Progress
                  </div>
                )}
                {sub.status === "completed" && (
                  <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full w-fit font-semibold">
                    <CheckCircle size={16} />
                    Completed
                  </div>
                )}
              </div>

              {/* Links */}
              <div className="flex flex-wrap justify-between items-center mt-3">
                <a
                  href={sub.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 bg-indigo-500 text-white px-2 py-2 rounded-lg font-semibold hover:bg-indigo-600 transition"
                >
                  <Globe size={16} /> Live Project
                </a>

                <a
                  href={sub.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 bg-gray-800 text-white px-2 py-2 rounded-lg font-semibold hover:bg-gray-900 transition"
                >
                  <Github size={16} /> GitHub Repo
                </a>
                <button
                  onClick={() => handleMarkAsCompleted(sub._id)}
                  disabled={sub.status === "completed"} // disable if already completed
                  className={`mt-3 px-2 mb-2.5 py-2 rounded-lg font-semibold transition 
                  ${sub.status === "completed"
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-green-800 text-white hover:bg-green-900"
                    }`}
                >
                  Mark as Completed
                </button>
              </div>

              {/* Message */}
              <p className="mt-3 text-gray-700 font-medium">
                Message / Note:
              </p>
              <p className="text-gray-600 text-sm">{sub.message}</p>

              {/* Submitted At */}
              <p className="mt-2 text-gray-500 text-xs">
                Submitted At:{" "}
                {new Date(sub.submittedAt).toLocaleString()}
              </p>
              {/* Rating & Payment Section */}
              {sub.status === "completed" ? (
                <div className="mt-4 space-y-3">

                  {/* ⭐ Rating System */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      Give Rating:
                    </p>

                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={20}
                          onClick={() =>
                            setRatings({
                              ...ratings,
                              [sub._id]: star,
                            })
                          }
                          className={`cursor-pointer transition ${star <= (ratings[sub._id] || 0)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                            }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() =>
                        handleRatingSubmit({
                          ...sub,
                          clientRating: ratings[sub._id],
                        })
                      }
                      disabled={!ratings[sub._id]}
                      className="mt-2 bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition disabled:bg-gray-400"
                    >
                      Submit Rating
                    </button>
                  </div>

                  {/* 💰 Payment Button */}
                  <button
                    onClick={() => handlePayment(sub)}
                    className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
                  >
                    <DollarSign size={18} />
                    Pay Freelancer
                  </button>
                </div>
              ) : (
                <div className="mt-4 opacity-50">
                  <p className="text-sm text-gray-400 italic">
                    Rating & Payment available after completion
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientViewSubmissions;