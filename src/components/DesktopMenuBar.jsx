/* eslint-disable */

import menuItems from "../data/navbar_menu_items";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


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

const DesktopMenuBar = () => {
  return (
    <ul className="hidden md:flex justify-center w-full text-xs md:text-sm md:space-x-10 bg-blue-900">
    {menuItems.map((menu, index) =>
      menu.items.length ? (
        <Dropdown key={index} label={menu.label} items={menu.items} />
      ) : (
        <li
          key={index}
          className="cursor-pointer px-2 py-2"
          onClick={() => navigate(menu.path)}
        >
          {menu.label}
        </li>
      )
    )}
  </ul>
  )
}

export default DesktopMenuBar