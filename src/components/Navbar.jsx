/* eslint-disable */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import allNewsArticles from "../data/articles";
import MobileMenu from "./MobileMenuBar";
import menuItems from "../data/navbar_menu_items";
import DesktopMenuBar from "./DesktopMenuBar";


// DropdownItem Component to handle nested items
const DropdownItem = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex justify-between items-center px-4 py-2 hover:bg-gray-200 cursor-pointer">
        <span className="block transition-transform transform duration-300 hover:translate-x-1">
          {label}
        </span>
        {items && (
          <svg
            className="w-4 h-4 ml-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </div>
      {isOpen && items && (
        <ul className="absolute left-full top-0 mt-0 bg-white text-left text-black shadow-lg overflow-visible z-50" style={{ minWidth: "10rem" }}>
          {items.map((item, idx) => (
            item.items ? (
              <DropdownItem key={idx} label={item.label} items={item.items} />
            ) : (
              <li key={idx} className="px-4 py-2 hover:bg-gray-200">
                <span className="block cursor-pointer transition-transform transform duration-300 hover:translate-x-1">
                  {item.label}
                </span>
              </li>
            )
          ))}
        </ul>
      )}
    </li>
  );
};

// Dropdown Component to handle primary menu items
const Dropdown = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <li
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex items-center cursor-pointer px-2 py-2 hover:text-gray-300">
        {label}
        <svg
          className="w-4 h-4 ml-4 rotate-90"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
      {isOpen && (
        <ul className="absolute left-0 top-full bg-white text-black shadow-lg overflow-visible z-50 w-auto whitespace-nowrap">
          {items.map((item, index) =>
            item.items.length > 0 ? (
              <DropdownItem key={index} label={item.label} items={item.items} />
            ) : (
              <li
                key={index}
                className="text-left px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate(item.path)} // Navigate to the path
              >
                <span className="block transition-transform transform duration-300 hover:translate-x-1">
                  {item.label}
                </span>
              </li>
            )
          )}
        </ul>
      )}
    </li>
  );
};

const Navbar = () => {

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };


  // Handle input change
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  //  Handle form submission (when Enter is pressed)
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload on form submit
    if (searchQuery.trim()) {
      navigate(`/search?title=${searchQuery}`); // Navigate with query parameter
    }
  };


return (
  <nav className="w-full text-white text-sm">
    <div className="flex flex-col bg-blue-900">
      {/* Top Section */}
      <div className="flex justify-between items-center px-4 py-3 bg-white shadow-md">
        {/* Logo */}
        <div className="flex items-center p-3 bg-gray-200">
          <img
            src="/src/assets/images/pixpointLogo.png"
            alt="Logo"
            className="h-10 w-auto"
          />
        </div>

        {/* Center Ads Section (Desktop) */}
        <div className="hidden md:flex p-2">
          <div className="bg-green-500 px-3 text-white flex items-center justify-center h-12 rounded-md">
            <p className="text-sm md:text-base text-center font-semibold">
              Get the hottest news updates instantly! Follow us on WhatsApp.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center space-x-2">
        <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleChange}
                  className="border mr-2 text-black border-gray-300  px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-xs text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Subscribe
                </button>
        </form>
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            aria-label="Open mobile menu"
            className="text-2xl px-2 text-black"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Ads Section */}
      <div className="block md:hidden bg-green-500 px-4 py-3 text-center">
        <p className="text-xs text-white font-semibold">
          Get the hottest news updates instantly! Follow us on WhatsApp.
        </p>
      </div>

      {/* Desktop Navbar Menu */}
      <DesktopMenuBar/>

    </div>

    {/* Mobile Sliding Menu */}
    <MobileMenu
      isOpen={isMobileMenuOpen}
      onClose={toggleMobileMenu}
    />

    {/* Mobile Search Bar */}
    <div className="block md:hidden bg-white px-4 py-2">
    <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleChange}
                  className="border w-full mr-2 text-black border-gray-300  px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
               
    </form>
    </div>
  </nav>
);
};


export default Navbar;
