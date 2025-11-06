import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* 404 Page */}
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <h2 className="text-2xl font-semibold mt-2">Page Not Found</h2>
        <p className="mt-2 text-gray-600">
          Oops! The page you are looking for does not exist.
        </p>

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Go Back Home
        </button>
      </div>
    </>
  );
};

export default NotFound;
