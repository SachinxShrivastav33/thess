import express from "express";
import { signup } from "../controllers/provider.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/login", (req, res) => {
  res.send("Hello ");
});

export default router;
