import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import GoogleLogin from "./GoogleLogin";


const Login = () => {
  const { loginUser, resetPassword } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await loginUser(email, password); // your useAuth login function
      toast.success("Login successful!");
      navigate("/"); 
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Invalid email or password");
      } else {
        toast.error("Login failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset
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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-indigo-950 to-black px-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 max-w-md w-full shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-linear-to-r from-indigo-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          Login your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-3">
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-300 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Password */}
          <div className="relative flex flex-col">
            <label className="text-gray-300 mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-300"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Forget Password */}
          <div className="text-right">
            <button
              type="button"
              onClick={handleResetPassword}
              className="text-sm text-indigo-400 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-lg shadow-lg transition-colors ${loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600 text-white"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <GoogleLogin />

          <p className=" text-gray-300 text-center">Don't have an Account ? Please <Link to="/register" className="hover:text-blue-400 hover:underline text-blue-500">register</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
