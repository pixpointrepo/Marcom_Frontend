// import React from 'react'
/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import logo from "/marcom.jpg";
import platformSvgs from './svgs';

const Footer = () => {
  return (
    <footer className="bg-[#1E3A8A] text-gray-300 text-sm pt-5 px-5">
      <div className="flex flex-col max-w-7xl 3xl:max-w-8xl mx-auto w-full">
        <div className="max-w-7xl px-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-2">
          <div>
            <img src={logo} className="h-12 ml-3 my-4" alt="" />
            <h1 className="self-start mb-1 text-primary">
              Telephone: <span className="text-white font-light">+977 01 4594371</span>
            </h1>
            <h1 className="self-start mb-1 text-primary">
              Address: <span className="text-white font-light">Old Baneshwor, Kathmandu, Nepal</span>
            </h1>
            <h1 className="self-start mb-1 text-primary">
              Email: <span className="text-white font-light">info@pixpoint.com.np</span>
            </h1>
            
            <h4 className="text-lg font-semibold my-4 text-primary">Follow Us</h4>
            <div className="flex gap-4">
              {platformSvgs.map((platform, index) => (
                <Link
                  key={index}
                  to={`/${platform.name.toLowerCase()}`}
                  className="w-10 h-10 flex justify-center items-center bg-gray-200 rounded-full hover:bg-white text-[#1E3A8A] transition-all duration-300 transform hover:-translate-y-1"
                >
                  {platform.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Company</h4>
            <ul className="space-y-1">
              {[
                { text: "About Us", path: "/about-us" },
                { text: "Our Services", path: "/services" },
                { text: "Privacy Policy", path: "/privacy" },
                { text: "Affiliate Program", path: "/affiliate" }
              ].map((item, index) => (
                <li key={index} className="group transition-all duration-300 relative">
                  <Link to={item.path}>
                    <span className="inline-block relative transform group-hover:translate-x-2 group-hover:text-primary transition-all duration-300 px-2 py-1 rounded cursor-pointer before:content-['►'] before:absolute before:left-[-20px] before:opacity-0 group-hover:before:opacity-100 group-hover:before:left-[-28px] before:transition-all before:duration-75">
                      {item.text}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Quick Links</h4>
            <ul className="space-y-1">
              {[
                { text: "Events", path: "/events/dashboard" },
                { text: "Roundtable", path: "/events/roundtable/pixpoint" },
                { text: "Webinar", path: "/events/webinar" },
                { text: "Contact", path: "/contact-us" }
              ].map((item, index) => (
                <li key={index} className="group transition-all duration-300 relative">
                  <Link to={item.path}>
                    <span className="inline-block relative transform group-hover:translate-x-2 group-hover:text-primary transition-all duration-300 px-2 py-1 rounded cursor-pointer before:content-['►'] before:absolute before:left-[-20px] before:opacity-0 group-hover:before:opacity-100 group-hover:before:left-[-28px] before:transition-all before:duration-75">
                      {item.text}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Services</h4>
            <ul className="space-y-1">
              {[
                { text: "Web Development", path: "/services#development" },
                { text: "Data Analytics", path: "/services#data_analytics" },
                { text: "Digital Marketing", path: "/services#marketing" },
                { text: "Branding", path: "/services#branding" }
              ].map((item, index) => (
                <li key={index} className="group transition-all duration-300 relative">
                  <Link to={item.path}>
                    <span className="inline-block relative transform group-hover:translate-x-2 group-hover:text-primary transition-all duration-300 px-2 py-1 rounded cursor-pointer before:content-['►'] before:absolute before:left-[-20px] before:opacity-0 group-hover:before:opacity-100 group-hover:before:left-[-28px] before:transition-all before:duration-75">
                      {item.text}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-md self-center mt-10 mb-2">
          © 2024 Pixpoint Solutions Pvt. Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;