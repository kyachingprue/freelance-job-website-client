import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://freelancer-job-website.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
