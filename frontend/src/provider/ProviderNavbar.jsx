import React from "react";
import { Link } from "react-router-dom";

const ProviderNavbar = () => {
  const handleLogout = () => {
    console.log("logout");
  };
  return (
    <>
      <div className="w-64 bg-gray-100 p-5">
        <div className="flex items-center flex-col mb-10">
          <h2 className="text-lg font-semibold mt-4">Welcom, Sir</h2>
        </div>
        <nav className="flex flex-col space-y-4">
          <Link to="/admin/our-services">
            <button className="w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded">
              Our Services
            </button>
          </Link>
          <Link to="/admin/create-service">
            <button className="w-full bg-orange-500 hover:bg-orange-700 text-white py-2 rounded">
              Create Services
            </button>
          </Link>

          <Link to="/">
            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded">
              Home
            </button>
          </Link>
          <Link to="/admin/login">
            <button
              onClick={handleLogout}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
            >
              Logout
            </button>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default ProviderNavbar;
