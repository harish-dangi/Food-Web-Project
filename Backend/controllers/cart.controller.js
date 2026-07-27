import { CartModel } from "../models/cart.model.js";
import asyncHandler from "express-async-handler"
/**
 * Router get
 * get all cart items
 */
export const getCart = asyncHandler(async (req, res) => {
  const cartItems = await CartModel.find({
  user: req.user._id,
}).populate("item");

  const formatted = cartItems.map((ci) => ({
    _id: ci._id.toString(),
    item: ci.item,
    quantity: ci.quantity
  }))
  res.json(formatted)
})



//ADD CART function TO ADD ITEMS TO cart
export const addToCart = asyncHandler(async (req, res) => {
  const { itemId, quantity } = req.body;
  // console.log(itemId)
  try {
    if (!itemId || typeof quantity !== 'number') {
      return res.status(400).json({ message: "itemId and quantity are required" })
    }
    let cartitem = await CartModel.findOne({ user: req.user._id, item: itemId })
    // console.log("cartitem:",cartitem);
    if (cartitem) {
      cartitem.quantity += quantity;
      if (cartitem.quantity <= 0) {
        await cartitem.remove();
        return res.json({ _id: cartitem._id.toString(), items: cartitem.item, quantity: 0 })
      }
      await cartitem.save();
      await cartitem.populate('item'); // item object
      return res.status(200).json({
        message: "addToCart the item model",
        _id: cartitem._id.toString(),
        item: cartitem.item,
        quantity: cartitem.quantity
      })
    }
    const newItem = await CartModel.create({ user: req.user._id, item: itemId, quantity })
    await newItem.populate('item');
  
    return res.status(201).json({
      message: "Cart created successfully",
      _id: newItem._id.toString(),
      item: newItem.item,
      quantity: newItem.quantity
    })
  } catch (err) {
    console.error("Error in addToCart:", err);
  }
})
// LETS CREATE A METHOD TO UPDATE CART AND ITEMS quantity
export const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const cartitem = await CartModel.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (!cartitem) {
    return res.status(404).json({
      message: "Cart item not found"
    });
  }
  cartitem.quantity = Math.max(1, quantity);
  await cartitem.save();
  await cartitem.populate("item");

  res.json({
    message: "Updated cart item successfully",
    _id: cartitem._id,
    item: cartitem.item,
    quantity: cartitem.quantity
  });

});

//Delete function
export const deleteCart = asyncHandler(async (req, res) => {
  const cartitem = await CartModel.findOne({ _id: req.params.id, user: req.user._id })
  if (!cartitem) {
    return res.status(404).json({
      message: "Cart items not found"
    })
  }
  await cartitem.deleteOne();
  return res.status(200).json({
    message: "Cart delete successfully",
    _id: req.params.id
  })
})
//clear cart function to empty the cart
export const clearCart = asyncHandler(async (req, res) => {

  await CartModel.deleteMany({ user: req.user._id });
  return res.status(200).json({
    message: "clear cart",
  })
})