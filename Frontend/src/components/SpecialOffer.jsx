import { useState, useEffect } from "react";
import {
  addButtonBase,
  addButtonHover,
  commonTransition,
} from "../assets/dummydata";
import { useCart } from "../../Context/CartContext";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { FaFire, FaHeart } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import FloatingParticle from "./FloatingParticle";
import axios from "axios";

const SpecialOffer = () => {
  const [showAll, setShowAll] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/items")
      .then((res) => setItems(res.data));
  }, []);
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="bg-linear-to-bl from-blue-500 via-emerald-700 to-lime-500 h-full p-9">
      <div className="group relative">
        <h1 className="flex items-center justify-center pt-4 italic font-bold  text-2xl bg-linear-to-br from-amber-800 via-amber-500 to-emerald-500  bg-clip-text text-transparent tracking-tighter font-serif">
          Today's <span className="ml-3 mr-3 font-medium "> Special</span>{" "}
          Offers
        </h1>
        <p className="flex items-center justify-center text-white text-xs mt-1 italic pb-4">
          Savor the extraordinary with our culidnary masterpieces crafted to
          perfection.
        </p>

        {/*  PRODUCT CARD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-5 pb-5 brightness-90 hide-scrollbar  ">
          {(showAll ? items : items.slice(0, 4)).map((item, index) => {
            const cartItem = cartItems.find((ci) => ci.item._id === item._id);

            const quantity = cartItem?.quantity || 0;
            return (
              <div
                key={`${item._id}-${index}`}
                className="relative group bg-linear-to-bl from-amber-400/90 to-amber-900/90  rounded-3xl mb-3 hover:scale-97 hover:shadow-[3px_2px_9px_5px] shadow-amber-400/60 transition-all duration-200 cursor-pointer  "
              >
                <div className="relative  flex  items-center justify-center p-3 flex-col">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-3 backdrop-blur-2xl  rounded-2xl  flex  justify-between  w-10/12 p-1 hover:bg-black/40 items-center">
                    <div className="flex items-center  gap-1 ml-2 text-amber-300">
                      <MdOutlineStarPurple500 />
                      <span>{item.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 mr-2 text-red-500/60 ">
                      <FaHeart />
                      <span>{item.hearts}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-indigo-400/30  rounded-3xl ">
                  <h2 className=" text-amber-300 font-serif font-medium ">
                    {item.name}
                  </h2>
                  <p className=" text-white/70 font-serif font-medium text-[10px]  w-45">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-1 group relative ">
                    <p className="  font-serif  text-[17px]  font-bold mt-2 text-emerald-500 block hover:rotate-360 transition-all duration-500">
                      ₹{item.price}
                    </p>
                    {cartItem ? (
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() =>
                            quantity > 1
                              ? updateQuantity(cartItem._id, quantity - 1)
                              : removeFromCart(cartItem._id)
                          }
                          className="w-6 h-6 rounded-full bg-amber-900/40 flex items-center justify-center"
                        >
                          <FaMinus className="text-xs text-amber-400 " />
                        </button>
                        <span className="text-white font-bold text-lg">
                          {" "}
                          {quantity}{" "}
                        </span>
                        <button
                          onClick={() => {
                            updateQuantity(cartItem._id, quantity + 1);
                          }}
                          className="w-6 h-6 rounded-full bg-amber-900/40 flex items-center justify-center"
                        >
                          {" "}
                          <FaPlus className="text-xs text-amber-400 " />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          addToCart(
                            {
                              ...item,
                              name: item.title,
                              price: Number(item.price),
                            },
                            1,
                          )
                        }
                        className={`${addButtonBase} ${addButtonHover} ${commonTransition} mt-1`}
                      >
                        <FaPlus className="text-[13px] " />
                        <span className="text-[13px] font-serif">Add</span>
                      </button>
                    )}
                  </div>
                  <div className="absolute inset-0 rounded-3xl pointer-events-none border-2 border-transparent group-hover:border-amber-500/30 transition-all duration-300" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <FloatingParticle />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center pb-5">
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-3 bg-linear-to-r fill-amber-200 from-orange-400  to-amber-500 text-white px-5 py-2 rounded-2xl font-bold  text-lg tracking-tighter hover:gap-4 hover:scale-95 hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300 group border-2 border-amber-400/20 overflow-hidden cursor-pointer"
        >
          <div className=" absolute inset-0 bg-linear-to-r fill-amber-500/20 via-transparent to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"  />
          <FaFire className="text-xl animate-pulse" />
          <span>{showAll ? "Show Less" : "Show More"}</span>
          <div className="h-full w-1 bg-amber-400/40 absolute right-0 top-0 group-hover:animate-border-pulse" />
        </button>
      </div>
    </div>
  );
};

export default SpecialOffer;
