import express from "express";
import {
  getProfile,
  login,
  logout,
  signup,
} from "../controllers/admin.controller.js";
import adminMiddleware from "../middlewares/admin.mid.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

router.get("/profile", adminMiddleware, getProfile);

export default router;
