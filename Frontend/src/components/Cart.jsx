// import React from 'react'
import { useCart } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const totalAmount = cartItems.reduce((sum, ci) => {
    return sum + (ci.item.price * ci.quantity);
  }, 0);
//  console.log(totalAmount)
  // console.log("cartItems:", cartItems)
  // console.log("cartItems Length:", cartItems.length)
  return (
    <div className=' h-full bg-linear-to-r from-orange-500 to-amber-200 text-white text-2xl'>
      <div className="text-center py-8">
        <h1 className="text-5xl font-extrabold tracking-wide bg-linear-to-r from-amber-500 via-yellow-600 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">
          🛒 Your Cart
        </h1>

        <div className="flex items-center justify-center mt-3">
          <div className="w-16 h-0.5 bg-amber-100 rounded-full"></div>
          <span className="mx-3 text-amber-300 text-xl">🍽️</span>
          <div className="w-16 h-0.5 bg-amber-100 rounded-full"></div>
        </div>

        <p className="text-gray-500 italic mt-3 text-sm tracking-wider">
          Delicious meals are just one step away
        </p>
      </div>
      <div className='p-3'>
        {cartItems.length === 0 ? (
          <p className='text-center text-amber-300 italic'>Your cart is empty.</p>
        ) : (
          <div className='p-3 grid grid-cols-1 min-[450px]:grid-cols-2
          min-[768px]:grid-cols-3 xl:grid-cols-4 gap-4   rounded-md'>
            {cartItems.map((item) => (
              <div key={item._id} className='flex flex-col items-center justify-between p-2  border-amber-300 border rounded-xl shadow-md bg-linear-to-r from-orange-900 to-amber-700   gap-2 hover:shadow-lg hover:shadow-amber-400/50 transition-all duration-300 hover:scale-105 '>

                <img src={`https://builder-ai-website.onrender.com${item.item.imageUrl}`} alt={item.item.name} className='w-60 h-60  object-cover rounded-md object-center ' />
                <span className='text-sm  text-amber-100'>{item.item.name}</span>

                <p className='text-xs text-amber-300 italic '>{item.item.description}</p>
                <p className='text-amber-300 italic text-sm'>Total: ₹{(item.item.price * item.quantity).toFixed(2)}</p>
                <div className='flex items-center space-x-2 mt-2 justify-between w-full'>
                  <div className='flex items-center gap-2'>
                    <button
                      onClick={() => {
                        if (item.quantity > 1) {
                          updateQuantity(item._id, item.quantity - 1);
                        } else {
                          removeFromCart(item._id);
                        }
                      }}
                      className='bg-amber-400 text-white px-1  rounded-md hover:bg-red-800 transition-colors duration-300 hover:cursor-pointer hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-red-500'>
                      -
                    </button>
                    <span className='text-amber-400 text-lg'>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className='bg-amber-400 text-white px-1  rounded-md hover:bg-red-800 transition-colors duration-300 hover:cursor-pointer hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-red-500'>
                      +
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item._id)} className='bg-red-500 text-sm text-white px-2 py-1 rounded-md hover:bg-red-800 transition-colors duration-300 hover:cursor-pointer hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-red-500'>
                    Remove
                  </button>
                </div>
              </div>

            ))}
          </div>
        )}
      </div>
      <div className='p-3'>
        <h2 className='text-amber-300 text-lg italic'>Total Amount: ₹{totalAmount.toFixed(2)}</h2>
      </div>
      <div className='p-3'>
        <Link to="/checkout" className='bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors duration-300 text-sm hover:cursor-pointer hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-amber-500'>
          Checkout Now
        </Link>
      </div>
    </div>
  )
}

export default Cart