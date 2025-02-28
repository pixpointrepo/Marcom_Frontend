/* eslint-disable */

import { useContext } from "react";

import { ThemeContext } from "../../providers/ThemeContext";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Clients = () => {
  const images = import.meta.glob(
    "/public/servicesimages/clients/*.{png,jpg,jpeg,svg}"
  );
  const imagePaths = Object.keys(images);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="flex flex-col h-full items-center mt-2">
      <div className="overflow-hidden w-full py-32 md:py-6 px-0 md:px-32">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 200 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="flex flex-wrap justify-center gap-5"
        >
          {imagePaths.map((path, imgIndex) => (
            <div
              key={imgIndex}
              className="flex justify-center items-center bg-white bg-opacity-25 rounded-lg px-4 py-3"
            >
              <img
                src={path.replace("../assets", "/src/assets")}
                alt={`Client Logo ${imgIndex + 1}`}
                className="w-16 h-16 md:w-28 md:h-28  lg:h-34 lg:w-34 object-contain filter brightness-0 invert "
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const ServicesClientSection = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <section
      id="clients"
      className={` flex flex-col md:h-[100vh] lg:h-fit px-10 py-12 md:py-12 justify-center items-center   font-montserrat  ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-gradient-to-br from-blue-600 via-purple-800 to-[#D580A0] text-white "
      }`}
    >
      <h1 className="text-md sm:text-xl md:text-2xl lg:text-2xl mt-4 ">
        Our Clients
      </h1>
      <Clients />
    </section>
  );
};

export default ServicesClientSection;
