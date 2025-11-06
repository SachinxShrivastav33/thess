import React from "react";
import toast from "react-hot-toast";

const SignupStep1 = ({ nextStep, formData, setFormData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* First Name */}
      <div>
        <label className="block text-gray-700 mb-1">First Name</label>
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          placeholder="Enter first name"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-gray-700 mb-1">Last Name</label>
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          placeholder="Enter last name"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter email"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-gray-700 mb-1">Phone</label>
        <input
          type="text"
          value={formData.phoneNo}
          onChange={(e) =>
            setFormData({ ...formData, phoneNo: e.target.value })
          }
          placeholder="Enter phone number"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-gray-700 mb-1">Password</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Enter password"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-gray-700 mb-1">Confirm Password</label>
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          placeholder="Confirm password"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* City */}
      <div>
        <label className="block text-gray-700 mb-1">City</label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          placeholder="Enter city"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Pincode */}
      <div>
        <label className="block text-gray-700 mb-1">Pincode</label>
        <input
          type="text"
          value={formData.pincode}
          onChange={(e) =>
            setFormData({ ...formData, pincode: e.target.value })
          }
          placeholder="Enter pincode"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* Address (Full Width) */}
      <div className="md:col-span-2">
        <label className="block text-gray-700 mb-1">Address</label>
        <textarea
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          placeholder="Enter full address"
          rows={3}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        ></textarea>
      </div>

      {/* Next Button */}
      <div className="md:col-span-2">
        <button
          type="button"
          className="w-full bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SignupStep1;
