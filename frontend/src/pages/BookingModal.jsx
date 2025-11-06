import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BookingModal = ({ show, onClose, service }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    address: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);

  if (!show || !service) return null;

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        `http://localhost:4001/api/v1/services/bookServices/${service._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      toast.success("Service booked successfully ✅");
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.errors || "Booking failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative animate-fadeIn scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Book: {service.title}
        </h2>
        <p className="text-gray-600 mb-6">{service.category}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">First Name</label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Last Name</label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label className="text-sm text-gray-600">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              required
              value={formData.mobile}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
              placeholder="Enter 10 digit number"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-sm text-gray-600">Address</label>
            <textarea
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 h-20"
            ></textarea>
          </div>

          {/* Date */}
          <div>
            <label className="text-sm text-gray-600">
              Preferred Service Date
            </label>
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 border text-gray-700 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
