import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FaEnvelope, FaLock } from "react-icons/fa";

const ProviderLogin = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    // Validation
    if (!email || !password) {
      return handleError("All fields are required.");
    }

    // try {
    //   const url = "http://localhost:4000/auth/login";
    //   const response = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(loginInfo),
    //   });

    //   const result = await response.json();
    //   const { success, message, jwtToken, name, user, error } = result;

    //   if (success) {
    //     // Success notification
    //     handleSuccess(message);

    //     // Save user info to localStorage
    //     localStorage.setItem("token", jwtToken); // Save token
    //     localStorage.setItem("loggedInUser", name);
    //     // Save full user object
    //     localStorage.setItem(
    //       "loggedInUser",
    //       JSON.stringify({
    //         name: loginInfo.name,
    //         email: loginInfo.email,
    //       })
    //     );

    //     // Redirect to home after login
    //     setTimeout(() => {
    //       navigate("/");
    //     }, 1000);
    //   } else if (error) {
    //     const details = error?.details?.[0]?.message;
    //     handleError(details);
    //   } else {
    //     handleError(message || "Login failed.");
    //   }
    // } catch (err) {
    //   handleError("Something went wrong. Try again.");
    // }
  };

  return (
    <div
      className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8
    bg-gradient-to-br from-blue-100 to-purple-300"
    >
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-2xl font-extrabold text-blue-500">
            Log In to Your Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1 flex items-center border border-gray-300 rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 text-gray-500">
                  <FaEnvelope className="text-indigo-600 text-lg" />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginInfo.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border-0 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </div>
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 flex items-center border border-gray-300 rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 text-gray-500">
                  <FaLock className="text-indigo-600 text-lg" />
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginInfo.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border-0 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </div>
          </div>
          {/* Submit */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log In
            </button>
          </div>
          {/* Link to Signup */}
          <p className="mt-2 text-center text-md text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/provider/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </Link>
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ProviderLogin;
