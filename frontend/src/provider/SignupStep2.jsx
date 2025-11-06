import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

const SignupStep2 = ({ backStep, formData, setFormData }) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4001/api/v1/provider/signup",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 201 || res.status === 200) {
        toast.success("Signup successful");
        navigate("/provider/login");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || "Signup failed. Try again!");
      } else {
        toast.error("Something went wrong! Please try later.");
      }
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Gender */}
      <div>
        <label className="block text-gray-700 mb-1">Gender</label>
        <div className="flex items-center gap-4">
          {["male", "female", "other"].map((g) => (
            <label key={g} className="flex items-center">
              <input
                type="radio"
                name="gender"
                value={g}
                checked={formData.gender === g}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                className="mr-2"
              />
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Profile Image */}
      <div>
        <label className="block text-gray-700 mb-1">Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFormData({ ...formData, profileImage: e.target.files[0] })
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-gray-700 mb-1">Category</label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option value="">Select Category</option>
          <option value="plumber">Plumber</option>
          <option value="electrician">Electrician</option>
          <option value="carpenter">Carpenter</option>
          <option value="cleaning">Home Cleaning</option>
          <option value="mechanic">Motor Mechanic</option>
        </select>
      </div>

      {/* Experience */}
      <div>
        <label className="block text-gray-700 mb-1">Experience (Years)</label>
        <input
          type="number"
          value={formData.experience}
          onChange={(e) =>
            setFormData({ ...formData, experience: e.target.value })
          }
          placeholder="Enter years of experience"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
        />
      </div>

      {/* Description */}
      <div className="md:col-span-2">
        <label className="block text-gray-700 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Write a short description about your skills and services"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          rows="4"
        ></textarea>
      </div>

      {/* Buttons */}
      <div className="md:col-span-2 flex justify-between gap-4">
        <button
          type="submit"
          className="w-1/2 bg-gray-300 text-gray-700 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
          onClick={backStep}
        >
          Back
        </button>
        <button
          type="submit"
          className="w-1/2 bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SignupStep2;
