/* eslint-disable */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import menuItems from "../data/navbar_menu_items";

const MobileMenu = ({ isOpen, onClose }) => {
    const [openMenus, setOpenMenus] = useState({});
  
    // Lock body scrolling when the menu is open
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => (document.body.style.overflow = "");
    }, [isOpen]);
  
    // Toggle the submenu for a specific label
    const toggleMenu = (label) => {
      setOpenMenus((prevState) => ({
        ...prevState,
        [label]: !prevState[label],
      }));
    };
  
    // Render menu items recursively
    const renderMenuItems = (items, level = 0) => {
      return items.map((item, index) => (
        <li key={index} className={`py-2 pl-${level * 4} relative`}>
          <div
            className="flex justify-between items-center cursor-pointer font-medium"
            onClick={() => {
              if (item.path && (!item.items || item.items.length === 0)) {
                // Navigate directly to the path if no submenus
                onClose(); // Close menu when navigating
                window.location.href = item.path; // Perform navigation
              } else if (item.items && item.items.length > 0) {
                // Toggle dropdown for items with submenus
                toggleMenu(item.label);
              }
            }}
          >
            <span>{item.label}</span>
            {item.items && item.items.length > 0 && (
              <span className="ml-2">
                {openMenus[item.label] ? "−" : "+"} {/* Toggle indicator */}
              </span>
            )}
          </div>
          {item.items && item.items.length > 0 && openMenus[item.label] && (
            <ul className="pl-4 mt-2 border-l border-gray-300">
              {renderMenuItems(item.items, level + 1)}
            </ul>
          )}
        </li>
      ));
    };
  
    return (
      <div
        className={`fixed top-0 right-0 h-full w-[75%] bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-black p-4 absolute top-0 right-0"
        >
          ✕
        </button>
  
        {/* Scrollable Menu Container */}
        <ul className="mt-16 px-6 text-black overflow-y-auto h-full">
          {renderMenuItems(menuItems)}
        </ul>
      </div>
    );
  };
  
  export default MobileMenu;