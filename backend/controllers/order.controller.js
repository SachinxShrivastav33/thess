import { Order } from "../models/order.model.js";
import { Service } from "../models/service.model.js";

export const orderData = async (req, res) => {
  try {
    const userId = req.userId; // ✅ Correct way to read user
    const { serviceId, paymentId } = req.body;

    if (!userId) {
      return res.status(401).json({ errors: "User not authenticated" });
    }

    // ✅ Check if service exists (good protection)
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ errors: "Service not found" });
    }

    // ✅ Prevent duplicate booking
    const exists = await Order.findOne({ userId, serviceId });
    if (exists) {
      return res
        .status(400)
        .json({ errors: "You already booked this service" });
    }

    // ✅ Create Order
    const order = await Order.create({
      userId,
      serviceId,
      paymentId,
      amount: service.price,
      status: "paid",
    });

    return res.status(201).json({ message: "Order saved", order });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: "Internal Server Error" });
  }
};
