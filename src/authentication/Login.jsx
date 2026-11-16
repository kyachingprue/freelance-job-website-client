import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import GoogleLogin from "./GoogleLogin";
import useAxiosPublic from "../hooks/useAxiosPublic";
import RouteMetadata from "../components/RouteMetadata";

const Login = () => {
  const { loginUser, resetPassword } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  // Demo login credentials
  const demoAccounts = {
    freelancer: {
      email: "kyachingpruemarma.info@gmail.com",
      password: "112233",
    },
    client: {
      email: "aongkyachingmarma.info@gmail.com",
      password: "123456",
    },
    admin: {
      email: "kyachingpruemarma.studio@gmail.com",
      password: "123456",
    },
  };

  // Automatically fill email and password
  const handleRoleSelect = (role) => {
    const account = demoAccounts[role];

    setSelectedRole(role);
    setEmail(account.email);
    setPassword(account.password);
    setShowPassword(false);
  };

  // Login functionality
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await loginUser(email, password);

      // Update verification status in database
      await axiosPublic.patch(`/users/verify/${email}`);

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      if (error.code === "auth/invalid-credential") {
        toast.error("Invalid email or password");
      } else {
        toast.error("Login failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Password reset
  const handleResetPassword = async () => {
    if (!email) {
      toast.error("Please enter your email to reset password");
      return;
    }

    try {
      await resetPassword(email);
      toast.success("Password reset email sent!");
    } catch (error) {
      toast.error(error.message || "Failed to send reset email");
    }
  };

  return (
    <>
      <RouteMetadata />

      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-800 via-indigo-950 to-black px-4 py-10">

        {/* Login Card */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 max-w-md w-full shadow-2xl">

          {/* Heading */}
          <div className="text-center mb-7">
            <h2 className="text-3xl font-extrabold bg-linear-to-r from-indigo-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Welcome Back!
            </h2>

            <p className="text-gray-500 mt-2 text-sm">
              Login to your account and continue
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-7">

            <p className="text-gray-800 font-semibold text-sm mb-3 text-center">
              Select Your Account Type
            </p>

            <div className="grid grid-cols-3 gap-2">

              {/* Freelancer */}
              <button
                type="button"
                onClick={() => handleRoleSelect("freelancer")}
                className={`py-3 px-2 rounded-xl text-sm font-semibold transition-all duration-300 border
                  ${
                    selectedRole === "freelancer"
                      ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-indigo-50 hover:border-indigo-400"
                  }`}
              >
                💻 Freelancer
              </button>

              {/* Client */}
              <button
                type="button"
                onClick={() => handleRoleSelect("client")}
                className={`py-3 px-2 rounded-xl text-sm font-semibold transition-all duration-300 border
                  ${
                    selectedRole === "client"
                      ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-indigo-50 hover:border-indigo-400"
                  }`}
              >
                👤 Client
              </button>

              {/* Admin */}
              <button
                type="button"
                onClick={() => handleRoleSelect("admin")}
                className={`py-3 px-2 rounded-xl text-sm font-semibold transition-all duration-300 border
                  ${
                    selectedRole === "admin"
                      ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-indigo-50 hover:border-indigo-400"
                  }`}
              >
                🛡️ Admin
              </button>

            </div>

            {selectedRole && (
              <p className="text-center text-xs text-green-600 mt-3 font-medium">
                ✓ {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} account selected
              </p>
            )}
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-gray-800 font-semibold mb-2 text-sm">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSelectedRole("");
                }}
                required
                className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Password */}
            <div className="relative flex flex-col">
              <label className="text-gray-800 font-semibold mb-2 text-sm">
                Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setSelectedRole("");
                }}
                required
                className="w-full px-4 py-3 pr-12 rounded-xl bg-white text-gray-900 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-10 text-gray-500 hover:text-indigo-600 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={handleResetPassword}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 font-bold rounded-xl shadow-lg transition-all duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white hover:shadow-xl hover:scale-[1.02]"
              }`}
            >
              {loading ? "Logging in..." : "Login to Account"}
            </button>

            {/* Google Login */}
            <div className="pt-2">
              <GoogleLogin />
            </div>

            {/* Register */}
            <p className="text-gray-600 text-center text-sm pt-3">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 font-semibold hover:text-indigo-800 hover:underline"
              >
                Register Now
              </Link>
            </p>

          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
