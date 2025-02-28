/* eslint-disable */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import allNewsArticles from "../data/articles";
import MobileMenu from "./MobileMenuBar";
import menuItemsBase  from "../data/navbar_menu_items";
import DesktopMenuBar from "./DesktopMenuBar";

import nameToUrl from "../utils/nameToUrl";
import useFetchMetadata from "./hooks/useFetchMetadata";

const Navbar = () => {

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isSticky, setIsSticky] = useState(false); // Tracks scroll behavior
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

  // fetch and set categories and tags
  const [menuItems, setMenuItems] = useState(menuItemsBase);
  const { categories, tags, loading, error } = useFetchMetadata();

  useEffect(() => {
    if (!loading && !error) {
      const categoryItems = categories.map((cat) => ({
        label: cat.label,
        path: `/${cat.value}`,
        items: [],
      }));

      const tagItems = tags.map((tag) => ({
        label: tag.label,
        path: `/tags/${nameToUrl(tag.label)}`,
        items: [],
      }));

      // Inject categories and tags dynamically
      const updatedMenu = [...menuItems];

      // Add a "Categories" section
      updatedMenu.push({
        label: "Categories",
        path: "/categories",
        items: categoryItems,
      });
      
      // Add a "Tags" section
      updatedMenu.push({
        label: "Tags",
        path: "/tags",
        items: tagItems,
      });

      setMenuItems(updatedMenu);
    }
  }, [ loading, error]);

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


  // Handle search input change
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
  <nav className={`w-full relative mt-10 text-white text-sm z-50`}>

      {/* desktop navbar */}
      <div className="hidden md:flex md:flex-col">
        {/* desktop navbar*/}
        <div className="absolute top-0 left-0 w-full bg-white shadow-md">
          <div className="w-full max-w-[93rem] mx-auto">
          {/* Logo, Ads, and Search Bar */}
          <div className="flex justify-between items-center px-4 py-3">
            {/* Logo */}
            <div className="flex items-center p-1">
              <img
                src="/src/assets/images/pixpointLogo.png"
                alt="Logo"
                className="h-8 md:h-10 w-auto"
              />
            </div>

            {/* Ads Section */}
            <div className="p-2">
              <div className="bg-green-500 px-3 text-white flex items-center justify-center h-12 rounded-md">
                <p className="text-sm md:text-base text-center font-semibold">
                  Get the hottest news updates instantly! Follow us on WhatsApp.
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleChange}
                className="border text-black border-gray-300 px-4 py-1 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 text-xs text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Search
              </button>
            </form>
          </div>
        </div></div>

        {/* Desktop MenuBar */}
        {/* Placeholder (approximately nav's height) to prevent content jump when navbar is fixed */}
        <div
            className={` ${
              isSticky ? "h-[35px]" : "h-0"
            }`}
          >
        </div>
        <div
          className={`md:block w-full bg-blue-900 transition-transform duration-500 ${
            isSticky
              ? `fixed top-0 shadow-lg ${isVisible ? "translate-y-0 " : "-translate-y-full"}`
              : "relative top-[90px]"
          }`}
        >
          <DesktopMenuBar menuItems={menuItems}/>
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
      <div
            className={` ${
              isSticky ? "h-[120px]" : "h-0"
            }`}
          >
        </div>
      <div
        className={`w-full bg-white  transition-transform duration-500 ${
          isSticky
            ? `fixed top-0 ${isVisible ? "translate-y-0" : "-translate-y-full"}`
            : "relative"
        }`}
      >
        {/* Hamburger Menu and Logo */}
        <div className="flex justify-between items-center px-4 py-3 bg-white">
          {/* Logo */}
          <div className="flex items-center p-1">
            <img
              src="/src/assets/images/pixpointLogo.png"
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
        <div className="block bg-white px-4 py-2">
          <form className="flex" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleChange}
              className="border w-full mr-2 text-black border-gray-300 px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" aria-label="Search">
              <svg
                viewBox="0 0 24 24"
                className="bg-gray-200 p-2 w-10 h-10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Sliding Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
    </div>
      
    
    
  </nav>
);
};


export default Navbar;


