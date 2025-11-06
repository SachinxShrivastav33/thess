import React, { useState } from "react";
import SignupStep1 from "./SignupStep1";
import SignupStep2 from "./SignupStep2";

const ProviderSignup = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // 🔹 Single state for all form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    pincode: "",
    address: "",
    password: "",
    confirmPassword: "",
    gender: "",
    profileImage: null,
    category: "",
    experience: "",
    description: "",
  });

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const backStep = () => setCurrentStep((prev) => prev - 1);

  // 🔹 Submit handler (final step)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Here you can call an API with formData
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#89f7fe] to-[#66a6ff]">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 mx-2 overflow-hidden">
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-blue-800 text-center border-b pb-2 mb-6">
          Register as a Service Provider
        </h2>

        {/* Steps */}
        <div className="flex justify-between items-center mb-8">
          <div
            className={`flex items-center justify-center h-10 w-10 rounded-full text-xl font-bold border 
              ${
                currentStep >= 1
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-gray-200 text-gray-600 border-gray-300"
              }`}
          >
            1
          </div>
          <div
            className={`flex items-center justify-center h-10 w-10 rounded-full text-xl font-bold border 
              ${
                currentStep >= 2
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-gray-200 text-gray-600 border-gray-300"
              }`}
          >
            2
          </div>
        </div>

        {/* Form wrapper */}
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <SignupStep1
              nextStep={nextStep}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {currentStep === 2 && (
            <SignupStep2
              backStep={backStep}
              formData={formData}
              setFormData={setFormData}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default ProviderSignup;
