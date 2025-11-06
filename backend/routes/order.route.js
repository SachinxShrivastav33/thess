import express from "express";
import userMiddleware from "../middlewares/user.mid.js";
// import { orderData } from "../controllers/order.controller.js"; // remove this

const router = express.Router();

router.get("/my-orders", userMiddleware, async (req, res) => {
  const userId = req.user.id;
  const bookings = await Order.find({ userId }).populate("serviceId");
  return res.status(200).json({ bookings });
});

export const orderData = async (req, res) => {
  try {
    const userId = req.user.id;
    const { serviceId, paymentId } = req.body;

    const exists = await Order.findOne({ userId, serviceId });
    if (exists) {
      return res
        .status(400)
        .json({ errors: "You already booked this service" });
    }

    const order = await Order.create({ userId, serviceId, paymentId });
    return res.status(201).json({ message: "Order saved", order });
  } catch (err) {
    return res.status(500).json({ errors: "Internal Server Error" });
  }
};

router.post("/order", userMiddleware, orderData);

export default router;
