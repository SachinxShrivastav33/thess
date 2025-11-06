import { BookService } from "../models/bookService.model.js";
import { Service } from "../models/service.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createService = async (req, res) => {
  const adminId = req.adminId;
  const { title, description, price, category } = req.body;

  try {
    if (!title || !description || !price || !category) {
      return res.status(400).json({ errors: "All fields are required" });
    }

    if (!req.files || !req.files.image) {
      return res.status(400).json({ errors: "Image is required" });
    }

    const cloudRes = await cloudinary.uploader.upload(
      req.files.image.tempFilePath
    );

    const service = await Service.create({
      title,
      description,
      price,
      category,
      creatorId: adminId,
      image: { public_id: cloudRes.public_id, url: cloudRes.secure_url },
    });

    res.status(201).json({ message: "Service created ✅", service });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Server Error" });
  }
};

export const updateServices = async (req, res) => {
  const adminId = req.adminId;
  const { serviceId } = req.params;
  const { title, description, price, category } = req.body;

  try {
    const service = await Service.findOne({
      _id: serviceId,
      creatorId: adminId,
    });

    if (!service) return res.status(404).json({ errors: "Service not found" });

    service.title = title || service.title;
    service.description = description || service.description;
    service.price = price || service.price;
    service.category = category || service.category;

    if (req.files && req.files.image) {
      const cloudRes = await cloudinary.uploader.upload(
        req.files.image.tempFilePath
      );
      service.image = {
        public_id: cloudRes.public_id,
        url: cloudRes.secure_url,
      };
    }

    await service.save();

    res.json({ message: "Service Updated ✅", service });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Server Error" });
  }
};

export const deleteServices = async (req, res) => {
  const adminId = req.adminId;
  const { serviceId } = req.params;
  try {
    const service = await Service.findOneAndDelete({
      _id: serviceId,
      creatorId: adminId,
    });
    if (!service) {
      return res
        .status(404)
        .json({ errors: "can't delete, created by other admin" });
    }
    res.status(200).json({ message: "service deleted successfully" });
  } catch (error) {
    res.status(500).json({ errors: "Error in service deleting" });
    console.log("Error in service deleting", error);
  }
};

export const getServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.status(200).json({ services });
  } catch (error) {
    res.status(500).json({ errors: "Error in getting services" });
    console.log("error to get services", error);
  }
};

export const serviceDetails = async (req, res) => {
  const { serviceId } = req.params;
  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ error: "service not found" });
    }
    res.status(200).json({ service });
  } catch (error) {
    res.status(500).json({ errors: "Error in getting service details" });
    console.log("Error in service details", error);
  }
};

import Stripe from "stripe";
import config from "../config.js";

const stripe = new Stripe(config.STRIPE_SECRET_KEY);

export const bookServices = async (req, res) => {
  try {
    const userId = req.userId; // ✅ Correct user ID
    const { serviceId } = req.params;

    // ✅ Find service
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ errors: "Service not found" });
    }

    // ✅ Check if user already booked
    const existingOrder = await BookService.findOne({ userId, serviceId });
    if (existingOrder) {
      return res
        .status(400)
        .json({ errors: "You already booked this service" });
    }

    // ✅ Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: service.price * 100, // converting ₹ to paise
      currency: "inr",
      automatic_payment_methods: { enabled: true },
      metadata: { userId, serviceId },
    });

    return res.status(200).json({
      message: "Proceed to payment",
      clientSecret: paymentIntent.client_secret,
      service,
    });
  } catch (error) {
    console.log("Payment Error:", error);
    return res.status(500).json({ errors: "Internal Server Error" });
  }
};
