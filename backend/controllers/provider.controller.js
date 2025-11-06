import bcrypt from "bcryptjs";
import { z } from "zod";
import { Provider } from "../models/provider.model.js";

export const signup = async (req, res) => {
  const {
    personalInfo: { gender, firstName, lastName, email, phoneNo, password },
    locationInfo: { city, pincode, address },
    serviceProviderDetails: {
      profileImage,
      category,
      experienceYears,
      description,
    },
  } = req.body;

  // Validation schema (removed confirmPassword)
  const providerSchema = z.object({
    personalInfo: z.object({
      gender: z.enum(["Male", "Female", "Other"], {
        message: "Invalid gender",
      }),
      firstName: z
        .string()
        .min(3, { message: "First name must be at least 3 characters long" }),
      lastName: z
        .string()
        .min(3, { message: "Last name must be at least 3 characters long" }),
      email: z.string().email({ message: "Please fill a valid email address" }),
      phoneNo: z.string().regex(/^\+?\d{10,12}$/, {
        message: "Please fill a valid phone number",
      }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
    }),
    locationInfo: z.object({
      city: z
        .string()
        .min(3, { message: "City name must be at least 3 characters long" }),
      pincode: z
        .string()
        .min(6, { message: "Pincode must be at least 6 characters long" }),
      address: z
        .string()
        .min(6, { message: "Address must be at least 6 characters long" }),
    }),
    serviceProviderDetails: z.object({
      profileImage: z.string().optional(),
      category: z.string().min(1, { message: "Category is required" }),
      experienceYears: z
        .number()
        .min(0, { message: "Experience must be non-negative" }),
      description: z.string().min(1, { message: "Description is required" }),
    }),
  });

  // Validate data
  const validatedData = providerSchema.safeParse(req.body);
  if (!validatedData.success) {
    return res
      .status(400)
      .json({ errors: validatedData.error.issues.map((err) => err.message) });
  }

  try {
    // Check if provider already exists
    const existingProvider = await Provider.findOne({
      "personalInfo.email": email,
    });
    if (existingProvider) {
      return res
        .status(400)
        .json({ errors: "Provider already exists, you can login." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new provider
    const newProvider = new Provider({
      personalInfo: {
        gender,
        firstName,
        lastName,
        email,
        phoneNo,
        password: hashedPassword,
      },
      locationInfo: {
        city,
        pincode,
        address,
      },
      serviceProviderDetails: {
        profileImage,
        category,
        experienceYears,
        description,
      },
    });

    await newProvider.save();

    res.status(201).json({ message: "Signup Successful", newProvider });
  } catch (error) {
    res.status(500).json({ message: "Internal error in signup provider" });
    console.log("Error in Provider signup: ", error);
  }
};
