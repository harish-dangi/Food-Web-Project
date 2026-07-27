import { useEffect, useState } from "react";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { GiChefToque } from "react-icons/gi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHome,
  FiBook,
  FiStar,
  FiPhone,
  FiShoppingCart,
  FiLogOut,
  FiKey,
  FiPackage,
} from "react-icons/fi";
import { useCart } from "../../Context/CartContext";
import Login from "./Login";

const Navbar = () => {
  const navigate = useNavigate();
  const [IsOpen, SetIsOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  const [showLoginModal, setshowLoginModal] = useState(false);
  //COMBINE UPDATING LOGIN MODAL AND AUTH STATUS ON LOCATION CHANGE
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("loginData")),
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setshowLoginModal(location.pathname === "/login");
    setIsAuthenticated(localStorage.getItem("loginData"));
  }, [location.pathname]);

  const handleLoginSuccess = () => {
    localStorage.setItem("loginData", JSON.stringify({ loggedIn: true }));
    setIsAuthenticated(true);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setIsAuthenticated(false);
  };

  const navLinks = [
    { name: "Home", to: "/", icon: <FiHome /> },
    { name: "Menu", to: "/menu", icon: <FiBook /> },
    { name: "About", to: "/about", icon: <FiStar /> },
    { name: "Contact", to: "/contact", icon: <FiPhone /> },
    ...(isAuthenticated
      ? [{ name: "My Orders", to: "/myorder", icon: <FiPackage /> }]
      : []),
  ];

  //EXTRACT DESKTOP AUTH button
  const renderDesktopAuthButton = () => {
    return isAuthenticated ? (
      <button
        onClick={handleLogout}
        className="flex items-center justify-center rounded-2xl px-3 py-2 cursor-pointer border-2 border-amber-700 hover:bg-amber-900 hover:border-amber-500 text-amber-300 shadow-lg  hover:shadow-[1px_2px_10px] bg-amber-500"
      >
        <FiLogOut className="text-[10px] md:text-[12px] lg:text-[14px] mr-2" />
        <span className="text-[10px] md:text-[12px] lg:text-[14px]">
          Logout
        </span>
      </button>
    ) : (
      <button
        onClick={() => navigate("/login")}
        className=" flex items-center justify-center rounded-2xl px-3 py-2 cursor-pointer border-2 border-amber-700 hover:bg-amber-900 hover:border-amber-500 text-amber-300 shadow-lg  hover:shadow-[1px_2px_10px]"
      >
        <FiKey className="text-[10px] md:text-[12px] lg:text-[14px] mr-2" />
        <span className="text-[10px] md:text-[12px] lg:text-[14px]">Login</span>
      </button>
    );
  };
  const renderMobileAuthButton = () => {
    return isAuthenticated ? (
      <button
        onClick={handleLogout}
        className="flex items-center justify-center rounded-2xl px-3 py-2 cursor-pointer border-2 border-amber-700 hover:bg-amber-900 hover:border-amber-500 text-amber-300 shadow-lg  hover:shadow-[1px_2px_10px] bg-amber-500"
      >
        <FiLogOut className="text-[10px] md:text-[12px] lg:text-[14px] mr-2" />
        <span className="text-[10px] md:text-[12px] lg:text-[14px]">
          Logout
        </span>
      </button>
    ) : (
      <button
        onClick={() => {
          navigate("/login");
          SetIsOpen(false);
        }}
        className=" flex items-center justify-center rounded-2xl px-3 py-2 cursor-pointer border-2 border-amber-700 hover:bg-amber-900 hover:border-amber-500 text-amber-300 shadow-lg  hover:shadow-[1px_2px_10px]"
      >
        <FiKey className="text-[14px] md:text-[12px] lg:text-[14px] mr-2" />
        <span className="text-[14px] md:text-[12px] lg:text-[14px]">Login</span>
      </button>
    );
  };

  return (
    <nav className="bg-[#2D1B0E] border-b-8 border-amber-900/30 h-20 shadow-amber-900/30 sticky top-0 z-50 shadow-[0_25px_50px_12px] font-mono group/nav ">
      <div className=" absolute -top-3 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 ">
        <div className=" h-1.5 bg-linear-to-r from-transparent via-amber-600/50 to-transparent shadow-[0_0_20px] shadow-amber-500/30" />
        <div className="flex justify-between px-6">
          <GiForkKnifeSpoon
            className="text-amber-500/40 -mt-4 -ml-2 rotate-45 "
            size={35}
          />
          <GiForkKnifeSpoon
            className="text-amber-500/40 -mt-4 -ml-2 -rotate-45 "
            size={35}
          />
        </div>
      </div>
      {/* MAIN NAVIGATION CONTAINER */}
      <div className=" max-w-7xl mx-auto px-4 relative">
        <div className=" flex justify-between items-center h-16 md:h-18 lg:h-20  ">
          {/* LOGO SECTION */}
          <div className=" flex items-center  space-x-2 group relative md:-translate-x-18 lg:translate-x-30  md:ml-2 cursor-pointer">
            <div className=" absolute -inset-4 bg-amber-500/10 rounded-full blur-xl opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300 " />
            <GiChefToque className=" text-2xl md:text-3xl lg:text-4xl text-amber-500 transition-all  group-hover:rotate-45 group-hover:text-amber-300 hover:drop-shadow-[0_0_15px] hover:drop-shadow-500/20 " />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className=" flex flex-col relative ml-2 max-w-[140] md:max-w-[160] lg:max-w-none"
            >
              <NavLink
                to="/"
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl bg-linear-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent font-extralight tracking-wider "
              >
                Food-ही-Food
              </NavLink>
              <div className="h-0.5 bg-linear-to-r from-amber-600/30 via-amber-400/50 to-amber-600/30 mt-1 ml-1 shadow-[0_2px_5px] shadow-amber-500/20 -translate-x-3 " />
            </motion.div>
          </div>
          {/* DESKTOP NAVIGATION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="hidden md:flex items-center gap-2 lg:gap-4 flex-1 justify-end"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) =>
                  `group px-3 py-2 md:text-[13px] relative transition-all duration-300 flex items-center hover:bg-amber-900/20 rounded-4xl border-2
            ${isActive ? "shadow-[inset_10_10_50px] shadow-amber-600/20 bg-amber-600/20 border-amber-600/50" : "border-amber-900/30  hover:border-amber-600/50 "} shadow-lg shadow-amber-900/20 `
                }
              >
                <span className="mr-2 text-sm md:text-[15px] lg:text-base text-amber-500 group-hover:text-amber-300 transition-all">
                  {link.icon}
                </span>
                <span className="text-amber-100 group-hover:text-amber-300 relative ">
                  {link.name}
                  <span className=" absolute -bottom-0.5 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-500 group-hover:w-full"></span>
                </span>
              </NavLink>
            ))}
            <div className="lg:text-2xl group flex items-center gap-3">
              <NavLink to="/cart">
                <FiShoppingCart className="text-white border-amber-900/20 border-2 rounded-xl h-10 w-10 p-2.5 group-hover:border-amber-600/50 hover:shadow-lg shadow-md transition-all relative hover:shadow-amber-500/30 hover:text-amber-300 mr-3" />
                {totalItems > 0 && (
                  <span className="absolute top-3 right-31 bg-amber-600 text-amber-100 text-xs w-5 h-5 rounded-full flex items-center justify-center hover:bg-sky-500">
                    {totalItems}
                  </span>
                )}
              </NavLink>
              {renderDesktopAuthButton()}
            </div>
          </motion.div>

          {/*MOBIAL MENU  */}
          <div className="md:hidden flex items-center mr-2 ">
            <button
              className="text-amber-500 hover:text-amber-300 focus:outline-none transition-all p-2 rounded-xl border-2 border-amber-900/30 hover:border-amber-600/50 relative shadow-md hover:shadow-lg hover:shadow-amber-500/30"
              onClick={() => SetIsOpen(!IsOpen)}
            >
              <div className=" space-y-2 relative">
                <span
                  className={`block w-6 h-0.5  bg-current transition-all  ${IsOpen ? "rotate-45 translate-y-1.75 " : ""}`}
                />
                <span
                  className={`block w-6 h-0.5  bg-current ${IsOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block w-6 h-0.5  bg-current transition-all ${IsOpen ? "-rotate-45 -translate-y-1.75" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
      {/* MOBILE NAVIGATION */}
      {IsOpen && (
        <div className="md:hidden bg-[#271407] border-t-4 border-amber-900/40 shadow-lg shadow-amber-900/30">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                onClick={() => SetIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-2xl border-2 transition-all
            ${
              isActive
                ? "bg-fuchsia-800/30 text-amber-400 border-amber-600/30"
                : "text-amber-100 hover:bg-amber-600/20 border-amber-900/30"
            }`
                }
              >
                <span className="mr-3 text-amber-500">{link.icon}</span>

                {link.name}
              </NavLink>
            ))}

            <NavLink
              to="/cart"
              onClick={() => SetIsOpen(false)}
              className="flex items-center px-4 py-3 rounded-2xl border-2 border-amber-900/30 text-amber-100 hover:bg-amber-600/20"
            >
              <FiShoppingCart className="text-white border-amber-900/20 border-2 rounded-xl h-10 w-10 p-2.5 group-hover:border-amber-600/50 hover:shadow-lg shadow-md transition-all relative hover:shadow-amber-500/30 hover:text-amber-300 mr-3" />
              {totalItems > 0 && (
                <span className="absolute  right-136 bg-amber-600 text-amber-100 text-xs w-5 h-5 rounded-full flex items-center justify-center hover:bg-sky-500/30">
                  {totalItems}
                </span>
              )}
            </NavLink>
            {renderMobileAuthButton()}
          </div>
        </div>
      )}
      {/* LOGIN MODAL  */}
      {showLoginModal && (
        <div className="bg-black/20 flex items-center justify-center fixed z-50 p-4 inset-0 ">
          <div className="bg-linear-to-br from-[#2fb143] to-[#e58254] via-blue-400 rounded-2xl p-6 relative ">
            <button
              onClick={() => navigate("/")}
              className="absolute -top-1 right-3 text-amber-500 hover:text-red-600 text-3xl "
            >
              &times;
            </button>
            <h2 className="text-xl font-bold bg-linear-to-r from-amber-100 via-purple-800 to-amber-300 bg-clip-text text-transparent mt-2 text-center pb-2">
              Food-Hi-Food
            </h2>
            <Login
              onLoginSuccess={handleLoginSuccess}
              onClose={() => navigate("/")}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
