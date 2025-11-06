import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";
import AdminNavbar from "./AdminNavbar";

function OurCourses() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = admin.token;

  if (!token) {
    toast.error("Please login to admin");
    navigate("/admin/login");
  }

  // fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/api/v1/services/services`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data.services);
        setServices(response.data.services);
        setLoading(false);
      } catch (error) {
        console.log("error in fetch Services ", error);
      }
    };
    fetchServices();
  }, []);

  // delete services code
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4001/api/v1/services/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      const updatedServices = services.filter((service) => service._id !== id);
      setServices(updatedServices);
    } catch (error) {
      console.log("Error in deleting service ", error);
      toast.error(error.response.data.errors || "Error in deleting Services");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar */}
        <div className="w-full lg:w-64 bg-white shadow-md">
          <AdminNavbar />
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-50 py-10 px-4">
          {/* Title */}
          <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
            ✨ Our Services ✨
          </h1>

          {/* Dashboard Button */}
          <div className="flex justify-center mb-10">
            <Link
              to="/admin/dashboard"
              className="bg-gradient-to-r from-orange-400 to-orange-600 py-3 px-6 rounded-xl text-white font-semibold shadow-md hover:scale-105 hover:from-orange-600 hover:to-orange-800 duration-300"
            >
              Go to Dashboard
            </Link>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={service?.image?.url}
                    alt={service.title}
                    className="h-48 w-full object-cover rounded-t-2xl"
                  />
                  {/* <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    10% OFF
                  </span> */}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 text-sm flex-1">
                    {service.description.length > 120
                      ? `${service.description.slice(0, 120)}...`
                      : service.description}
                  </p>

                  {/* Price */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-lg font-semibold text-gray-900">
                      {/* ₹{service.price}{" "}
                      <span className="line-through text-gray-500 ml-2">
                        ₹660
                      </span> */}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between gap-3 mt-6">
                    <Link
                      to={`/admin/update-service/${service._id}`}
                      className="flex-1 bg-blue-500 text-center text-white py-2 rounded-lg hover:bg-blue-600 shadow-sm transition"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 shadow-sm transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default OurCourses;
