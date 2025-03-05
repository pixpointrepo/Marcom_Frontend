/* eslint-disable */

// import React from 'react';
import { useContext, useState } from "react";
import { ThemeContext } from "../../providers/ThemeContext";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import LeafletMap from "./LeafletMap";
import SuccessModal from "./SuccessModal";
// E:\lrn\X course\Website DX\Project class\react-practice\pixpoint\src\components\LeafletMap.jsx

import { submitForm } from "../../services/api";


const SlidingImages = ({ imageSrcs }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="relative h-[40%] w-full flex justify-center items-start mb-5 ">
      {imageSrcs.map((src, index) => {
        // Define size and position based on index
        const size = index === 0 ? "h-16 sm:h-16 md:h-24 lg:h-28" : index === 2 ? "h-28 sm:h-28 md:h-36 lg:h-40" : "h-32 sm:h-32 md:h-40 lg:h-44";
        const position =
          index === 0
            ? "left-20 top-0.1 sm:left-4 sm:top-0.1 md:left-4 md:top-0.1 lg:left-20 lg:top-0.1 "
            : index === 1
            ? "left-0.9 top-1/4 sm:left-0.9 sm:top-1/4 md:left-0.9 md:top-1/4  lg:left-0.9 lg:top-1/4 "
            : "right-20 top-0.1 sm:right-4 sm:top-0.1 md:right-4 md:top-0.1 lg:right-20 lg:top-0.1 ";

        // Animation variants based on index
        const animationVariants = {
          hidden: {
            opacity: 0,
            x: index === 0 ? -100 : index === 2 ? 100 : 0,
            y: index === 1 ? 100 : 0,
          },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration: 1, ease: "easeOut", delay: index * 0.2 },
          },
        };

        return (
          <motion.div
            ref={ref}
            key={index}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={animationVariants}
            className={`absolute ${position} `}
          >
            <img
              src={src}
              alt={`Image ${index + 1}`}
              className={`object-cover rounded-lg shadow-md ${size} `}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

const FormComponent = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [isChecked, setIsChecked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  // State for form fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Handle change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if(!isChecked){
      setSuccessMessage("Please agree to the terms and conditions before proceeding.");
      setIsModalVisible(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Send form data to PHP backend using fetch
      const response = await submitForm(formData);

      if (response.status !== 201) {
        throw new Error('Form submission failed');
      }

      setSuccessMessage("Your inquiry has been successfully delivered. Thank you!");
      setIsModalVisible(true);

      setIsSubmitting(false);
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        description: ''
      });
    } catch (error) {
      setIsSubmitting(false);
      setError(error.message);
    }
  };


  return ( 
  <>
    <form onSubmit={handleSubmit} className="space-y-2 mt-5 text-xs sm:text-sm md:text-base lg:text-base">
      <input
        type="text"
        id="full-name"
        name="fullName" 
        required
        value={formData.fullName} 
        onChange={handleInputChange} 
        className={`w-full mt-2 p-2 border rounded-lg focus:ring-2 ${
          darkMode
            ? "border-gray-600 bg-gray-700 focus:ring-gray-500 text-white"
            : "border-gray-300 focus:ring-blue-500"
        }`}
        placeholder="Your Full Name"
      />
      <input
        type="email"
        id="email"
        name="email"
        required
        value={formData.email} 
        onChange={handleInputChange} 
        className={`w-full mt-2 p-2 border rounded-lg focus:ring-2 ${
          darkMode
            ? "border-gray-600 bg-gray-700 focus:ring-gray-500 text-white"
            : "border-gray-300 focus:ring-blue-500"
        }`}
        placeholder="Your Email Address"
      />
      <input
        type="text"
        id="subject"
        name="subject"
        required
        value={formData.subject}
        onChange={handleInputChange} 
        className={`w-full mt-2 p-2 border rounded-lg focus:ring-2 ${
          darkMode
            ? "border-gray-600 bg-gray-700 focus:ring-gray-500 text-white"
            : "border-gray-300 focus:ring-blue-500"
        }`}
        placeholder="Subject of Your Inquiry"
      />
      <div className="flex flex-col">
        <label htmlFor="project-description" className="text-md font-medium text-gray-600">
          Tell us more about your content *
        </label>
        <textarea
          id="project-description"
          name="description" 
          required
          value={formData.description} 
          rows={3}
          onChange={handleInputChange} 
          className={`w-full mt-3 p-3 border rounded-lg focus:ring-2 ${
            darkMode
              ? "border-gray-600 bg-gray-700 focus:ring-gray-500 text-white"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="Please provide details about your idea..."
        ></textarea>
      </div>
      <div className="flex items-center">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-12 mr-2"
          />
          <label htmlFor="agree-to-terms" className="text-xs sm:text-sm md:text-base lg:text-base font-light text-black text-justify">
             I agree to the terms, conditions and privacy policy.
          </label>

      </div>
      <button className=" text-md px-4 py-2 bg-[#1E3A8A] text-white rounded-full hover:bg-blue-600  focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Send Message'}
      </button>

    </form>

    {error && <p>{error}</p>}
    
    {/* success message */}

    {isModalVisible && (
      <SuccessModal
        message={successMessage}
        onClose={() => setIsModalVisible(false)}
      />
    )}
        
    </>
  );
};



const ServicesContactSection = () => {

  const imageSrcs = [
    '/servicesimages/contact images/group.jpg',
    '/servicesimages/contact images/phone.jpg',
    '/servicesimages/contact images/user.jpg',
  ];
  
  const {darkMode, setDarkMode} = useContext(ThemeContext);
  return (
    <section
  id="contact"
  className={`font-montserrath-full px-4 sm:px-4 md:px-10 lg:px-12 py-10 ${
    darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
  }`}
>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2">
    
    {/* Col 1 */}
    <div className="justify-start items-center px-0 sm:px-4 md:px-10 lg:px-10  min-h-[400px]  ">
    <SlidingImages imageSrcs={imageSrcs} />

    <div className="bg-gray-100 w-full h-[53%] p-3 rounded-xl shadow-[-4px_4px_12px_rgba(0,0,0,0.25)]">
          <h1 className="text-md sm:text-xl md:text-2xl lg:text-2xl font-medium mb-4 self-start ">Directions</h1>
          <LeafletMap/>
        </div>
    </div>

    {/* Col 2 */}
    <div>
      <div
        className={`${
          darkMode ? "bg-gray-900 " : "bg-white "
        } w-[100%] sm:w-[95%] md:w-[85%] lg:w-[85%] px-2 sm:px-4 md:px-10 lg:px-10 py-4 rounded-xl`}
      >
        <h1
          className={`text-md sm:text-xl md:text-2xl lg:text-2xl font-medium ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Let's Connect
        </h1>
        <p className="text-xs sm:text-sm md:text-base lg:text-base mt-4">
          We're here to help you find the right products for your business. Tell us a bit about yourself, and we'll be in touch.
        </p>

        <FormComponent />
      </div>
    </div>
  </div>
</section>
  
  );
};

export default ServicesContactSection;
