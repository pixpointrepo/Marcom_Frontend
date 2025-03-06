/* eslint-disable */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import allNewsArticles from "../data/articles";
import MobileMenu from "./MobileMenuBar";
import menuItemsBase from "../data/navbar_menu_items";
import DesktopMenuBar from "./DesktopMenuBar";
import SearchBar from "./SearchBar";

import nameToUrl from "../utils/nameToUrl";
import useFetchMetadata from "./hooks/useFetchMetadata";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isSticky, setIsSticky] = useState(false); // Tracks scroll behavior
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

  // fetch and set categories and tags
  const [menuItems, setMenuItems] = useState(menuItemsBase);
  const { categories, tags, loading, error } = useFetchMetadata();

  useEffect(() => {
    // Inject categories and tags dynamically into the menu

    if (!loading && !error) {
      const categoryItems = categories.map((cat) => ({
        label: cat.label,
        path: `/categories/${cat.value}`,
        items: [],
      }));

      const tagItems = tags.map((tag) => ({
        label: tag.label,
        path: `/tags/${nameToUrl(tag.label)}`,
        items: [],
      }));

      const updatedMenu = menuItems.map((menuItem) => {
        if (menuItem.label === "Categories") {
          return { ...menuItem, items: categoryItems };
        }
        if (menuItem.label === "Tags") {
          return { ...menuItem, items: tagItems };
        }
        return menuItem;
      });

      setMenuItems(updatedMenu);
    }
  }, [loading, error]);

  // handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = currentScrollPos < prevScrollPos;

      setIsVisible(isScrollingUp || currentScrollPos < 100); // Always show menubar near the top
      // Add stickiness logic to the desktop menubar and mobile menu div when scrolled to the top
      setIsSticky(currentScrollPos > 100);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]); //useEffect is called whenever the dependency 'prevScrollPos' is changed.

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };


  return (
    <nav className={`w-full relative mt-0 text-white text-sm z-50`}>
      {/* desktop navbar */}
      <div className="hidden md:flex md:flex-col">

        {/* Desktop MenuBar */}
        {/* Placeholder (approximately nav's height) to prevent content jump when navbar is fixed */}
        <div className={` ${isSticky ? "h-[35px]" : "h-0"}`}></div>
        <div
          className={`md:block w-full bg-blue-900 transition-transform duration-500 ${
            isSticky
              ? `fixed top-0 shadow-lg ${
                  isVisible ? "translate-y-0 " : "-translate-y-full"
                }`
              : "relative"
          }`}
        >
          <DesktopMenuBar menuItems={menuItems} />
        </div>
      </div>

      {/* mobile navbar */}
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
        {/* Placeholder (approximately wrapper's height) to prevent content jump when navbar is fixed */}
        <div className={` ${isSticky ? "h-[120px]" : "h-0"}`}></div>
        <div
          className={`w-full bg-white  transition-transform duration-500 ${
            isSticky
              ? `fixed top-0 ${
                  isVisible ? "translate-y-0" : "-translate-y-full"
                }`
              : "relative"
          }`}
        >
          {/* Hamburger Menu and Logo */}
          <div className="flex justify-between items-center px-4 py-3 bg-white">
            {/* Logo */}
            <div className="flex items-center p-1">
              <img
               src="/marcom.jpg"
                alt="Logo"
                className="h-8 w-auto"
              />
            </div>

            {/* Hamburger Icon */}
            <button
              onClick={toggleMobileMenu}
              aria-label="Open mobile menu"
              className="text-2xl px-2 text-black"
            >
              ☰
            </button>
          </div>

          {/* Search Div */}
          <SearchBar isDesktop={false} />

        </div>

        {/* Mobile Sliding Menu */}
        <MobileMenu menuItems={menuItems} isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
      </div>
    </nav>
  );
};

export default Navbar;
