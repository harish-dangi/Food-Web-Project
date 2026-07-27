import express from "express";

import {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getUserOrders,
  updateOrderStatus,
  deleteOrder,
  stripePayment,
} from "../controllers/order.controller.js";

const orderRouter = express.Router();

// orderRouter.post("/create", createOrder);
orderRouter.post("/create",  createOrder);
orderRouter.get("/getall", getAllOrders);
orderRouter.get("/:id", getSingleOrder);
orderRouter.get("/user/:userId", getUserOrders);
orderRouter.put("/:id", updateOrderStatus);
orderRouter.delete("/:id", deleteOrder);
orderRouter.post("/stripe", stripePayment);

export default orderRouter;