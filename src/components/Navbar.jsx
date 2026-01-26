import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { FaBriefcase, FaSearch, FaBars, FaTimes } from "react-icons/fa";

import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openMenu, setOpenMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);


  // Scroll hide/show logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // scrolling down
      } else {
        setShowNavbar(true); // scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/30 shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="text-xl md:text-2xl lg:text-3xl font-extrabold">
              <span className="text-white">
                DevFreelance
              </span>
            </Link>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex items-center bg-white rounded-full shadow px-3 py-1 w-72">
              <FaSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="ml-2 w-full outline-none bg-transparent"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <NavLink className="nav-link" to="/">Home</NavLink>
              <NavLink className="nav-link" to="/about">About</NavLink>
              <NavLink className="nav-link" to="/jobs">All Jobs</NavLink>
              <NavLink className="nav-link" to="/experience">Experience</NavLink>

              {/* Job Dashboard Icon (only when logged in) */}
              {user && (
                <NavLink
                  to="/dashboard"
                  className="text-xl text-indigo-600 hover:scale-110 transition"
                >
                  <FaBriefcase />
                </NavLink>
              )}

              {/* Login / User Avatar */}
              {!user ? (
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-md"
                >
                  Login
                </Link>
              ) : (
                <div className="relative">
                  <img
                    src={user?.photoURL || "https://i.ibb.co/ZYW3VTp/user.png"}
                    alt="user"
                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-indigo-500"
                    onClick={() => setOpenMenu(!openMenu)}
                  />

                  {/* Dropdown */}
                  {openMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-3 w-44 bg-white shadow-xl rounded-xl p-3"
                    >
                      <Link
                        to="/profile"
                        className="block px-3 py-2 rounded hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={logOut}
                        className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-red-500"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="text-2xl text-white"
              >
                {mobileMenu ? <FaTimes /> : <FaBars />}
              </button>
            </div>
            {/* Mobile Menu */}
            {/* Mobile Card Menu */}
            <AnimatePresence>
              {mobileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="absolute top-full right-4 mt-2 w-56 bg-white/95 backdrop-blur-lg shadow-xl rounded-xl p-4 space-y-3 z-50"
                >
                  <NavLink
                    onClick={() => setMobileMenu(false)}
                    to="/"
                    className="block px-3 py-2 rounded hover:bg-indigo-100"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    onClick={() => setMobileMenu(false)}
                    to="/about"
                    className="block px-3 py-2 rounded hover:bg-indigo-100"
                  >
                    About
                  </NavLink>
                  <NavLink
                    onClick={() => setMobileMenu(false)}
                    to="/jobs"
                    className="block px-3 py-2 rounded hover:bg-indigo-100"
                  >
                    All Jobs
                  </NavLink>
                  <NavLink
                    onClick={() => setMobileMenu(false)}
                    to="/experience"
                    className="block px-3 py-2 rounded hover:bg-indigo-100"
                  >
                    Experience
                  </NavLink>

                  {user && (
                    <NavLink
                      onClick={() => setMobileMenu(false)}
                      to="/dashboard"
                      className="block px-3 py-2 rounded hover:bg-indigo-100"
                    >
                      Dashboard
                    </NavLink>
                  )}

                  {!user ? (
                    <Link
                      onClick={() => setMobileMenu(false)}
                      to="/login"
                      className="block w-full text-center px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      Login
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        logOut();
                        setMobileMenu(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded text-red-500 hover:bg-red-100"
                    >
                      Logout
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
