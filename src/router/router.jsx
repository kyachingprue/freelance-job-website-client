import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import BrowseJobs from "../pages/BrowseJobs";
import HowItWorks from "../pages/HowItWorks";
import Pricing from "../pages/Pricing";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import Categories from "../pages/Categories";
import ErrorPage from "../pages/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout";
import JobsDetail from "../components/browseJobs/JobsDetail";
import FreelancerDashboard from "../dashboard/freelancer/FreelancerDashboard";
import MyProposals from "../dashboard/freelancer/MyProposals";
import ActiveJobs from "../dashboard/freelancer/ActiveJobs";
import FreelancerReviews from "../dashboard/freelancer/FreelancerReviews";
import FreelancerNotifications from "../dashboard/freelancer/FreelancerNotifications";
import FreelancerEarnings from "../dashboard/freelancer/FreelancerEarnings";
import FreelancerProfileSetting from "../dashboard/freelancer/FreelancerProfileSetting";
import ClientDashboard from "../dashboard/client/ClientDashboard";
import ClientProposals from "../dashboard/client/ClientProposals";
import ClientHireFreelancer from "../dashboard/client/ClientHireFreelancer";
import ClientPayments from "../dashboard/client/ClientPayments";
import ClientProfile from "../dashboard/client/ClientProfile";
import AdminDashboard from "../dashboard/admin/AdminDashboard";
import AdminUsers from "../dashboard/admin/AdminUsers";
import AdminJobs from "../dashboard/admin/AdminJobs";
import AdminProposals from "../dashboard/admin/AdminProposals";
import AdminPayments from "../dashboard/admin/AdminPayments";
import AdminCategories from "../dashboard/admin/AdminCategories";
import AdminReports from "../dashboard/admin/AdminReports";
import AdminSettings from "../dashboard/admin/AdminSettings";
import ClientMyJobs from "../dashboard/client/ClientMyJobs";
import ClientNotifications from "../dashboard/client/ClientNotifications";
import Notifications from "../components/notifications/Notifications";
import ClientHireDetails from "../dashboard/client/ClientHireDetails";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: 'browse-jobs',
        element: <BrowseJobs/>
      },
      {
        path: 'job-details/:id',
        element: <JobsDetail/>
      },
      {
        path: 'how-it-works',
        element:<HowItWorks/>
      },
      {
        path: 'categories',
        element: <Categories/>
      },
      {
        path: 'pricing',
        element: <Pricing/>
      },
      {
        path: 'notifications',
        element: <Notifications/>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      // Freelancer Dashboard
      {
        path: 'freelancer-dashboard',
        element:<FreelancerDashboard/>
      },
      {
        path: 'freelancer-proposals',
        element: <MyProposals/>
      },
      {
        path: 'freelancer-active-jobs',
        element: <ActiveJobs/>
      },
      {
        path: 'freelancer-reviews',
        element: <FreelancerReviews/>
      },
      {
        path: "freelancer-notifications",
        element: <FreelancerNotifications/>
      },
      {
        path: 'freelancer-earnings',
        element: <FreelancerEarnings/>
      },
      {
        path: 'freelancer-profile-setting',
        element: <FreelancerProfileSetting/>
      },
      // Client Dashboard
      {
        path: 'client-dashboard',
        element: <ClientDashboard/>
      },
      {
        path: 'client-my-jobs',
        element: <ClientMyJobs/>
      },
      {
        path: 'client-notifications',
        element: <ClientNotifications/>
      },
      {
        path: 'client-proposals',
        element: <ClientProposals/>
      },
      {
        path: 'client-hire-freelancer',
        element: <ClientHireFreelancer/>
      },
      {
        path: "/dashboard/hire-details/:id",
        element: <ClientHireDetails/>
      },
      {
        path: 'client-payments',
        element: <ClientPayments/>
      },
      {
        path: 'client-profile',
        element: <ClientProfile/>
      },
      //Admin Dashboard
      {
        path: 'admin-dashboard',
        element: <AdminDashboard/>
      },
      {
        path: 'admin-users',
        element: <AdminUsers/>
      },
      {
        path: 'admin-jobs',
        element: <AdminJobs/>
      },
      {
        path: 'admin-proposals',
        element: <AdminProposals/>
      },
      {
        path: 'admin-payments',
        element: <AdminPayments/>
      },
      {
        path: 'admin-categories',
        element: <AdminCategories/>
      },
      {
        path: 'admin-reports',
        element: <AdminReports/>
      },
      {
        path: 'admin-settings',
        element: <AdminSettings/>
      }
    ]
  },
  {
    path: '/login',
    element:<Login/>
  },
  {
    path: '/register',
    element: <Register/>
  }
])

export default router;