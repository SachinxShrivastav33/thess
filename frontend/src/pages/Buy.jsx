import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Navbar from "../components/Navbar";

export default function Buy() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [service, setService] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardError, setCardError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const initPayment = async () => {
      try {
        const res = await axios.post(
          `http://localhost:4001/api/v1/services/bookServices/${serviceId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        setService(res.data.service);
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        toast.error("Unable to initiate payment");
        navigate("/services");
      }
    };

    initPayment();
  }, [serviceId, token, navigate]);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const card = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card },
      }
    );

    if (error) {
      setCardError(error.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      try {
        await axios.post(
          `http://localhost:4001/api/v1/order`,
          { serviceId, paymentId: paymentIntent.id },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true, // ✅ IMPORTANT
          }
        );

        toast.success("Payment Successful! 🎉");
        navigate("/my-order");
      } catch (err) {
        toast.error("Payment done but storing order failed!");
      }
    } else {
      toast.error("Payment was not completed!");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100 flex justify-center items-center px-4 py-10">
        <div className="bg-white w-full max-w-xl shadow-2xl rounded-2xl overflow-hidden border border-gray-200 animate-fadeIn">
          {/* ✅ Service Image */}
          {service?.image?.url && (
            <div className="w-full h-56 overflow-hidden">
              <img
                src={service.image.url}
                alt={service.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          {/* ✅ Content */}
          <div className="p-8">
            <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-4">
              Secure Checkout 💳
            </h1>

            {service ? (
              <>
                <div className="bg-indigo-50 p-4 rounded-xl mb-6 text-center border border-indigo-200">
                  <p className="text-xl font-semibold text-gray-900">
                    {service.title}
                  </p>
                  <p className="text-4xl font-extrabold text-indigo-600 mt-1">
                    ₹{service.price}
                  </p>
                </div>

                {/* Card Input */}
                <form onSubmit={handlePayment} className="space-y-6">
                  <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: "18px",
                            color: "#333",
                            fontFamily: "Inter, sans-serif",
                            "::placeholder": { color: "#9ca3af" },
                          },
                          invalid: { color: "#ef4444" },
                        },
                      }}
                    />
                  </div>

                  {cardError && (
                    <p className="text-red-500 text-sm">{cardError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg transition transform hover:scale-[1.02] disabled:bg-indigo-300"
                  >
                    {loading
                      ? "Processing Payment..."
                      : `Pay ₹${service.price}`}
                  </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-4">
                  🔐 Payments processed securely via Stripe
                </p>
              </>
            ) : (
              <p className="text-center text-gray-600">Preparing payment...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
