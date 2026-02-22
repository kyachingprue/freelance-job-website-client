import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/LoadingSpinner";

const FreelancerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useRole();
  const location = useLocation();

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  if (!user || role !== "freelancer") {
    return <Navigate to="/forbidden" state={{ from: location }} replace />;
  }

  return children;
};

export default FreelancerRoute;