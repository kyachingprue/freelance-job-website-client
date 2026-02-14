import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import GoogleLogin from "./GoogleLogin";

const Register = () => {
  const { registerUser, profileUpdate } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();


  const { mutateAsync: saveUserToDB } = useMutation({
    mutationFn: async (userInfo) => {
      const res = await axiosPublic.post("/users", userInfo);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const profileImage = "https://i.ibb.co.com/TMQBCkRL/ai-generated-close-up-of-a-young-asian-boy-in-winter-attire-ai-generative-photo.jpg";
  const coverImage = "https://i.ibb.co.com/dwRWGtGh/White-Minimalist-Profile-Linked-In-Banner.png";

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const userCredential = await registerUser(data.email, data.password);
      const firebaseUser = userCredential?.user;
      const fullName = `${data.firstName} ${data.lastName}`;

      await profileUpdate({
        displayName: fullName,
        photoURL: profileImage
      });

      const userInfo = {
        name: fullName,
        email: data.email,
        photoURL: profileImage,
        coverImage: coverImage,
        role: "freelancer", 
        title: "",
        skills: [],
        github: "",
        linkedin: "",
        resume: "",
        description: "",
        isVerified: firebaseUser?.emailVerified || false,
        createdAt: new Date(),
      };

      await saveUserToDB(userInfo);

      toast.success("Account created successfully 🎉");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-indigo-950 to-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          Create A New Account in <br /> <span className="text-indigo-600">WorkHub</span>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-between items-center gap-4">
            {/* First Name */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-600">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter you first name"
                {...register("firstName", { required: "First name is required" })}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.firstName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-600">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                {...register("lastName", { required: "Last name is required" })}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.lastName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex justify-between items-center gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-600">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter your new password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-600">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Enter your confirm password"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: loading ? 1 : 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            type="submit"
            className={`w-full mt-8 flex items-center justify-center gap-2 rounded-lg py-2.5 text-white font-semibold transition ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-linear-to-r from-indigo-600 to-purple-600 hover:opacity-90"
              }`}
          >
            {loading ? (
              <>
                <span className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                Creating...
              </>
            ) : (
              "Create Account"
            )}
          </motion.button>
        </form>

        <GoogleLogin/>

        <p className="text-sm text-center text-gray-600 mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
