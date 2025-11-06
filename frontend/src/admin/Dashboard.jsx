import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { HiMenu, HiX } from "react-icons/hi";
// import GetTotoalUser from "./GetTotoalUser";
// import GetTotalServices from "./GetTotalServices";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Sidebar (Collapsible) */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-md w-64 transition-transform duration-300 ease-in-out z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <AdminNavbar />
      </div>

      {/* Overlay (for mobile when sidebar is open) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Toggle button for mobile */}
      <button
        className="absolute top-4 left-4 md:hidden z-50 p-2 rounded-md bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
      </button>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto md:ml-64">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
          Admin Dashboard
        </h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-2xl transition"
            onClick={() => navigate("/admin/user")}
          >
            <p className="text-4xl font-bold text-blue-600">3</p>
            <p className="text-lg text-gray-600 mt-2">Total Users</p>
          </div>

          <div
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-2xl transition"
            onClick={() => {
              navigate("/admin/services");
            }}
          >
            <p className="text-4xl font-bold text-green-600">3</p>
            <p className="text-lg text-gray-600 mt-2">Total Services</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-2xl transition">
            <p className="text-4xl font-bold text-purple-600">10</p>
            <p className="text-lg text-gray-600 mt-2">New Bookings</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
