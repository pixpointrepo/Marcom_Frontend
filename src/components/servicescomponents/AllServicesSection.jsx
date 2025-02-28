import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import serviceData from "../../data/ServiceData";





const AllServicesSection = () => {
  const location = useLocation();
  const serviceRefs = useRef({}); // Store refs for each service dynamically

  useEffect(() => {
    // Scroll to the service if a hash is present in the URL
    if (location.hash) {
      const targetId = location.hash.replace("#", ""); 
      const targetElement = serviceRefs.current[targetId];
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
        targetElement.classList.add("border-blue-500");
        setTimeout(() => {
          targetElement.classList.remove("border-blue-500");
        }, 2000);
      }
    }
  }, [location.hash]);

  return (
    <section id="all-services" className="py-10 md:py-2 ">
     
        <div className="p-2 md:p-6 flex flex-col items-center space-y-8">
        
        <h2  className="text-md sm:text-xl md:text-2xl lg:text-2xl mt-10 md:mt-8 self-center ">All Services</h2>
        {serviceData.map((service) => (
        <div
          key={service.id}
          id={service.id}
          ref={(el) => (serviceRefs.current[service.id] = el)} 
          className="w-full max-w-4xl flex flex-col items-center border rounded-lg p-6 hover:shadow-lg transition duration-300 space-y-4"
        >
          
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
          
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-base mb-4">{service.summarizedText}</p>
          </div>
          
          <ul className="list-disc list-inside text-justtify">
            {service.points.map((point, index) => {
              // Safe check to ensure point.title is defined and is a string
              if (!point.title || typeof point.title !== "string") {
                return null;
              }

              const [pointTitle, pointDescription] = point.title.split(":"); // Split the title and description
              return (
                <li key={index} className="mb-2 text-justify">
                  <span className="font-bold">{pointTitle.trim()}</span>
                  {pointDescription && (
                    <span className=" ">: {pointDescription.trim()}</span>
                  )}
                  {point.subpoints && (
                    <ul className="list-disc list-inside ml-4  ">
                      {point.subpoints.map((subpoint, subIndex) => {
                        // Split subpoints into title and description (if applicable)
                        const [subpointTitle, subpointDescription] = subpoint.split(":");
                        return (
                          <li key={subIndex} className="mb-1">
                            <span className="font-medium ">{subpointTitle.trim()}</span>
                            {subpointDescription && (
                              <span className="text-justify">: {subpointDescription.trim()}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
        </div>
    </section>
  );
};

export default AllServicesSection;
