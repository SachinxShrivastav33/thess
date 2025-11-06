import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RiHome2Fill } from "react-icons/ri";
import { FaDiscourse, FaDownload, FaHeart } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { HiChevronDown, HiMenu, HiX } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  // Check token
  useEffect(() => {
    if (token) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, [token]);

  // Logout code
  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4001/api/v1/user/logout`,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.errors || "Error in logging out");
    }
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-gray-100 p-5 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 z-50`}
      >
        <nav>
          <ul className="mt-16 md:mt-0">
            {/* Home */}
            <li className="mb-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "hover:bg-gray-200 hover:text-blue-600"
                  }`
                }
              >
                <RiHome2Fill className="mr-2" /> Home
              </NavLink>
            </li>

            {/* Services */}
            <li className="mb-2">
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "hover:bg-gray-200 hover:text-blue-600"
                  }`
                }
              >
                <FaDiscourse className="mr-2" /> Services
              </NavLink>
            </li>

            {/* Book Services */}
            <li className="mb-2">
              <NavLink
                to="/my-order"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "hover:bg-gray-200 hover:text-blue-600"
                  }`
                }
              >
                <FaDownload className="mr-2" /> Book Services
              </NavLink>
            </li>

            {/* Wish-List */}
            <li className="mb-2">
              <NavLink
                to="/wish-list"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "hover:bg-gray-200 hover:text-blue-600"
                  }`
                }
              >
                <FaHeart className="mr-2" />
                Wish-List
              </NavLink>
            </li>

            {/* Settings Dropdown */}
            <li className="mb-2">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-gray-200 hover:text-blue-600 transition-colors">
                  <span className="flex items-center">
                    <IoMdSettings className="mr-2" /> Settings
                  </span>
                  <HiChevronDown className="transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <ul className="ml-6 mt-2 space-y-1">
                  <li className="mb-2">
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        `flex items-center p-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-blue-100 text-blue-600"
                            : "hover:bg-gray-200 hover:text-blue-600"
                        }`
                      }
                    >
                      <CgProfile className="mr-2" /> Profile
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>

            {/* Logout / Login */}
            <li>
              {isLoggedIn ? (
                <NavLink
                  to="/"
                  className="flex items-center p-2 rounded-lg hover:bg-gray-200 hover:text-blue-600 transition-colors"
                  onClick={handleLogout}
                >
                  <IoLogOut className="mr-2" /> Logout
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "hover:bg-gray-200 hover:text-blue-600"
                    }`
                  }
                >
                  <IoLogIn className="mr-2" /> Login
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Sidebar Toggle Button (Mobile) */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-blue-600 text-white p-2 rounded-lg"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <HiX className="text-2xl" />
        ) : (
          <HiMenu className="text-2xl" />
        )}
      </button>
    </>
  );
};

export default Navbar;
