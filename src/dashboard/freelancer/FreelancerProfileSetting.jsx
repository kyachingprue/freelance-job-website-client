import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Camera, Save, UserCheck, ShieldAlert } from "lucide-react";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner";

const FreelancerProfileSetting = () => {
  const { user: firebaseUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    skills: "",
    github: "",
    linkedin: "",
    resume: null,
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [resumeURL, setResumeURL] = useState("");
  const [requestLoading, setRequestLoading] = useState(false);

  // FETCH MONGODB USER
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

  // UPDATE FORM WHEN dbUser LOADS
  useEffect(() => {
    if (dbUser) {
      setFormData({
        title: dbUser.title || "",
        skills: dbUser.skills?.join(", ") || "",
        github: dbUser.github || "",
        linkedin: dbUser.linkedin || "",
        resume: dbUser.resume || null,
        description: dbUser.description || "",
      });
      setResumeURL(dbUser.resume || "");
    }
  }, [dbUser]);

  const handleImageUpload = async (file, type) => {
    if (!file || !dbUser?._id) return;

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const imageData = new FormData();
    imageData.append("file", file);
    imageData.append("upload_preset", uploadPreset);

    try {
      // 1️⃣ Upload to Cloudinary
      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: imageData }
      );

      if (!cloudRes.ok) throw new Error(`Cloudinary upload failed: ${cloudRes.status}`);

      const cloudData = await cloudRes.json();

      // 2️⃣ Update backend using axiosSecure
      const backendRes = await axiosSecure.patch(`/users/${dbUser._id}`, {
        [type]: cloudData.secure_url
      });

      console.log("Backend response:", backendRes.data); // debug

      await refetch();

      toast.success('Profile updated successfully');
    } catch (err) {
      console.error("Image upload error:", err);
      const message = err.response?.data?.error || err.message || "Image upload failed";
      toast.error(message);
    }
  };

  /*PROFILE UPDATE*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dbUser?._id) return;

    setLoading(true);

    try {
      let resumeUrl = resumeURL; // default to current URL

      // 1️⃣ Upload resume if user selected a new file
      if (formData.resume instanceof File) {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        const data = new FormData();
        data.append("file", formData.resume);
        data.append("upload_preset", uploadPreset);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
          method: "POST",
          body: data,
        });

        if (!res.ok) throw new Error("Resume upload failed");

        const resData = await res.json();
        resumeUrl = resData.secure_url; // actual URL to save in MongoDB
        setResumeURL(resumeUrl);
      }

      // 2️⃣ Prepare the data to update
      const updatedData = {
        title: formData.title,
        skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
        github: formData.github,
        linkedin: formData.linkedin,
        description: formData.description,
        resume: resumeUrl, // save URL, not File object
      };

      // 3️⃣ Update MongoDB
      await axiosSecure.patch(`/users/${dbUser._id}`, updatedData);

      toast.success("Profile updated successfully 🚀");
      setShowForm(false);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ROLE REQUEST */
  const handleAccessRequest = async () => {
    if (!dbUser?._id) return toast.error("User ID is missing");

    if (dbUser?.roleRequestSent) return toast.error("You already sent a request!");

    setRequestLoading(true);

    try {
      // POST role request
      await axiosSecure.post("/role-request", {
        userId: dbUser._id.toString(),
        userEmail: firebaseUser?.email,
        currentRole: dbUser.role,
        requestRole: "client",
      });

      // PATCH user roleRequestSent flag
      await axiosSecure.patch(`/users/${dbUser._id.toString()}`, {
        roleRequestSent: true,
      });

      toast.success("Request sent successfully!");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message || "Request failed");
    } finally {
      setRequestLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleResumeUpload = async (file) => {
    if (!file || !dbUser?._id) return;

    setLoading(true);

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", uploadPreset);

      // Upload to Cloudinary
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Resume upload failed");

      const resData = await res.json();

      // Update backend with resume URL
      await axiosSecure.patch(`/users/${dbUser._id}`, {
        resume: resData.secure_url,
      });

      setResumeURL(resData.secure_url);
      toast.success("Resume uploaded successfully!");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Resume upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner/>
  }

  return (
    <div className="bg-sky-100 h-full md:h-163 overflow-y-auto rounded-2xl overflow-hidden">
      {/* COVER SECTION */}
      <div className="relative h-72 w-full">
        <img
          src={dbUser?.coverImage}
          alt="cover"
          className="w-full h-full object-cover border border-gray-300 shadow-2xl"
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

        {/* PROFILE IMAGE */}
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

      <div className="md:flex md:justify-between pb-4 items-start md:items-center gap-5">
        {/* USER INFO */}
        <div className="mt-20 px-10">
          <h2 className="text-2xl text-gray-800 font-bold">{dbUser?.name}</h2>
          <p className="text-gray-600 py-1.5">{dbUser?.email}</p>
          <p className="mt-1 inline-block bg-indigo-900/15 font-semibold text-indigo-600 px-3 py-1.5 rounded-full text-sm capitalize">
            {dbUser?.role}
          </p>
        </div>
        {/* ROLE REQUEST SECTION */}
        {dbUser?.role === "freelancer" && (
          <div className="mx-10 mt-10 bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <ShieldAlert size={18} /> Switch to Client Account
            </h3>

            <button
              onClick={handleAccessRequest}
              disabled={requestLoading}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
            >
              <UserCheck size={18} />
              {requestLoading ? "Sending..." : "Request Client Access"}
            </button>
          </div>
        )}
     </div>

      {/* FORM SECTION */}
      <div className="p-2 md:p-5">
        {/* 1️⃣ Always show data (or placeholder) */}
        <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl p-5 gap-6 mb-4">
          <div>
            <div className="flex flex-col md:flex-row items-start md:items-center md:gap-10">
              <div className="flex flex-col py-2">
                <h2 className="text-lg text-black font-semibold">Professional</h2>
                <p className="text-gray-500">{dbUser?.title || "No title yet"}</p>
              </div>
              <div className="flex flex-col py-2">
                <h2 className="text-lg text-black font-semibold">Skills</h2>
                <p className="text-gray-500"> {dbUser?.skills?.join(", ") || "No skills yet"}</p>
              </div>
            </div>
            <div className="flex flex-col py-2">
              <h2 className="text-lg text-black font-semibold">Github Link</h2>
              <p className="text-gray-500">{dbUser?.github || "No GitHub link yet"}</p>
            </div>
            <div className="flex flex-col py-2">
              <h2 className="text-lg text-black font-semibold">LinkedIn Link</h2>
              <p className="text-gray-500"> {dbUser?.linkedin || "No LinkedIn link yet"}</p>
            </div>
            <div className="flex flex-col py-2">
              <h2 className="text-lg text-black font-semibold">Description</h2>
              <p className="text-gray-500">{dbUser?.description || "No description yet"}</p>
            </div>
            <p>
              Resume:{" "}
              {resumeURL ? (
                <a
                  href={resumeURL + "?fl=attachment"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Resume
                </a>
              ) : (
                "No resume uploaded"
              )}
            </p>
            {resumeURL && (<a
              href={resumeURL}
              download
              className="text-blue-500 underline"
            >
              Download Resume
            </a>)}
          </div>
          {/* 2️⃣ Right side button */}
          <div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 w-32 rounded"
            >
              {dbUser ? "Edit Profile" : "Add Info"}
            </button>
          </div>
        </div>

        {/* 3️⃣ Popup Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-xl">
              <h2 className="text-xl font-bold mb-4">Update Profile</h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="border border-gray-400 px-2 py-1.5 rounded w-full"
                />
                <input
                  type="text"
                  placeholder="Skills"
                  value={formData.skills}
                  onChange={(e) =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                  className="border border-gray-400 px-2 py-1.5 rounded w-full"
                />
                <input
                  type="text"
                  placeholder="GitHub"
                  value={formData.github}
                  onChange={(e) =>
                    setFormData({ ...formData, github: e.target.value })
                  }
                  className="border border-gray-400 px-2 py-1.5 rounded w-full"
                />
                <input
                  type="text"
                  placeholder="LinkedIn"
                  value={formData.linkedin}
                  onChange={(e) =>
                    setFormData({ ...formData, linkedin: e.target.value })
                  }
                  className="border border-gray-400 px-2 py-1.5 rounded w-full"
                />
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="border border-gray-400 px-2 py-2 h-20 rounded w-full"
                />
                {/* Resume upload */}
                <div>
                  <label className="block mb-1">Upload Resume (PDF)</label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) handleResumeUpload(file); // call the function
                    }}
                    className="border border-gray-400 px-2 py-1.5 rounded w-full"
                  />
                </div>

                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-3 py-1 border border-gray-300 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading} // disable when loading
                    className={`px-3 py-1 rounded text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                      }`}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerProfileSetting;
