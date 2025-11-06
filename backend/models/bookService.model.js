import mongoose from "mongoose";

const bookServiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceId: {
      type: mongoose.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    paymentId: {
      type: String,
    },
    amount: {
      type: Number,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

export const BookService = mongoose.model("BookService", bookServiceSchema);
