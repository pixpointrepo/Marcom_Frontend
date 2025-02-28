import { useParams } from "react-router-dom";
import serviceData from '../../data/ServiceData'

import ServicesNavbar from "./ServicesNavabr";

const ServiceDetailsSection = () => {
  const { id } = useParams();

  // Find the selected service
  const selectedService = serviceData.find((item) => item.id === id);

  if (!selectedService) {
    return <p>Service not found.</p>;
  }

  return (
    <section className="p-10  mt-20 md:mt-14">
        
        <ServicesNavbar/>
        <div className="flex">
          <h1 className="text-2xl font-bold">{selectedService.title}</h1>
          <span className="mx-4 w-10 h-10 text-blue-500">{selectedService.svg}</span>
        </div>
        <p className="mt-4">{selectedService.text}</p>
      
    </section>
   
  );
};

export default ServiceDetailsSection;
