import {motion} from 'framer-motion'
import {features,stats,teamMembers} from '../assets/dummydata.js'
import { useState } from 'react';
import {  FaGithub, FaLinkedin } from "react-icons/fa"
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import Navbar from "../components/Navbar.jsx"
import Footer from './Footer.jsx';
const AboutKe = () => {
  const [hoveredStat, setHoveredStat] = useState(null);

  return (
    <div className='w-screen h-full  bg-linear-to-r from-orange-900 to-green-700 text-white text-2xl font-bold  '>
<Navbar />


    <div className='flex flex-col items-center px-5 py-10 text-center '>
      <motion.h1 initial={{y:-100,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:1.5}} className='text-4xl  text-amber-300 font-serif'>Culinary Express</motion.h1>
      <motion.p initial={{x:-100,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:1.5,delay:0.5}} className='text-lg text-white/80 font-serif'>Crafting unforgettable dining experiences with every bite.</motion.p>
    </div>
    <div className='flex flex-wrap justify-center gap-8 mt-10  p-10 rounded-xl shadow-lg '>
      {features.map((item,index)=>(
        <motion.div key={index} initial={{y:50,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:1.5,delay:0.2*index}} className={`w-64 p-6 rounded-xl shadow-lg bg-linear-to-r ${item.color} text-white flex flex-col items-center gap-4 hover:scale-105 hover:shadow-2xl transition-all duration-300 `}>
          <item.icon className='text-4xl text-amber-300'/>
          <h3 className='text-xl font-bold text-amber-300'>{item.title}</h3>
          <p className='text-[10px]'>{item.text}</p>
        </motion.div>
      ))}
      </div>
      <div className='flex flex-wrap justify-center gap-8 p-10  shadow-lg bg-linear-to-r from-orange-900 to-green-700 '>
        {stats.map((stat,index)=>( 
          <motion.div key={index} initial={{y:50,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:1.5,delay:0.2*index}} onMouseEnter={()=>setHoveredStat(index)} onMouseLeave={()=>setHoveredStat(null)} className={` transition-all duration-300 w-48 p-2 rounded-xl hover:shadow-xl shadow-amber-400  bg-linear-to-r from-mauve-700 via-gray-800 to-amber-900 text-white flex flex-col items-center gap-4 ${hoveredStat===index?'scale-105 shadow-2xl':''}`}>
            <stat.icon className='text-4xl  rounded-full p-2 border-amber-300 bg-amber-300/30 text-amber-500 mt-3 border'/>
            <h3 className='text-2xl font-bold -mb-5' >{stat.value}</h3>
            <h1 className='text-3xl font-bold bg-linear-to-r from-amber-500/40 via-amber-300  to-amber-500 text-transparent bg-clip-text'>{stat.number}</h1>
            <p className='text-sm -mt-2  uppercase text-blue-200'>{stat.label}</p>
          </motion.div>
        ))}
      </div>
      <div className='flex flex-wrap justify-center gap-8  flex-col items-center  bg-linear-to-r from-orange-900 to-green-700 p-10 shadow-lg '>
        <h1 className='text-3xl font-bold text-amber-500 '>Meet Our Culinary Artists </h1>
        <div className='flex flex-wrap justify-center gap-8 '>

        {teamMembers.map((member, index) => (
          <motion.div key={index} initial={{y:50,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:1.5,delay:0.2*index}} className=' p-2 rounded-xl shadow-lg bg-linear-to-r from-mauve-700 via-gray-800  to-amber-900 text-white flex flex-col items-center gap-4 w-60 border border-amber-300/30 hover:scale-105 hover:shadow-2xl transition-all duration-300'>
            <motion.img className='text-4xl   border-amber-300  text-amber-500 h-50 w-full object-cover object-center border rounded-2xl' src={member.img} alt={member.name} />
            <h3 className='text-xl font-bold'>{member.name}</h3>
            <p className='text-xs  -mt-2  italic text-center text-amber-400'>{member.role}</p>
            <p className='text-[10px] text-amber-300 font-light -mt-2 italic text-center'>{member.bio}</p>
            <div className='flex gap-4 mt-2 mb-2 text-amber-500 '>
              {member.social.twitter && <a href={member.social.twitter} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter text-blue-400 transition-colors duration-300 "></i>
              <FaGithub className='hover:scale-125 transition-all duration-200'/>
              </a>}
              {member.social.instagram && <a href={member.social.instagram} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram text-pink-400 hover:text-pink-600 transition-colors duration-300"></i>
              <FaInstagram className='hover:scale-125 transition-all duration-200'/>
              </a>}
              {member.social.facebook && <a href={member.social.facebook} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook text-blue-600 hover:text-blue-800 transition-colors duration-300"></i>
              <FaFacebook className='hover:scale-125 transition-all duration-200'/>
              </a>}
              {member.social.linkedin && <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin text-blue-500 hover:text-blue-700 transition-colors duration-300"></i>
              <FaLinkedin className='hover:scale-125 transition-all duration-200'/>
              </a>}
            </div>
          </motion.div>
        ))}
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default AboutKe