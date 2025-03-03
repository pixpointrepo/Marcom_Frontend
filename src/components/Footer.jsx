// import React from 'react'

/* eslint-disable */


import React from "react";
import logo from "/marcom.jpg";
import platformSvgs from './svgs';



const Footer = () => {
  return (
    <footer className=" bg-[#1E3A8A] text-gray-300 text-sm pt-5 px- 5">
        <div className="flex flex-col max-w-7xl 3xl:max-w-8xl mx-auto w-full" >

              <div className="max-w-7xl  px-6  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-2">
              
              <div>
                
                <img src={logo} className="h-12 ml-3 my-4 " alt="" />
                <h1 className=" self-start mb-1 text-secondary"> Telephone: <span className=" text-white font-light">+977 01 4594371</span>  </h1>
                <h1 className=" self-start mb-1 text-secondary"> Address: <span className="text-white font-light">Old Baneshwor, Kathmandu, Nepal</span>  </h1>
                <h1 className=" self-start mb-1 text-secondary"> Email: <span className="text-white font-light">info@pixpoint.com.np</span>  </h1>
                
                <h4 className="text-lg font-semibold my-4 text-secondary">Follow Us</h4>
                <div className="flex gap-4">
                  {platformSvgs.map((platform, index) => (
                    <a
                      key={index}
                      href={`#${platform.name}`}
                      className="w-10 h-10 flex justify-center items-center bg-gray-200 rounded-full hover:bg-secondary text-[#1E3A8A]  transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {platform.icon}
                    </a>
                  ))}
                </div>
                
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-secondary">Company</h4>
                <ul className="space-y-1">
                  {["About Us", "Our Services", "Privacy Policy", "Affiliate Program"].map((item, index) => (
                    <li
                      key={index}
                      className="group transition-all duration-300 relative"
                    >
                      <span
                        className="inline-block relative transform group-hover:translate-x-2 group-hover:text-secondary transition-all duration-300 px-2 py-1 rounded cursor-pointer before:content-['►'] before:absolute before:left-[-20px] before:opacity-0 group-hover:before:opacity-100 group-hover:before:left-[-28px] before:transition-all before:duration-75"
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-secondary">Quick Links</h4>
                <ul className="space-y-1">
                  {["FAQ", "Account", "Data Policies", "Location", "Contact"].map((item, index) => (
                    <li
                      key={index}
                      className="group transition-all duration-300 relative"
                    >
                        <span
                        className="inline-block relative transform group-hover:translate-x-2 group-hover:text-secondary transition-all duration-300 px-2 py-1 rounded cursor-pointer before:content-['►'] before:absolute before:left-[-20px] before:opacity-0 group-hover:before:opacity-100 group-hover:before:left-[-28px] before:transition-all before:duration-75"
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-secondary">Services</h4>
                <ul className="space-y-1">
                  {["Web Development", "Data Analytics", "SEO", "Digital Marketing", "Advertising"].map((item, index) => (
                    <li
                      key={index}
                      className="group transition-all duration-300 relative"
                    >
                        <span
                        className="inline-block relative transform group-hover:translate-x-2 group-hover:text-secondary transition-all duration-300 px-2 py-1 rounded cursor-pointer before:content-['►'] before:absolute before:left-[-20px] before:opacity-0 group-hover:before:opacity-100 group-hover:before:left-[-28px] before:transition-all before:duration-75"
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              
              
            </div>
                <p className="text-md self-center mt-10 mb-2 ">&copy; 2024 Pixpoint Solutions Pvt. Ltd. All rights reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;
