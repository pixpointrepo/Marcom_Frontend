/* eslint-disable */
import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../../providers/ThemeContext';
import { motion } from "framer-motion"; 
import serviceData from '../../data/ServiceData';
import { useNavigate } from "react-router-dom";

const ServiceItem = ({id, title, text, svg }) => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/all-services#${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`w-full cursor-pointer rounded-lg overflow-hidden shadow-md 
        ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}
      onClick={handleNavigation}
    >
      <div className="p-6 flex items-start space-x-4">
        <span className={`w-12 h-12 flex-shrink-0 p-2 rounded-full 
          ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-600'}`}>
          {svg}
        </span>
        <div className="flex-1">
          <h3 className={`text-lg font-semibold mb-2
            ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h3>
          <p className={`text-sm leading-relaxed
            ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {text}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <section 
      id="services" 
      className={`py-16 px-4 sm:px-6 md:px-12
        ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12
          ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Our Services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
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
      </div>
    </section>
  );
};

export default ServicesSection; 