// import React from 'react'
import { useState } from 'react';
import { navLinks, styles } from '../assets/dummyadmin(1)'
import { GiChefToque } from "react-icons/gi";
import { FiX } from "react-icons/fi";
import { TfiMenu } from "react-icons/tfi";
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  const [menuOpen, setmenuOpen] = useState(false)
  return (
    <nav className={`${styles.navWrapper} w-full`}>
      <div className={styles.navContainer}>
        <div className={styles.logoSection}>
          <GiChefToque className={styles.logoIcon} />
          <span className={styles.logoText} >Admin Panel</span>
        </div>
        <button onClick={() => { setmenuOpen(!menuOpen) }} className={`${styles.menuButton} absolute right-3`}>
          {menuOpen ? <FiX /> : <TfiMenu />}
        </button>

        <div className='flex items-center gap-2' >
          {navLinks.map((link) => (
            <NavLink to={link.href} key={link.name}
              className='
       sm:flex items-center p-2 border rounded-2xl text-sm text-amber-400 bg-amber-600/20 hover:bg-amber-600/50 hidden'
            >
              <span className='mr-1 '>{link.icon}</span>
              <span>{link.name} </span>
            </NavLink>
          ))}
        </div>
      </div>
      {/* Mobile menu */}
      {menuOpen &&
        (<div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <NavLink to={link.href} key={link.name} className={({ isActive }) => `${styles.navLinkBase} ${isActive ? styles.navLinkActive : styles.navLinkInactive} `} onClick={() => setmenuOpen(false)}>
              <span className='mr-1 '>{link.icon}</span>
              <span>{link.name} </span>
            </NavLink>

          ))}
        </div>)
      }
    </nav>
  )
}

export default Navbar