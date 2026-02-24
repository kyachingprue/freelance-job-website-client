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
import ClientProfile from "../dashboard/client/ClientProfile";
import AdminDashboard from "../dashboard/admin/AdminDashboard";
import AdminUsers from "../dashboard/admin/AdminUsers";
import AdminJobs from "../dashboard/admin/AdminJobs";
import AdminProposals from "../dashboard/admin/AdminProposals";
import AdminPayments from "../dashboard/admin/AdminPayments";
import AdminReports from "../dashboard/admin/AdminReports";
import AdminSettings from "../dashboard/admin/AdminSettings";
import ClientMyJobs from "../dashboard/client/ClientMyJobs";
import ClientNotifications from "../dashboard/client/ClientNotifications";
import Notifications from "../components/notifications/Notifications";
import ClientHireDetails from "../dashboard/client/ClientHireDetails";
import AdminProfile from "../dashboard/admin/AdminProfile";
import ClientAddWork from "../dashboard/client/ClientAddWork";
import AdminEditJobs from "../dashboard/admin/AdminEditJobs";
import AdminRoleRequests from "../dashboard/admin/AdminRoleRequests";
import FreelancerViewWorks from "../dashboard/freelancer/FreelancerViewWorks";
import ClientViewSubmissions from "../dashboard/client/ClientViewSubmissions";
import PrivateRoute from "./PrivateRoute";
import FreelancerRoute from "./FreelancerRoute";
import ClientRoute from "./ClientRoute";
import AdminRoute from "./AdminRoute";
import ClientPaymentHistory from "../dashboard/client/ClientPaymentHistory";
import ClientPayment from "../dashboard/client/ClientPayment";

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
        element:<BrowseJobs />
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
        element: <PrivateRoute><Notifications /></PrivateRoute>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      // Freelancer Dashboard
      {
        path: 'freelancer-dashboard',
        element: <FreelancerRoute><FreelancerDashboard /></FreelancerRoute>
      },
      {
        path: 'freelancer-proposals',
        element: <FreelancerRoute><MyProposals /></FreelancerRoute>
      },
      {
        path: 'freelancer-active-jobs',
        element: <FreelancerRoute><ActiveJobs /></FreelancerRoute>
      },
      {
        path: 'freelancer-view-work',
        element: <FreelancerRoute><FreelancerViewWorks /></FreelancerRoute>
      },
      {
        path: 'freelancer-reviews',
        element: <FreelancerRoute><FreelancerReviews /></FreelancerRoute>
      },
      {
        path: "freelancer-notifications",
        element: <FreelancerRoute><FreelancerNotifications /></FreelancerRoute>
      },
      {
        path: 'freelancer-earnings',
        element: <FreelancerRoute><FreelancerEarnings /></FreelancerRoute>
      },
      {
        path: 'freelancer-profile-setting',
        element: <FreelancerRoute><FreelancerProfileSetting /></FreelancerRoute>
      },
      // Client Dashboard
      {
        path: 'client-dashboard',
        element: <ClientRoute><ClientDashboard /></ClientRoute>
      },
      {
        path: 'client-my-jobs',
        element: <ClientRoute><ClientMyJobs /></ClientRoute>
      },
      {
        path: 'client-notifications',
        element: <ClientRoute><ClientNotifications /></ClientRoute>
      },
      {
        path: 'client-proposals',
        element: <ClientRoute><ClientProposals /></ClientRoute>
      },
      {
        path: 'client-hire-freelancer',
        element: <ClientRoute><ClientHireFreelancer /></ClientRoute>
      },
      {
        path: 'client-view-submissions/:jobId',
        element: <ClientRoute><ClientViewSubmissions /></ClientRoute>
      },
      {
        path: "hire-details/:id",
        element: <ClientRoute><ClientHireDetails /></ClientRoute>
      },
      {
        path: "add-work/:id",
        element: <ClientRoute><ClientAddWork /></ClientRoute>
      },
      {
        path: 'client-payment-history',
        element: <ClientRoute><ClientPaymentHistory /></ClientRoute>
      },
      {
        path: 'client-payment/:hireId',
        element: <ClientPayment/>
      },
      {
        path: 'client-profile',
        element: <ClientRoute><ClientProfile /></ClientRoute>
      },
      //Admin Dashboard
      {
        path: 'admin-dashboard',
        element: <AdminRoute><AdminDashboard /></AdminRoute>
      },
      {
        path: 'admin-users',
        element: <AdminRoute><AdminUsers /></AdminRoute>
      },
      {
        path: 'admin-jobs',
        element: <AdminRoute><AdminJobs /></AdminRoute>
      },
      {
        path: 'admin-job-edit/:id',
        element: <AdminRoute><AdminEditJobs /></AdminRoute>
      },
      {
        path: 'admin-proposals',
        element: <AdminRoute><AdminProposals /></AdminRoute>
      },
      {
        path: 'admin-payments',
        element: <AdminRoute><AdminPayments /></AdminRoute>
      },
      {
        path: 'admin-reports',
        element: <AdminRoute><AdminReports /></AdminRoute>
      },
      {
        path: 'admin-profile',
        element: <AdminRoute><AdminProfile /></AdminRoute>
      },
      {
        path: 'admin-role-requests',
        element: <AdminRoute><AdminRoleRequests /></AdminRoute>
      },
      {
        path: 'admin-settings',
        element: <AdminRoute><AdminSettings /></AdminRoute>
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