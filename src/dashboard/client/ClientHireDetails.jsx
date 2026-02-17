import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";

const ClientHireDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["hireDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/hire-details/${id}`);
      return res.data;
    },
  });


  if (isLoading || !data?.hireInfo || !data?.freelancerInfo) {
    return <LoadingSpinner/>
  }

  const { hireInfo, freelancerInfo } = data;

  return (
    <div className="p-6">

      {/* Job Information */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Job Information</h2>

        <p><strong>Job Title:</strong> {hireInfo.jobTitle}</p>
        <p><strong>Hired At:</strong> {new Date(hireInfo.hiredAt).toLocaleDateString()}</p>
        <p><strong>Freelancer Email:</strong> {hireInfo.freelancerEmail}</p>
      </div>

      {/* Freelancer Full Profile */}
      <div className="bg-white shadow-md rounded-xl p-6">

        <div className="flex items-center gap-6 mb-6">
          <img
            src={freelancerInfo.photoURL}
            alt={freelancerInfo.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">{freelancerInfo.name}</h2>
            <p className="text-gray-500">{freelancerInfo.title}</p>
            <p>{freelancerInfo.email}</p>
          </div>
        </div>

        <p className="mb-4">{freelancerInfo.description}</p>

        <div className="mb-4">
          <strong>Skills:</strong>
          <div className="flex flex-wrap gap-2 mt-2">
            {freelancerInfo.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <a
            href={freelancerInfo.github}
            target="_blank"
            className="bg-gray-800 text-white px-4 py-2 rounded-lg"
          >
            GitHub
          </a>

          <a
            href={freelancerInfo.linkedin}
            target="_blank"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            LinkedIn
          </a>

          <a
            href={freelancerInfo.resume}
            target="_blank"
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Resume
          </a>
        </div>

      </div>
    </div>
  );
};

export default ClientHireDetails;
