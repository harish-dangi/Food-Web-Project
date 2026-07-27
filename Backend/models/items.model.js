import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name:({type:String,required:true,unique:true}),
  imageUrl:({type:String}),
  price:({type:Number,required:true,default:0}),
  rating:({type:Number,required:true ,default:0}),
  hearts:({type:Number,required:true,default:0}),
  total:({type:Number,required:true,default:0}),
  description:({type:String,required:true}),
  category:({type:String,required:true})
},{timestamps:true});

const itemsModel = mongoose.model("item",itemSchema);
export default itemsModel;