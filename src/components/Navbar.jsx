/* eslint-disable */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import allArticles from "../data/articles";


const DropdownItem = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex justify-between items-center px-4 py-2 hover:bg-gray-200 cursor-pointer">
        <span className=" block transition-transform transform duration-300  hover:translate-x-1">
          {label}
        </span>
        {children && (
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
      {isOpen && children && (
        <ul
          className="absolute left-full top-0 mt-0 bg-white text-left text-black shadow-lg overflow-visible z-50"
          style={{ minWidth: "10rem" }}
        >
          {children}
        </ul>
      )}
    </li>
  );
};

const Dropdown = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // navigate to the categories page
  const handleCategorySelect = (category) => {
    const formattedCategory = category.toLowerCase().replace(/ /g, "-");
    navigate(`/${formattedCategory}`);
  };

  return (
    <li
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex  items-center cursor-pointer px-2 py-2 hover:text-gray-300">
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
        <ul
           className="absolute left-0 top-full bg-white text-black shadow-lg overflow-visible z-50 w-auto whitespace-nowrap"
          
        >
          {items.map((item, index) =>
            item.children ? (
              <DropdownItem key={index} label={item.label}>
                {item.children.map((child, idx) => (
                  <li key={idx} className="px-4 py-2 hover:bg-gray-200">
                    <span className="block cursor-pointer transition-transform transform duration-300  hover:translate-x-1">
                      {child.label}
                    </span>
                  </li>
                ))}
              </DropdownItem>
            ) : (
              <li
              key={index}
              className="text-left px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              <span className="block transition-transform transform duration-300  hover:translate-x-1" onClick={()=> handleCategorySelect(item.label)}>
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

  const newsCategories = Object.values(allArticles).map((categoryData) => ({
    label: categoryData.category,
    urlSlug: categoryData.urlSlug,
  }));
  
  const newsCategoryItems = newsCategories.map((category) => ({
    label: category.label,
  }));

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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


  const handleDropdownClick = (label) => {
    switch (label.toLowerCase()) {
      case "home":
        navigate("/");
        break;
      default:
        console.log("Unknown label:", label);
        break;
    }
  };

  const menuItems = [
    {
        label: "Home",
        items:[]
    },
    {
      label: "News",
      items: newsCategoryItems
    },
    { label: "Articles", items: [
        { label: "Interviews" },
        { label: "Points of View", },
        { label: "Profiles" },
        { label: "Guest Articles" },
        { label: "Marketing Initiative" ,
          children: [
            { label: "Advertorial" },
          ],
        },
    ] },
    { label: "Media", items: [
        { label: "Television" },
        { label: "Digital", },
        { label: "OTT Streaming" },
        { label: "Social Media" },
        { label: "Print" },
        { label: "OOH" },
        { label: "Radio" },
        { label: "Cinema" },
        
    ] },
    { label: "Events", items: [
        { label: "Dashboard" },
        { label: "Roundtable",
          children:[
            {label: "Future Finance"},
            {label: "MGID Roundtable"},
            {label: "Adobe Creative Minds"},

          ]
        },
        { label: "Webinar",
          children:[
            {label: "Gen AI-Masterclass"},
            {label: "Communicon"},
            {label: "Marketing Through Leaders"},

          ]
        },
    ] },
    { label: "More", items: [
        
        {
          label: "Creative Showcase",
          children: [
            { label: "Television" },
            { label: "Digital" },
            { label: "OOH" },
            { label: "Print" },
            { label: "Radio" },
            { label: "International" },
            
          ],
        },
        { label: "Authors" },
        { label: "Contact Us" },
    ] },
  ];

  return (
    <nav className="w-full  text-white text-sm">
      <div className="w-full flex flex-col justify-center items-center relative overflow-visible">
          <div className="flex w-full items-center justify-between bg-white shadow-md px-6 py-2">
            {/* Logo Section */}
            <div className="flex items-center p-3 bg-gray-200">
              <img
                src="/src/assets/images/pixpointLogo.png" // Replace with logo URL
                alt="Logo"
                className="h-10 w-auto "
              />
            </div>

            {/* Center Ad Section */}
            <div className="flex p-2">
              <div className="bg-green-500 px-3 text-white flex items-center justify-center h-12 rounded-md">
                <p className="text-sm md:text-base text-center font-semibold">
                  Get the hottest news updates instantly! Follow us on WhatsApp.
                </p>
              </div>
            </div>

            {/* Search Bar Section */}
            <div className="flex items-center space-x-2">
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
          </div>
          {/* navbar section */}
          <ul className=" flex justify-center w-full space-x-6 bg-blue-900">
            {menuItems.map((menu, index) =>
              menu.items.length ? (
                <Dropdown key={index} label={menu.label} items={menu.items} />
              ) : (
                <li key={index} className="cursor-pointer px-2 py-2" onClick={()=>handleDropdownClick(menu.label)}>
                  {menu.label}
                </li>
              )
            )}
          </ul>
      </div>
  </nav>
  );
};


export default Navbar;
