import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
  },
  item:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"item",
    required:true
  },
  quantity:{
    type:Number,
    default:1,
    min:1
  }
},{timestamps:true});

export const CartModel = mongoose.model('cart',cartSchema);

