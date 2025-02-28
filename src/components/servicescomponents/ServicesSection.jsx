/* eslint-disable */

import React from 'react'
import { useContext } from 'react';
import { ThemeContext } from '../../providers/ThemeContext';
import { motion } from "framer-motion"; 
import serviceData from '../../data/ServiceData';
import { useNavigate } from "react-router-dom";

const ServiceItem = ({id, title, text, svg }) => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  // const handleNavigation = () => {
  //   navigate(`/services/${id}`);
  // };

  const handleNavigation = () => {
    navigate(`/all-services#${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className={`flex flex-col w-full group cursor-pointer`}
      onClick={handleNavigation}
    >
     
      <div className={`flex  ${darkMode ? "group-hover:bg-white group-hover:text-black" : "group-hover:bg-main group-hover:text-white "} transition duration-300 items-center p-2`}>
        
      <span className='mr-5 w-14 h-14 '>{svg}</span> 
        <div className="flex flex-col items-start text-justify">
          <h3
            className={`text-sm sm:text-base md:text-lg lg:text-lg font-medium`}
          >
            {title}
          </h3>
          <p className="text-xs sm:text-sm md:text-base lg:text-base   ">{text}</p>
        </div>
      </div>

      <div className="h-0.5 w-full bg-gray-200 mb-8  "></div>
      
     
      
    </motion.div>
  );
};

const ServicesSection = () => {

  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <section id="services" class={`bg-gray-100 flex flex-col  justify-center  gap-2.5 px-2 sm:px-2 md:px-12    ${
            darkMode ? "bg-gray-900 text-white" : " text-black"}`}>
              <h2  class="text-md sm:text-xl md:text-2xl lg:text-2xl mt-12 self-center">Our Services</h2>
             
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-0 sm:gap-2 sm:p-2  md:gap-5 md:p-5  lg:gap-5 lg:p-5 text-center rounded-md">
                    
              {serviceData.map((item) => (
                      <ServiceItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        text={item.summarizedText}
                        svg={item.svg}
                      />
                ))}
    </div>
</section>

  )
}

export default ServicesSection