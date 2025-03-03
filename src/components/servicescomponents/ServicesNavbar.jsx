/* eslint-disable */
import React, { useState, useEffect } from "react";

// Simplified menu items
const menuItems = [
  { label: "Home", path: "#home" }, // Optional: Scrolls to a home section
  { label: "Services", path: "#services", },
  { label: "Strategies", path: "#strategy", }, // Scrolls to services section
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

  // Handle scroll event for sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = currentScrollPos < prevScrollPos;

      setIsVisible(isScrollingUp || currentScrollPos < 100);
      setIsSticky(currentScrollPos > 100);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Lock body scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [isMobileMenuOpen]);

  // Handle scroll to section
  const handleScrollToSection = (path) => {
    const sectionId = path.replace("#", ""); // Remove '#' from path
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    if (isMobileMenuOpen) {
      toggleMobileMenu(); // Close mobile menu after clicking
    }
  };

  return (
    <nav className="w-full relative mt-0 text-white text-sm z-50">
      {/* Desktop Navbar */}
      <div className="hidden md:flex md:flex-col ">
        <div className={`${isSticky ? "h-[35px]" : "h-0"}`}></div>
        <div
          className={`md:block w-full bg-blue-900 transition-transform duration-500 ${
            isSticky
              ? `fixed top-0 shadow-lg ${
                  isVisible ? "translate-y-0" : "-translate-y-full"
                }`
              : "relative"
          }`}
        >
          <ul className="hidden md:flex justify-center  w-full text-xs md:text-sm md:space-x-12 bg-blue-900 py-3">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer px-2 hover:text-gray-300"
                onClick={() => handleScrollToSection(item.path)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex flex-col">
        {/* Ads */}
        <div className="flex justify-center items-center h-10 bg-green-500 text-center">
          <div className="text-xs text-white font-semibold">
            Get the hottest news updates instantly! Follow us on WhatsApp.
          </div>
        </div>
        <div className="flex justify-center items-center h-16 bg-gray-200">
          <h1 className="text-gray-400 text-center">Ad Here</h1>
        </div>

        {/* Sticky Wrapper */}
        <div className={`${isSticky ? "h-[120px]" : "h-0"}`}></div>
        <div
          className={`w-full bg-white transition-transform duration-500 ${
            isSticky
              ? `fixed top-0 ${isVisible ? "translate-y-0" : "-translate-y-full"}`
              : "relative"
          }`}
        >
          {/* Hamburger Menu and Logo */}
          <div className="flex justify-between items-center px-4 py-3 bg-white">
            <div className="flex items-center p-1">
              <img src="/marcom.jpg" alt="Logo" className="h-8 w-auto" />
            </div>
            <button
              onClick={toggleMobileMenu}
              aria-label="Open mobile menu"
              className="text-2xl px-2 text-black"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Sliding Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-[75%] bg-white shadow-lg transform transition-transform duration-300 z-50 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            onClick={toggleMobileMenu}
            className="text-black p-4 absolute top-0 right-0"
          >
            ✕
          </button>
          <ul className="mt-16 px-6 text-black overflow-y-auto h-full">
            {menuItems.map((item, index) => (
              <li 
                key={index}
                className="py-2 font-medium"
                onClick={() => handleScrollToSection(item.path)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
/* eslint-enable */