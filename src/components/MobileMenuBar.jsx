/* eslint-disable */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const MobileMenu = ({ menuItems, isOpen, onClose }) => {
  const [openMenus, setOpenMenus] = useState({});
  const [showAllItems, setShowAllItems] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  const toggleMenu = (label) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  const toggleShowAll = (label) => {
    setShowAllItems((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  const renderMenuItems = (items, level = 0) => {
    const shouldShowSeeMore = level > 0 && items.length > 10;
    const visibleItems = shouldShowSeeMore && !showAllItems[`level-${level}`] 
      ? items.slice(0, 10) 
      : items;

    return (
      <>
        {visibleItems.map((item, index) => (
          <li key={index} className={`py-2 pl-${level * 4} relative`}>
            <div
              className="flex justify-between items-center cursor-pointer font-medium"
              onClick={() => {
                if (item.path && (!item.items || item.items.length === 0)) {
                  onClose();
                  window.location.href = item.path;
                } else if (item.items && item.items.length > 0) {
                  toggleMenu(item.label);
                }
              }}
            >
              <span>{item.label}</span>
              {item.items && item.items.length > 0 && (
                <span className="ml-2">
                  {openMenus[item.label] ? "−" : "+"}
                </span>
              )}
            </div>
            {item.items && item.items.length > 0 && openMenus[item.label] && (
              <ul className="pl-4 mt-2 border-l border-gray-300">
                {renderMenuItems(item.items, level + 1)}
              </ul>
            )}
          </li>
        ))}
        {shouldShowSeeMore && (
          <li className={`py-2 pl-${level * 4} relative`}>
            <div
              className="flex justify-between items-center cursor-pointer font-medium text-blue-600"
              onClick={() => toggleShowAll(`level-${level}`)}
            >
              <span>{showAllItems[`level-${level}`] ? "See Less" : "See More"}</span>
            </div>
          </li>
        )}
      </>
    );
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[75%] bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={onClose}
        className="text-black p-4 absolute top-0 right-0"
      >
        ✕
      </button>
      <ul className="mt-16 px-6 text-black overflow-y-auto h-full">
        {renderMenuItems(menuItems)}
      </ul>
    </div>
  );
};

export default MobileMenu;