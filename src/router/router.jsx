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
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout/>
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