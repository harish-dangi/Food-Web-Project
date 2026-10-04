import { useState } from "react";
import { useCart } from "../../Context/CartContext"
import { FaMinus, FaPlus } from "react-icons/fa";
import {Link} from 'react-router-dom'
import { useEffect } from "react";
import axios from "axios";
const categories = ['Breakfast','Lunch','Dinner','Maxican','Italian','Desserts','Drinks']
const OurHomeMenu = () => {
   const {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart
  } = useCart();
  const [activeCategory,setactiveCategory] = useState("");
  const [menuData, setMenuData] = useState([]);
  useEffect(() => {
    // Fetch menu data from the API
    axios.get('https://builder-ai-website.onrender.com/api/items')
      .then(res => {
        const grouped = res.data.reduce((acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = [];
          }
          acc[item.category].push(item);
          return acc;
        }, {});
        setMenuData(grouped);
      })
      .catch(error => console.error('Error fetching menu data:', error));
  }, []);

  //USE ID TO FIND AND UPDATE 
   const getCartEntry = (_id) => {
    return cartItems.find(ci => ci.item._id === _id);
  }
  const getQuantity = (_id) => {
    const entry = getCartEntry(_id);
    return entry ? entry.quantity : 0;
  }
  const displayItems = (menuData[activeCategory] || []).slice(0, 4);

  return (
    <div className=" min-h-screen bg-linear-to-bl from-black/10 via-amber-700/70 to-olive-700/60 text-white py-5 sm:py-10 relative overflow-hidden ">
      <div className="flex flex-col items-center justify-center">

      <div className="flex items-center justify-center">
        <h2 className="text-2xl font-bold text-center mb-10 bg-clip-text text-transparent bg-linear-to-bl from-black via-amber-700 to-olive-700/60 ">
          <span  className="text-5xl md:text-6xl ">Our Exquisite Menu
          </span>
          <br/>
          <span className="text-xl sm:text-2xl  md:text-3xl text-amber-100/80">A Symphony of Flavours</span>
        </h2>
      </div>
      <div className=" grid grid-cols-3 md:grid-cols-7 gap-5 ">
        {categories.map(cat =>(
          <button key={cat} onClick={()=> setactiveCategory(cat)} className={`border rounded-xl p-2 bg-amber-100 text-black cursor-pointer transition-all duration-200  
            ${activeCategory === cat ? 'bg-linear-to-bl from-black/50 via-amber-700 to-olive-700 text-white scale-115 shadow-[0px_0px_11px_6px]  shadow-amber-800 ' : "bg-linear-to-bl from-black via-amber-100 to-olive-700 hover:bg-amber-800/40 hover:scale-95" }`
          }>
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
       xl:grid-cols-4  p-5 ">
        {displayItems.map((item)=>{
          const quantity = getQuantity(item._id);
          const cartEntry = getCartEntry(item._id);
         
          return(
            <div key={item._id} className="relative rounded-2xl overflow-hidden border border-amber-700  flex flex-col items-center justify-center transition-all duration-500 mt-5 p-3  bg-amber-300/40 hover:scale-97 " >
            <div className=' bg-black/10 relative sm:h-45 md:h-100 flex items-center justify-center mb-1 '>
              <img src={item.imageUrl} alt={item.name} className=" object-cover transition-all duration-700 rounded-2xl  hover:scale-3d "/>
            </div>
            <div className="">
              <h2 className="  fontstyle">{item.name}</h2>
              <p className="text-xs text-blue-600">{item.description}</p>
            </div>
            <div className="flex w-full items-center justify-between px-3  pt-3"> 
              <span className="border p-1 bg-amber-100/20 text-amber-700 w-14 items-center flex justify-center rounded-2xl cursor-pointer hover:bg-amber-500/20 hover:text-black hover:shadow-[1px_1px_9px_4px] hover:scale-90 transition-all duration-300" >
                ₹{item.price}
              </span>
              <div className="flex items-center justify-center ">
              {quantity > 0 ? (
                <div className="flex bg-amber-50/20 rounded-2xl items-center justify-center  py-1 ">
                <button className="w-6 h-6 rounded-full bg-amber-900/40 flex items-center justify-center" onClick={()=> quantity > 1 ? updateQuantity(cartEntry._id, quantity - 1):removeFromCart(cartEntry._id)
                }>
                <FaMinus  className="text-xs text-amber-400 " />
                </button>
                <span className="w-8 text-center text-amber-100">{quantity}</span>
                <button  className="w-6 h-6 rounded-full bg-amber-900/40 flex items-center justify-center"  onClick={()=>  updateQuantity(cartEntry._id, quantity + 1)
                }>
                <FaPlus className="text-xs text-amber-400 " /> 
                </button>
              </div>
              ):( 
                <button onClick={()=> addToCart(item,1)}  >
                  <span className="border px-2 p-1 bg-amber-100/20 text-amber-700 items-center flex justify-center rounded-2xl cursor-pointer hover:bg-amber-500/20 hover:text-black hover:shadow-[1px_1px_9px_4px] hover:scale-90 transition-all duration-300">
                    Add To Cart
                  </span>
                </button>
              )}
              </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="border rounded-2xl bg-amber-300 p-2  hover:bg-amber-500/20 hover:text-black hover:shadow-[1px_1px_9px_4px] hover:scale-90 transition-all duration-300 cursor-pointer ">
        <Link to='/menu'>
        Explore Full Menu
        </Link>
      </div>
      </div>
    
    </div>
  )
}

export default OurHomeMenu