/* eslint-disable */


import React, { useState, useEffect, useContext } from 'react';
import '../../styles/text-stroke.css';

import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";


const ServicesNavbar = ({ darkMode }) => {

  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const navigate = useNavigate();
  const location = useLocation();

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

  // const navigate = useNavigate();


  // const handleNavigation = () => {
  //   navigate(`/services#${id}`);
  // };




  const handleNavigation = (id) => {
    if (location.pathname !== "/") {
      // Navigate to MainPage and scroll after the page loads
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Delay to ensure MainPage renders
    } else {
      // Scroll directly if already on MainPage
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };


  return (
    <nav
    className={`fixed top-0 left-0 w-full py-6 h-20 md:h-14 bg-white text-black flex items-center justify-between z-50 transition-transform duration-300 ${
      isVisible ? "translate-y-0" : "-translate-y-full"
    }`}
  >
    <div className="flex flex-col items-center sm:flex-col md:flex-row lg:flex-row md:items-center w-full md:gap-4">
      {/* Logo */}
      <img
        src="/pixpointLogo.png"
        alt="Logo"
        className="mx-4 h-12 w-fit p-2"
      />
  
      {/* Navigation Links */}
      <div
        className="flex items-center justify-center w-full md:w-auto md:ml-4"
      >
        <button
          onClick={() => handleNavigation("/")}
          className="h-fit mx-3  text-base transition-colors duration-300 hover:text-black font-semibold bg-gradient-to-r from-main to-purple-700 bg-clip-text text-transparent"
        >
          Homeadsa
        </button>
        <Link
          to="/"
          className="h-fit mx-3  text-base transition-colors duration-300 hover:text-black font-semibold bg-gradient-to-r from-main to-purple-700 bg-clip-text text-transparent"
        >
          Services
        </Link>
        <button
          onClick={() => handleNavigation("contact")}
          className="h-fit mx-3  text-base transition-colors duration-300 hover:text-black font-semibold bg-gradient-to-r from-main to-purple-700 bg-clip-text text-transparent"
        >
          Contact
        </button>
        {/* <Link
          to="/careers"
          className="h-fit mx-3  text-base transition-colors duration-300 hover:text-black font-semibold bg-gradient-to-r from-main to-purple-700 bg-clip-text text-transparent"
        >
          Careers
        </Link> */}
      </div>
    </div>
  </nav>
  
  );
};

export default ServicesNavbar;
