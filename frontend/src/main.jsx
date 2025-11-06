import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51RxRcT0AGPM5iP7Q7rU7WRjbMckbczFhIrZ4uPo2dLR7cJngsDnPwGkzwed7dRayKaUKYjnDkGbKdEQ75KLAj74U00FcZAr4Yq"
);

createRoot(document.getElementById("root")).render(
  <Elements stripe={stripePromise}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Elements>
);
