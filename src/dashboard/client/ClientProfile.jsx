import { useState } from "react";
import { Camera } from "lucide-react";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner";
import { User, Wrench, Github, Linkedin, FileText } from "lucide-react";


const ClientProfile = () => {
  const { user: firebaseUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  // ✅ Fetch MongoDB user
  const { data: dbUser, isLoading, refetch } = useQuery({
    queryKey: ["dbUser", firebaseUser?.email],
    enabled: !!firebaseUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/email/${encodeURIComponent(firebaseUser.email)}`
      );
      return res.data;
    },
  });

  // ✅ Cloudinary Image Upload (Profile & Cover)
  const handleImageUpload = async (file, type) => {
    if (!file || !dbUser?._id) return;

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const imageData = new FormData();
    imageData.append("file", file);
    imageData.append("upload_preset", uploadPreset);

    try {
      setLoading(true);

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: imageData }
      );

      if (!cloudRes.ok) throw new Error("Cloudinary upload failed");

      const cloudData = await cloudRes.json();

      await axiosSecure.patch(`/users/${dbUser._id}`, {
        [type]: cloudData.secure_url,
      });

      toast.success("Image updated successfully ✅");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-sky-100 h-164 overflow-y-scroll rounded-2xl">

      {/* ✅ COVER IMAGE */}
      <div className="relative h-72 w-full">
        <img
          src={dbUser?.coverImage}
          alt="cover"
          className="w-full h-full object-cover"
        />

        <label className="absolute top-4 right-4 bg-white p-2 rounded-full shadow cursor-pointer hover:scale-110 transition">
          <Camera size={18} />
          <input
            type="file"
            hidden
            onChange={(e) =>
              handleImageUpload(e.target.files[0], "coverImage")
            }
          />
        </label>

        {/* ✅ PROFILE IMAGE */}
        <div className="absolute -bottom-16 left-10">
          <div className="relative">
            <img
              src={dbUser?.photoURL}
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />

            <label className="absolute bottom-1 right-1 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:scale-110 transition">
              <Camera size={16} />
              <input
                type="file"
                hidden
                onChange={(e) =>
                  handleImageUpload(e.target.files[0], "photoURL")
                }
              />
            </label>
          </div>
        </div>
      </div>

      {/* ✅ USER INFO */}
      <div className="mt-20 px-10 pb-10">

        <h2 className="text-2xl font-bold text-gray-800">
          {dbUser?.name}
        </h2>

        <p className="text-gray-600">{dbUser?.email}</p>

        <p className="mt-2 inline-block bg-indigo-900/15 text-indigo-600 px-3 py-1 rounded-full text-sm capitalize">
          {dbUser?.role}
        </p>

        {/* Professional Info */}
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-lg space-y-5">

          {/* Title */}
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-indigo-50 transition">
            <User className="text-indigo-600 w-6 h-6 mt-1" />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Title</h3>
              <p className="text-gray-600">{dbUser?.title || "No title available"}</p>
            </div>
          </div>

          {/* Skills */}
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-indigo-50 transition">
            <Wrench className="text-green-600 w-6 h-6 mt-1" />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Skills</h3>
              <p className="text-gray-600">{dbUser?.skills?.join(", ") || "No skills added"}</p>
            </div>
          </div>

          {/* GitHub */}
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-indigo-50 transition">
            <Github className="text-gray-800 w-6 h-6 mt-1" />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">GitHub</h3>
              <p className="text-gray-600">{dbUser?.github || "No GitHub link"}</p>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-indigo-50 transition">
            <Linkedin className="text-blue-600 w-6 h-6 mt-1" />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">LinkedIn</h3>
              <p className="text-gray-600">{dbUser?.linkedin || "No LinkedIn link"}</p>
            </div>
          </div>

          {/* Description */}
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-indigo-50 transition">
            <FileText className="text-yellow-600 w-6 h-6 mt-1" />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Description</h3>
              <p className="text-gray-600">{dbUser?.description || "No description added"}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
