import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCircleUser } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import BookingModal from "./BookingModal";
import PaymentPopup from "../components/PaymentPopup";

const Services = () => {
  const [services, setServices] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const navigate = useNavigate();

  // Check token
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const userToken = userData?.token;
    if (userToken) {
      setIsLoggedIn(true);
      setToken(userToken);
    }
  }, []);

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/api/v1/services/services`,
          { withCredentials: true }
        );
        setServices(response.data.services);
        setLoading(false);
      } catch (error) {
        console.log("error in fetchServices ", error);
      }
    };
    fetchServices();
  }, []);

  // Wish-list
  const handleAddToWishList = async (serviceId) => {
    try {
      await axios.post(
        "http://localhost:4001/api/v1/user/wish-list",
        { serviceId, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      toast.success("Service added to wish-list!");
    } catch (error) {
      toast.error("Failed to add to wish-list");
    }
  };

  return (
    <div className="flex">
      <Navbar />

      <main className="ml-0 md:ml-64 w-full bg-white p-10">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-xl font-bold">All Services</h1>
          <FaCircleUser className="text-4xl text-blue-600" />
        </header>

        <div className="overflow-y-auto h-[75vh]">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : services.length === 0 ? (
            <p className="text-center text-gray-500">
              No services posted yet by admin
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="border border-gray-200 rounded-lg p-4 shadow-lg"
                >
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src={service.image?.url}
                      alt={service.title}
                      className="rounded-xl mb-4 h-48 w-full object-cover transform hover:scale-105 transition duration-300"
                    />
                  </div>

                  <h2 className="font-bold text-lg mb-1">{service.title}</h2>
                  <span className="text-sm text-blue-600 font-medium mb-2 block">
                    {service.category}
                  </span>

                  <p className="text-gray-600 mb-4">
                    {service.description.length > 100
                      ? `${service.description.slice(0, 100)}...`
                      : service.description}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-xl">₹{service.price}</span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedService(service);
                        setShowPaymentPopup(true);
                      }}
                      className="bg-orange-500 flex-1 text-center text-white px-4 py-2 rounded-lg hover:bg-blue-900 duration-300"
                    >
                      Book Now
                    </button>

                    <button
                      onClick={() => handleAddToWishList(service._id)}
                      className="bg-blue-500 flex-1 text-center text-white px-4 py-2 rounded-lg hover:bg-blue-700 duration-300"
                    >
                      Wish-List
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ✅ Payment Popup */}
        {showPaymentPopup && selectedService && (
          <PaymentPopup
            onClose={() => setShowPaymentPopup(false)}
            onSelect={(method) => {
              setShowPaymentPopup(false);
              if (method === "cash") {
                setCurrentService(selectedService);
                setShowModal(true);
              } else if (method === "online") {
                navigate(`/buy/${selectedService._id}`); // ✅ Go to Stripe page
              }
            }}
          />
        )}

        {/* ✅ Booking Form Modal */}
        {currentService && (
          <BookingModal
            show={showModal}
            onClose={() => {
              setShowModal(false);
              setCurrentService(null);
            }}
            service={currentService}
          />
        )}
      </main>
    </div>
  );
};

export default Services;
