import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Star,
  Bell,
  DollarSign,
  User,
  PlusCircle,
  Users,
  CreditCard,
  Folder,
  BarChart3,
  Settings,
  Menu,
  UserRoundCog,
  PanelLeft,
} from "lucide-react";
import useRole from "../hooks/useRole";
import DashboardLoading from "../components/DashboardLoading";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { role, isLoading } = useRole();

  // ROLE BASED MENUS 
  const menus = {
    freelancer: [
      { name: "Dashboard", path: "/dashboard/freelancer-dashboard", icon: LayoutDashboard },
      { name: "My Proposals", path: "/dashboard/freelancer-proposals", icon: FileText },
      { name: "Active Jobs", path: "/dashboard/freelancer-active-jobs", icon: Briefcase },
      { name: "Reviews", path: "/dashboard/freelancer-reviews", icon: Star },
      { name: "Notifications", path: "/dashboard/freelancer-notifications", icon: Bell },
      { name: "Earnings", path: "/dashboard/freelancer-earnings", icon: DollarSign },
      { name: "Profile Setting", path: "/dashboard/freelancer-profile-setting", icon: User },
    ],
    client: [
      { name: "Dashboard", path: "/dashboard/client-dashboard", icon: LayoutDashboard },
      { name: "My Jobs", path: "/dashboard/client-my-jobs", icon: Briefcase },
      { name: "Proposals", path: "/dashboard/client-proposals", icon: FileText },
      { name: "Hire Freelancer", path: "/dashboard/client-hire-freelancer", icon: Users },
      { name: "Payments", path: "/dashboard/client-payments", icon: CreditCard },
      { name: "Notifications", path: "/dashboard/client-notifications", icon: PlusCircle },
      { name: "Profile", path: "/dashboard/client-profile", icon: User },
    ],
    admin: [
      { name: "Dashboard", path: "/dashboard/admin-dashboard", icon: LayoutDashboard },
      { name: "Users", path: "/dashboard/admin-users", icon: Users },
      { name: "Jobs", path: "/dashboard/admin-jobs", icon: Briefcase },
      { name: "Proposals", path: "/dashboard/admin-proposals", icon: FileText },
      { name: "Payments", path: "/dashboard/admin-payments", icon: CreditCard },
      { name: "Reports", path: "/dashboard/admin-reports", icon: BarChart3 },
      { name: "Profile", path: "/dashboard/admin-profile", icon: UserRoundCog },
      { name: "Role Requests", path: "/dashboard/admin-role-requests", icon: Settings },
      { name: "Setting", path: "/dashboard/admin-settings", icon: Settings },
    ],
  };

  // GRADIENT BY ROLE 
  const roleGradient = {
    freelancer: "from-indigo-950 via-purple-600 to-blue-600",
    client: "from-emerald-600 via-teal-600 to-cyan-600",
    admin: "from-green-900 via-indigo-800 to-purple-800",
  };

  if (isLoading) {
    return <DashboardLoading />;
  }

  return (
    <div>
      <div className="flex min-h-screen transition-all">

        {/* Overlay (Mobile only) */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <div
          className={`fixed top-0 left-0 h-full z-40
  md:relative md:translate-x-0
  transition-all duration-300
  
  ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
  
  ${collapsed ? "md:w-20" : "md:w-64"} w-64
  
  bg-linear-to-b ${roleGradient[role]} 
  text-white shadow-xl`}
        >
          {/* Top Section */}
          <div className="flex items-center justify-between p-4">

            {role && !collapsed && (
              <Link to="/">
                <h1 className="text-xl font-bold tracking-wide">{role.toUpperCase()}</h1>
              </Link>
            )}

            {/* Desktop Collapse Button (UNCHANGED) */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:block"
            >
              <PanelLeft />
            </button>

            {/* Mobile Close Button (NEW) */}
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden text-white text-xl"
            >
              ✕
            </button>
          </div>

          {/* Menu */}
          <nav className="mt-5 min-h-screen  px-3">
            {role && menus[role]?.map((item, index) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={index}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-4 p-3 my-2 rounded-xl transition-all
        ${isActive ? "bg-white text-black shadow-lg" : "hover:bg-white/20"}`
                  }
                >
                  <Icon size={20} />
                  {!collapsed && <span>{item.name}</span>}
                </NavLink>
              );
            })}

          </nav>
        </div>


        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col">

          {/* Topbar */}
          <div className="block md:hidden bg-white p-4">

            {/* Mobile Toggle */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Menu size={25}/>
            </button>
          </div>

          {/* Page Content */}
          <div className="p-6 flex-1 bg-gray-200 text-gray-800 dark:text-gray-200">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
