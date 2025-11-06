import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
import config from "../config.js";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { BookService } from "../models/bookService.model.js";
// import { Service } from "../models/service.model.js";
import WishList from "../models/WishList.js";

// user signup code
export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userSchema = z.object({
    firstName: z
      .string()
      .min(3, { message: "firstName must be atleast 3 char long" }),
    lastName: z
      .string()
      .min(3, { message: "lastName must be atleast 3 char long" }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "password must be atleast 6 char long" }),
  });

  const validatedData = userSchema.safeParse(req.body);
  if (!validatedData.success) {
    return res
      .status(400)
      .json({ errors: validatedData.error.issues.map((err) => err.message) });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ errors: "User already exists" });
    }
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const { password: _, ...userWithoutPassword } = newUser.toObject();
    res
      .status(201)
      .json({ message: "Signup succeeded", user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ errors: "Error in signup" });
    console.log("Error in signup", error);
  }
};

// user login code
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(403).json({ errors: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({ errors: "Invalid credentials" });
    }

    // jwt code
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      config.JWT_USER_PASSWORD,
      { expiresIn: "7d" }
    );

    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      httpOnly: true, //  can't be accsed via js directly
      secure: process.env.NODE_ENV === "production", // true for https only
      sameSite: "Strict", // CSRF attacks
    };
    res.cookie("jwt", token, cookieOptions);
    res.status(201).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ errors: "Error in login" });
    console.log("error in login", error);
  }
};

// user logout code
export const logout = (req, res) => {
  try {
    if (!req.cookies?.jwt) {
      res.status(401).json({ errors: "Kindly Login first...." });
    }
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ errors: "Error in logout" });
    console.log("Error in logout", error);
  }
};

// user booking services code
export const getUserBookings = async (req, res) => {
  const userId = req.userId;

  try {
    // Fetch all bookings for this user and populate service details
    const bookServices = await BookService.find({ userId })
      .populate("serviceId")
      .exec();

    if (!bookServices.length) {
      return res.status(200).json({
        message: "No bookings found",
        bookings: [],
      });
    }

    res.status(200).json({
      bookings: bookServices, // contains both booking and service info
    });
  } catch (error) {
    console.error("Error in getting user bookings:", error);
    res.status(500).json({
      errors: "Internal server error while fetching bookings",
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ errors: "Failed to fetch Users" });
    console.log("Error to fetch users", error);
  }
};

// Get Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password"); // don’t send password
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Error fetching profile" });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, password } = req.body;

    let updateData = { firstName, lastName };

    // If user wants to change password
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { $set: updateData },
      { new: true }
    ).select("-password");

    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Error updating profile" });
  }
};

// Add item to wish list
export const addToWishList = async (req, res) => {
  const { serviceId, quantity } = req.body;
  const userId = req.userId;

  try {
    let wishList = await WishList.findOne({ userId });

    if (!wishList) {
      wishList = new WishList({ userId, items: [] });
    }

    // Check if service already exists in cart
    const itemIndex = wishList.items.findIndex(
      (item) => item.serviceId.toString() === serviceId
    );

    if (itemIndex > -1) {
      wishList.items[itemIndex].quantity += quantity || 1; // update quantity
    } else {
      wishList.items.push({ serviceId, quantity: quantity || 1 });
    }

    await wishList.save();
    res.status(200).json({ message: "Added to cart", wishList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding to wish list" });
  }
};

// Get wish list
export const getWishList = async (req, res) => {
  try {
    const wishList = await WishList.findOne({ userId: req.userId }).populate(
      "items.serviceId"
    );
    res.status(200).json(wishList || { items: [] });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
};

// Remove item
export const removeFromWishList = async (req, res) => {
  const { serviceId } = req.params;
  const userId = req.userId;

  try {
    const wishList = await WishList.findOne({ userId });
    if (!wishList)
      return res.status(404).json({ message: "wish-list not found" });

    wishList.items = wishList.items.filter(
      (item) => item.serviceId.toString() !== serviceId
    );
    await wishList.save();

    res.status(200).json({ message: "Removed from wish-list", wishList });
  } catch (error) {
    res.status(500).json({ message: "Error removing item" });
  }
};
