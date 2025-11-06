import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });

  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = userData?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    setIsLoggedIn(true);
  }, [token, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4001/api/v1/user/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setUser(res.data.user);
        setFormData({
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          password: "",
        });
      } catch (err) {
        toast.error("Failed to fetch profile");
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        "http://localhost:4001/api/v1/user/profile",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setUser(res.data.user);
      setEditMode(false);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:4001/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success(res.data.message);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      toast.error("Error in logging out");
    }
  };

  const userInitial = user.firstName
    ? user.firstName.charAt(0).toUpperCase()
    : "";

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 py-10 flex justify-center items-center px-4 sm:px-8">
        <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden transition-all duration-300">
          {/* LEFT SIDEBAR */}
          <div className="bg-gradient-to-b from-indigo-600 to-blue-700 text-white md:w-1/3 w-full flex flex-col items-center py-10 px-6">
            <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold shadow-md mb-4">
              {userInitial}
            </div>
            <h2 className="text-2xl font-semibold mb-1 text-center">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-gray-200 mb-8 text-center break-all">
              {user.email}
            </p>
            <div className="mt-auto w-full">
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* RIGHT SIDE - MAIN CONTENT */}
          <div className="md:w-2/3 w-full p-8">
            <h2 className="text-3xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-3 mb-6">
              Personal Details
            </h2>

            {!editMode ? (
              <div className="space-y-5 text-gray-700">
                <div>
                  <span className="font-medium text-gray-600">First Name:</span>{" "}
                  {user.firstName}
                </div>
                <div>
                  <span className="font-medium text-gray-600">Last Name:</span>{" "}
                  {user.lastName}
                </div>
                <div>
                  <span className="font-medium text-gray-600">Email:</span>{" "}
                  {user.email}
                </div>
                <div>
                  <span className="font-medium text-gray-600">Joined On:</span>{" "}
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "—"}
                </div>

                <button
                  onClick={() => setEditMode(true)}
                  className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Profile
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="New Password (optional)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <button
                    onClick={handleUpdate}
                    className="w-full px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="w-full px-6 py-3 bg-gray-400 text-white font-medium rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
