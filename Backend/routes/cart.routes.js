import express from 'express'
import { addToCart, clearCart, deleteCart, getCart, updateCartItem } from '../controllers/cart.controller.js';
import authMiddleware from '../middelwares/auth.middelware.js';


const RouterCart = express.Router();

RouterCart.get('/',authMiddleware,getCart);
RouterCart.post('/',authMiddleware,addToCart);
RouterCart.post('/clear',authMiddleware,clearCart);
RouterCart.put('/:id',authMiddleware,updateCartItem);
RouterCart.delete('/:id',authMiddleware,deleteCart);
RouterCart.delete('/',authMiddleware,clearCart);
export default RouterCart