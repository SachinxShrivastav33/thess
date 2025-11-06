import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

function BookServices() {
  const { serviceId } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [service, setService] = useState({});
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");

  // ✅ Redirect to login if no token, after component mounts
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // ✅ Fetch service details and client secret for payment
  useEffect(() => {
    const fetchBookServiceData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `http://localhost:4001/api/v1/services/bookServices/${serviceId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setService(response.data.service);
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        if (error?.response?.status === 400) {
          setError("You have already booked this service");
          toast.error("You have already booked this service");
        } else {
          setError(error?.response?.data?.errors || "Something went wrong");
          toast.error(error?.response?.data?.errors || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchBookServiceData();
    }
  }, [serviceId, token]);

  const handleBooking = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    const card = elements.getElement(CardElement);

    if (card == null) {
      setLoading(false);
      return;
    }

    // ✅ Create payment method
    const { error: createError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (createError) {
      setCardError(createError.message);
      setLoading(false);
      return;
    }

    if (!clientSecret) {
      setLoading(false);
      toast.error("Payment setup failed");
      return;
    }

    // ✅ Confirm card payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.user?.firstName,
            email: user?.user?.email,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      toast.success("Booking Successful ✅");

      const bookingInfo = {
        email: user?.user?.email,
        userId: user.user._id,
        serviceId: serviceId,
        paymentId: paymentIntent.id,
        amount: paymentIntent.amount,
        status: paymentIntent.status,
      };

      try {
        // ✅ Save booking to backend
        await axios.post(`${BACKEND_URL}/booking`, bookingInfo, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        toast.success("Booking data saved");
      } catch (error) {
        toast.error("Error saving booking data");
        console.error("Booking error:", error);
      }

      navigate("/my-order"); // ✅ Redirect after booking
    }

    setLoading(false);
  };

  return (
    <>
      {error ? (
        <div className="flex justify-center items-center h-screen">
          <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg">
            <p className="text-lg font-semibold">{error}</p>
            <Link
              className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-200 mt-3 flex items-center justify-center"
              to={"/my-order"}
            >
              My Bookings
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row my-40 container mx-auto">
          {/* Booking Details */}
          <div className="w-full md:w-1/2">
            <h1 className="text-xl font-semibold underline">Booking Details</h1>
            <div className="flex items-center text-center space-x-2 mt-4">
              <h2 className="text-gray-600 text-sm">Total Price</h2>
              <p className="text-red-500 font-bold">${service.price}</p>
            </div>
            <div className="flex items-center text-center space-x-2">
              <h1 className="text-gray-600 text-sm">Service Name</h1>
              <p className="text-red-500 font-bold">{service.title}</p>
            </div>

            {/* Back Button */}
            <Link
              to="/services"
              className="mt-6 inline-block bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200"
            >
              ⬅ Back to Services
            </Link>
          </div>

          {/* Payment Form */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-4">
                Process your Payment!
              </h2>
              <form onSubmit={handleBooking}>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
                <button
                  type="submit"
                  disabled={!stripe || loading}
                  className="mt-8 w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-200"
                >
                  {loading ? "Processing..." : "Book Now"}
                </button>
              </form>
              {cardError && (
                <p className="text-red-500 font-semibold text-xs mt-2">
                  {cardError}
                </p>
              )}
              <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-200 mt-3 flex items-center justify-center">
                <span className="mr-2">🅿️</span> Other Payment Methods
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BookServices;
