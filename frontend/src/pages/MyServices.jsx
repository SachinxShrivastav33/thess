import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MyServices = () => {
  const [myOrders, setMyOrders] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4001/api/v1/order/my-orders",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setMyOrders(res.data.bookings || []);
      } catch (error) {
        toast.error("Failed to load booked services.");
      }
    };
    fetchOrders();
  }, [token]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          My Booked Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {myOrders.map((order) => (
            <div key={order._id} className="bg-white rounded shadow">
              <img
                src={order.serviceId?.image?.url}
                className="h-48 w-full object-cover rounded-t"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">{order.serviceId?.title}</h3>
                <p className="text-gray-600 mt-2">₹{order.serviceId?.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default MyServices;
