// import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaGithub, FaLinkedin } from "react-icons/fa"
import { CgMail } from "react-icons/cg";
import { useState } from 'react';
import { motion } from "framer-motion";



const Footer = () => {
  const [email,setEmail] = useState("")
   const submitHandler=(e)=>{
    e.preventDefault()
    alert(`Thank you for subscribing with ${email}!`)
    setEmail("")
    }
 
  return (
  <>
 <div
     
   className="Footer bg-linear-to-b from-orange-600 via-amber-600 to-blue-600 p-4 overflow-hidden">

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:px-6 lg:px-8">
    {/* First Part */}
    <motion.div
       initial={{ opacity: 10, y: 50 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.3 }}
     className="items-center flex-col flex">
      <h1 className="text-amber-400 text-2xl md:text-3xl lg:text-4xl font-bold">
        Food-Hi-Food
      </h1>

      <motion.small 
      initial={{ opacity: 0, y: 50 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.6 }}
      className="block mt-2 italic text-white font-serif text-xs md:text-sm">
        When culinary artistry meets doorstep convenience.
      </motion.small>

      <motion.small 
      initial={{ opacity: 0, y: 50 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.7 }}
      className="block italic text-white font-serif text-xs md:text-sm">
        Savor handcrafted perfection, delivered with the care.
      </motion.small>

      <motion.div 
      initial={{ opacity: 0, y: 10 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.6 }}
      className="mt-4">
        <span className="flex gap-3 font-bold text-amber-300 items-center text-base md:text-xl">
          <CgMail />
          Get Exclusive Offers
        </span>

        <form onSubmit={submitHandler} className="mt-3">
          <div className="flex flex-col sm:flex-row border rounded overflow-hidden">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email..."
              required
              className="outline-none px-3 py-2 flex-1 hover:bg-amber-50/10 text-xs md:text-sm lg:text-base xl:text-lg"
            />

            <button
              type="submit"
              className="bg-blue-800/30 px-4 py-2 text-xs md:text-sm text-amber-300 hover:bg-blue-800/50 transition-all duration-300 cursor-pointer"
            >
              Join Now
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>

    {/* Second Part */}
    <div className="flex flex-col gap-2 items-center ">
      <motion.h1
       initial={{ opacity: 0, y: 50 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.6 }}
      className="border-l-2 pl-2 text-amber-300 text-xl lg:text-2xl font-bold">
        
        Navigation
      </motion.h1>

      <motion.div 
      initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 10 }}
       transition={{ duration: 0.6 }}
      className="space-y-2 text-xs md:text-sm lg:text-base xl:text-lg">
        <Link
          to="/"
          className="flex items-center gap-2 hover:scale-105 transition-all duration-300"
        >
          <FaArrowRight className="text-xs" />
          Home
        </Link>

        <Link
          to="/menu"
          className="flex items-center gap-2 hover:scale-105 transition-all duration-300"
        >
          <FaArrowRight className="text-xs" />
          Menu
        </Link>

        <Link
          to="/about"
          className="flex items-center gap-2 hover:scale-105 transition-all duration-300"
        >
          <FaArrowRight className="text-xs" />
          About Us
        </Link>

        <Link
          to="/contact"
          className="flex items-center gap-2 hover:scale-105 transition-all duration-300"
        >
          <FaArrowRight className="text-xs" />
          Contact
        </Link>
      </motion.div>
    </div>

    {/* Third Part */}
    <motion.div 
    initial={{ opacity: 0, y: 50 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.67 }}
    className="flex flex-col gap-3 items-center">
      <h1 className="border-l-2 pl-2 text-amber-300 font-bold text-xl">
        Social Connect
      </h1>
      <div className="flex gap-4">
        <Link to="https://leetcode.com/u/Harish_Dangi/">
          <FaLinkedin className="text-2xl hover:scale-125 transition-all duration-300" />
        </Link>

        <Link to="https://github.com/harish-dangi">
          <FaGithub className="text-2xl hover:scale-125 transition-all duration-300" />
        </Link>
      </div>
    </motion.div>
  </div>
      <motion.div 
      initial={{ opacity: 0, y: 50 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.7 }}
      className='flex items-center justify-center text-amber-100 flex-col mt-4 text-xs md:text-sm lg:text-base xl:text-lg'>

      <div className=' border w-full text-amber-800 '></div>
        &copy; 2026 Food-Hi-Food. All rights reserved.
      </motion.div>
    </div>

    </>
  )
}

export default Footer