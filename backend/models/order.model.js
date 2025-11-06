import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    paymentId: { type: String, required: true },
    amount: { type: Number },
    status: { type: String, default: "paid" },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
