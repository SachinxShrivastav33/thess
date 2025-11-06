import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";

const GetTotalServices = () => {
  const [services, setServices] = useState([]);

  // Fetch services
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
        // setLoading(false);
      } catch (error) {
        console.log("error in fetchServices ", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <>
      <div className="flex h-screen bg-gray-100 relative">
        {/* Sidebar */}
        <AdminNavbar />

        {/* Main Content */}
        <div className="flex-1 p-6 md:ml-64">
          <h1 className="text-3xl font-semibold mb-6">Total Services</h1>
          {services.length === 0 ? (
            <p className="text-gray-600">No services found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 mb-2">{service.description}</p>
                  <p className="text-lg font-medium text-green-600 mb-2">
                    ₹{service.price}
                  </p>
                  <p className="text-sm text-gray-500">
                    Category: {service.category}
                  </p>
                  <p className="text-sm text-gray-500">
                    Created: {new Date(service.createdAt).toLocaleDateString()}
                  </p>
                  {service.v && (
                    <div className="mt-2">
                      {service.v.map((item, index) => (
                        <img
                          key={item._id}
                          src={item.image}
                          alt={item.title}
                          className="w-full h-32 object-cover rounded-md mt-2"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GetTotalServices;
