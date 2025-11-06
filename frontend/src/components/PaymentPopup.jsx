import React from "react";

const PaymentPopup = ({ onClose, onSelect }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Blurred background */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/40"></div>

      <div className="bg-white p-6 rounded-xl shadow-lg z-50 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Select Payment Method
        </h2>

        <button
          onClick={() => onSelect("online")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mb-3 transition"
        >
          Pay Online 💳
        </button>

        <button
          onClick={() => onSelect("cash")}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md mb-3 transition"
        >
          Cash on Delivery 💵
        </button>

        <button
          onClick={onClose}
          className="w-full bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-md transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentPopup;
