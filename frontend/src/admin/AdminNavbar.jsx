import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { HiMenu, HiX } from "react-icons/hi";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4001/api/v1/admin/logout",
        { withCredentials: true }
      );
      toast.success(response.data.message || "Logout successful");
      localStorage.removeItem("admin");
      setTimeout(() => {
        navigate("/admin/login");
      }, 1000);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response?.data?.errors || "Error in logging out");
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 bg-gray-100 p-5 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 z-50`}
      >
        <div className="flex items-center flex-col mb-10">
          <h2 className="text-lg font-semibold mt-4">Welcome Admin</h2>
        </div>
        <nav className="flex flex-col space-y-4">
          <Link to="/admin/dashboard">
            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded">
              Dashboard
            </button>
          </Link>
          <Link to="/admin/our-services">
            <button className="w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded">
              Our Services
            </button>
          </Link>
          <Link to="/admin/create-service">
            <button className="w-full bg-orange-500 hover:bg-blue-600 text-white py-2 rounded">
              Create Services
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* <div className="md:hidden bg-gray-100 flex justify-between items-center">
        <div>Admin Panel</div>
        <div>{isSidebarOpen ? <HiMenu /> : <HiX />}</div>
      </div> */}

      <div
        className="fixed top-4 right-4 z-50 md:hidden bg-blue-600 text-white p-2 rounded-lg"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <HiX className="text-2xl" />
        ) : (
          <HiMenu className="text-2xl" />
        )}
      </div>
    </>
  );
};

export default AdminNavbar;
