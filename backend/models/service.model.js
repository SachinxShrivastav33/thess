import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    category: {
      type: String,
      enum: [
        "Home Cleaning",
        "Electrician",
        "Carpenter",
        "Plumber",
        "Motor Mechanic",
        "Salon",
        "Any Others",
      ],
    },
    creatorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Service = mongoose.model("Service", serviceSchema);
