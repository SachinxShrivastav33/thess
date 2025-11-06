import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
  {
    personalInfo: {
      gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please fill a valid email address",
        ],
      },
      phoneNo: {
        type: String,
        required: true,
        match: [/^\+?\d{10,12}$/, "Please fill a valid phone number"],
      },
      password: {
        type: String,
        required: true,
      },
    },
    locationInfo: {
      city: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    serviceProviderDetails: {
      profileImage: {
        type: String, // Store as URL or path to uploaded image
        default: null,
      },
      category: {
        type: String,
        required: true,
      },
      experienceYears: {
        type: Number,
        required: true,
        min: 0,
      },
      description: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

export const Provider = mongoose.model("Provider", providerSchema);
