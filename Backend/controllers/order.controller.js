import Order from "../models/order.model.js";
import Stripe from "stripe";
import dotenv from 'dotenv'
dotenv.config();

// console.log("dp",process.env.STRIPE_SECRET_KEY)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// console.log(stripe)
// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const {
      user,
      email,
      firstName,
      lastName,
      phone,
      address,
      city,
      zipCode,
      items,
      paymentMethod,
      subtotal,
      tax,
      shipping,
      total,
    } = req.body;

    // VALIDATION
    if (
      !email ||
      !firstName ||
      !lastName ||
      !phone ||
      !address ||
      !city ||
      !zipCode ||
      !items ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // CREATE ORDER
    const order = await Order.create({
      user,
      email,
      firstName,
      lastName,
      phone,
      address,
      city,
      zipCode,
      items,
      paymentMethod,
      subtotal,
      tax,
      shipping,
      total,
      paymentStatus: paymentMethod === "cod" ? "pending" : "succeeded",
    });
    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL ORDERS
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user","name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE ORDER
export const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET USER ORDERS
export const getUserOrders = async (req, res) => {
  try {
    const user= req.user.userId
    // console.log(user)
    const orders = await Order.find({
      user: req.params.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    if (status) {
      order.status = status;
      if (status === "delivered") {
        order.deliveredAt = new Date();
      }
    }
    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }
    await order.save();
    return res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// DELETE ORDER
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    await order.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// STRIPE PAYMENT
export const stripePayment = async (req, res) => {
  const { items } = req.body;
  // console.log("items in stripe:",items)
  try {
  const line_items = items.map(({ item, quantity }) => ({
  price_data: {
    currency: "inr",
    product_data: {
      name: item.name,
    },
    unit_amount: Math.round(item.price * 100),
  },
  quantity,
}));
// console.log("line_items:",line_items)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:5173/checkout?payment_status=success&session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/checkout?payment_status=cancel"
    });

    return res.status(200).json({
      success: true,
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
