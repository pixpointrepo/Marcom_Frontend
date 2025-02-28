/* eslint-disable */


// import innovativeImage from '../../assets/servicesimages/methodology images/innovative.jpg';
// import strategicImage from '../../assets/servicesimages/methodology images/strategic.jpg';
// import ideaImage from '../../assets/servicesimages/methodology images/strategic.jpg';


import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";





const ImageTextRow = ({ imageSrc, title, subtitle, text, isAlternate }) => {
  // Detect when the component is in view
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  // threshold 2: only start animation when 20% of content is visible

  // Animation variants
  const variants = {
    hidden: { opacity: 0, x: isAlternate ? -100 : 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.div
      ref={ref} // Attach the ref for intersection detection
      variants={variants} // Define animation variants
      initial="hidden"
      animate={inView ? "visible" : "hidden"} // Trigger animation based on `inView`
      className={`flex  ${isAlternate ? "flex-row-reverse" : "flex-row"} items-center gap-2 sm:gap-4 md:gap-6 lg:gap-6 py-6 `}
      
    >
      {/* Image Section */}
     
      
      <div className="w-1/6 ">
        <img
          src={imageSrc}
          alt={title}
          className={`h-12 w-12 sm:h-16 sm:w-16 md:h-24 md:w-24 lg:h-36 lg:w-36 object-cover rounded-full ${isAlternate? 'shadow-[4px_4px_12px_rgba(0,0,0,0.25)]': 'shadow-[-4px_4px_12px_rgba(0,0,0,0.25)] '}`}
        />
      </div>

     
      {/* Text Section */}
      <div className="w-5/6">
       <div className="flex flex-col ">
          <h2 className="text-main font-medium text-xs  md:text-base  mb-2">{subtitle}</h2>
          <h2 className="text-sm md:text-lg lg:text-lg font-medium mb-2">{title}</h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-base   text-justify text-gray-700">{text}</p>
       </div>
      </div>
    </motion.div>
  );
};


const ServicesMethodologySection = ()=>{
 return(
  <section id='methodology'>
      <div className="flex flex-col items-center py-2 px-6 sm:px-8 md:px-10 lg:px-40 overflow-x-hidden bg-white">

      <h1 className="text-md sm:text-xl md:text-2xl lg:text-2xl mt-4 ">How we do it</h1> 
            
                <ImageTextRow
          imageSrc='/servicesimages/methodology images/innovative.jpg'
          title="Innovative Strategies"
          subtitle="Gain Digital Advantage"
          text="We merge creativity and technology to deliver impactful branding, data-driven marketing, and innovative tech solutions. From memorable brand identities to AI-enhanced digital experiences, we craft strategies that connect, engage, and drive your business forward."
          isAlternate={false}
        />

        <ImageTextRow
          imageSrc='/servicesimages/methodology images/strategic.jpg'
          title="Strategic Insights"
          subtitle='Results-Oriented Solutions'
          text="We empower businesses with strategic insights that drive smarter decisions and sustained growth. Using data analytics, AI, and industry expertise, we uncover key opportunities, optimize performance, and tailor strategies that align with your goals. With our insights, you gain a clearer vision and the confidence to lead in a competitive landscape."
          isAlternate={true}
        />

        <ImageTextRow
          imageSrc='/servicesimages/methodology images/strategic.jpg'
          title="Personalized Tactics"
          subtitle="From Art to Science"
          text="We develop personalized tactics that align with your unique business goals and audience needs. Through tailored branding, targeted marketing, and customized tech solutions, we ensure every strategy resonates with your customers and amplifies your brand’s impact. Our approach combines data insights with creativity to deliver results that matter specifically to you."
          isAlternate={false}
        />

       

        </div>
    </section>
 )
}

export default ServicesMethodologySection