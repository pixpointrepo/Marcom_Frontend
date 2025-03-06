import React, { useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import WeatherTimeDisplay from "./WeatherDisplay";

const TopLevelNavbar = () => {

  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = () => {
    navigate("/"); // Navigate first
    setTimeout(() => {
      window.location.reload(); // Reload after navigation
    }, 100); // Small delay to ensure navigation happens first
  };

    useEffect(() => {
      const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        const isScrollingUp = currentScrollPos < prevScrollPos;
  
        setIsVisible(isScrollingUp || currentScrollPos < 100); // Always show near the top
        setPrevScrollPos(currentScrollPos);
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [prevScrollPos]); //useEffect is called whenever the dependency 'prevScrollPos' is changed.

  return (
    <nav
      className={` w-full py-6 h-20 md:h-14 bg-white text-black flex items-center justify-between z-50 transition-transform duration-300"}`}
    >
      <div className="flex flex-col items-center sm:flex-col md:flex-row lg:flex-row md:items-center w-full md:gap-4">
        {/* Logo */}
        <div onClick={()=> handleNavigation()} className="cursor-pointer md:absolute">
        <img
          src="/marcom.jpg"
          alt="Logo"
          className="mx-4 h-12 w-fit p-2"
        />
        </div>

        {/* Navigation Links */}
       
        <div className="flex items-center justify-center w-full ">
          <Link
            to="/"
            className="h-fit mx-3  text-base transition-colors duration-300 hover:text-[#1E3A8A] font-semibold bg-gradient-to-r from-main to-purple-700 bg-clip-text text-transparent"
          >
            News
          </Link>
          <Link
            to="/products"
            className="h-fit mx-3  text-base transition-colors duration-300 hover:text-[#1E3A8A] font-semibold bg-gradient-to-r from-main to-purple-700 bg-clip-text text-transparent"
          >
            Products
          </Link>
          <Link
            to="/contact-us"
            className="h-fit mx-3  text-base transition-colors duration-300 hover:text-[#1E3A8A] font-semibold bg-gradient-to-r from-main to-purple-700 bg-clip-text text-transparent"
          >
            Contact Us
          </Link>
          {/* <button
            onClick={() => handleNavigation("contact")}
            className="h-fit mx-3  text-base transition-colors duration-300 hover:text-black font-semibold bg-gradient-to-r from-main to-purple-700 bg-clip-text text-transparent"
          >
            Contact
          </button> */}
          
        </div>

       
        </div>
     
    </nav>
  );
};

export default TopLevelNavbar;
