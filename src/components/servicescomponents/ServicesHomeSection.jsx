/* eslint-disable */

import { TypeAnimation } from "react-type-animation";
import { useContext } from "react";

import { ThemeContext } from "../../providers/ThemeContext";

import { Parallax } from "react-parallax";

const ContactAvatar = ({ svgItem }) => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  return (
    <a
      href="#"
      class={`h-fit w-fit text-secondary ring-2 ${
        darkMode
          ? "ring-black hover:ring-gray-300"
          : "ring-white hover:text-red-100  hover:bg-main"
      } bg-black bg-opacity-35  rounded-full p-2 m-4 hover:ring-2  duration-300`}
    >
      {svgItem}
    </a>
  );
};

const ServicesHomeSection = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <Parallax
      strength={200}
      style={{
        height: "100vh",
      }}
    >
      {/* bg-gradient-to-br from-blue-600 via-purple-800 to-red-600 */}
      <section
        id="home"
        className={` bg-gradient-to-br from-blue-500  to-white justify-between gap-2.5 h-[100vh] px-4 sm:px-10 md:px-16 lg:px-20  ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        <div className="absolute flex bottom-10 left-1/2 transform -translate-x-1/2 sm:flex-col md:flex-col lg:flex-col sm:bottom-44 md:bottom-44 lg:bottom-44 sm:right-[15px] md:right-[15px] lg:right-[15px] lg:left-auto lg:transform-none">
          <ContactAvatar
            svgItem={
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                  fill="currentColor"
                />
                <path
                  d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                  fill="currentColor"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                  fill="currentColor"
                />
              </svg>
            }
          />
          <ContactAvatar
            svgItem={
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z"
                  fill="currentColor"
                />
                <path
                  d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z"
                  fill="currentColor"
                />
                <path
                  d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z"
                  fill="currentColor"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z"
                  fill="currentColor"
                />
              </svg>
            }
          />
          <ContactAvatar
            svgItem={
              <svg
                width="25"
                height="25"
                fill="currentColor"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 300 300.251"
              >
                <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66" />
              </svg>
            }
          />
        </div>

        <div className=" flex flex-col absolute top-1/2  transform  -translate-y-1/2  bg-black bg-opacity-25 w-[90%] sm:w-[60%] md:w-[40%]  p-8 rounded-3xl shadow-[2px_2px_8px_rgba(255,255,255,0.25)]">
          <h1 className={`text-2xl text-white`}>
            We Market
            <br />
            Your Ideas At <span className="text-secondary"> Best</span>
            <br />
            <span className="inline-block mt-4 text-2xl   font-medium ">
              {" "}
              We offer our expertise in:{" "}
            </span>
            <br />
            <span
              className={`font-montserrat text-xl sm:text-3xl md:text-3xl lg:text-3xl  font-medium text-secondary `}
            >
              <TypeAnimation
                sequence={[
                  "Branding",
                  1000,
                  "Marketing",
                  1000,
                  "Tech Solutions",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </h1>
          <a
            href="#home"
            className="text-md  text-white hover:bg-secondary  transition duration-300 bg-black rounded-full px-3 py-2 w-fit mt-3 self-start"
          >
            Contact Us
          </a>
        </div>

        <div className="text-right text-md md:text-xl font-medium absolute bottom-32 md:bottom-10 right-10 bg-gradient-to-r from-purple-800 to-main bg-clip-text text-transparent">
          <p>
            "Empowering brands to lead, inspire, and innovate{" "}
            <span className="hidden md:inline">
              {" "}
              <br />{" "}
            </span>{" "}
            with strategies that leave a lasting impact."
          </p>
        </div>
      </section>
    </Parallax>
  );
};

export default ServicesHomeSection;
