import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const GoogleLogin = () => {
  const { googleLogin } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // 🔥 Save User Mutation
  const { mutateAsync: saveUser } = useMutation({
    mutationFn: async (userInfo) => {
      const res = await axiosPublic.post("/users", userInfo);
      return res.data;
    },
  });

  const coverImage = "https://i.ibb.co.com/dwRWGtGh/White-Minimalist-Profile-Linked-In-Banner.png";

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const user = result?.user;

      const userInfo = {
        name: user.displayName || "",
        email: user.email,
        photoURL: user.photoURL || "",
        coverImage: coverImage,
        role: "freelancer", 
        title: "",
        skills: [],
        github: "",
        linkedin: "",
        resume: "",
        description: "",
        isVerified: user.emailVerified || false,
        createdAt: new Date(),
      };

      await saveUser(userInfo);

      toast.success("Google Login Successful 🚀");
      navigate("/");

    } catch (error) {
      toast.error(error.message || "Google Login Failed");
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center mt-4 justify-center gap-3 border border-gray-300 py-2 rounded-lg bg-gray-100 hover:bg-gray-300 transition duration-300"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="google"
        className="w-5 h-5"
      />
      Continue with Google
    </button>
  );
};

export default GoogleLogin;
