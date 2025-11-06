import express from "express";
import {
  addToWishList,
  getProfile,
  getUserBookings,
  getUsers,
  getWishList,
  login,
  logout,
  removeFromWishList,
  signup,
  updateProfile,
} from "../controllers/user.controller.js";
import userMiddleware from "../middlewares/user.mid.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/book-services", userMiddleware, getUserBookings);

router.get("/profile", userMiddleware, getProfile);
router.put("/profile", userMiddleware, updateProfile);

router.get("/getUser", getUsers);

// Add to cart
router.post("/wish-list", userMiddleware, addToWishList);

// Get user cart
router.get("/wish-list", userMiddleware, getWishList);

// Remove from cart
router.delete("/wish-list/:serviceId", userMiddleware, removeFromWishList);

export default router;
