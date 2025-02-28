/* eslint-disable */

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import platformSvgs from './svgs';



const teamMembers = [
  {
    name: "Dikshant Koirala",
    role: "Director",
    description:
      "Glavida amet ritnisl libero molestie ante ut fringilla purus eros quis.",
    image: "/servicesimages/team/dikshant.png", // Replace with actual image paths
    socials: [
      { platform: "Facebook", link: "#", icon: "fab fa-twitter" },
      { platform: "Twitter", link: "#", icon: "fab fa-twitter" },
      { platform: "Instagram", link: "#", icon: "fab fa-instagram" },
      { platform: "LinkedIn", link: "#", icon: "fab fa-linkedin-in" },
    ],
  },
  {
    name: "Deepak Koirala",
    role: "Chief Executive Officer",
    description:
      "Glavida amet ritnisl libero molestie ante ut fringilla purus eros quis.",
    image: "/servicesimages/team/deepak.png",
    socials: [
      { platform: "Facebook", link: "#", icon: "fab fa-facebook-f" },
      { platform: "Twitter", link: "#", icon: "fab fa-twitter" },
      { platform: "Instagram", link: "#", icon: "fab fa-instagram" },
      { platform: "LinkedIn", link: "#", icon: "fab fa-linkedin-in" },
    ],
  },
  {
    name: "Paribesh Koirala",
    role: "Managing Director",
    description:
      "Glavida amet ritnisl libero molestie ante ut fringilla purus eros quis.",
    image: '/servicesimages/team/paribesh.png',
    socials: [
      { platform: "Facebook", link: "#", icon: "fab fa-facebook-f" },
      { platform: "Twitter", link: "#", icon: "fab fa-twitter" },
      { platform: "Instagram", link: "#", icon: "fab fa-instagram" },
      { platform: "LinkedIn", link: "#", icon: "fab fa-linkedin-in" },
    ],
  },
];

const ServicesTeamSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <div className="text-center px-3 sm:px-14 md:px-14 lg:px-14 py-4 sm:py-16 md:py-16 lg:py-16 bg-gray-100">
      <h2 className="text-md sm:text-xl md:text-2xl lg:text-2xl   mb-4">Our Team</h2>
      <p className="text-xs sm:text-sm md:text-base lg:text-base text-gray-600 max-w-xl mx-auto mb-12">
      Meet our team. A passionate group of professionals driven by innovation and collaboration.
      </p>

        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-10 lg:gap-10"
            >
            {teamMembers.map((member, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}  
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                    duration: 1,
                    delay: index * 0.3,
                }}
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
                >
                <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-32 lg:h-32 rounded-full object-cover border-2 border-white shadow-[0_0_0_2px_#0000FF] mb-4"
                />
                <h3 className="text-md sm:text-xl md:text-2xl lg:text-2xl ">{member.name}</h3>
                <p className="text-blue-500 text-sm mb-2">{member.role}</p>
                <p className="text-gray-600 text-center text-sm mb-4">
                    {member.description}
                </p>
                <div className="flex gap-4">
                {member.socials.map((social, socialIndex) => {
                        // Find the platform icon based on the social media name
                        const platformIcon = platformSvgs.find(platform => platform.name == social.platform);
                        console.log(platformIcon.icon);

                        return platformIcon ? (
                            <a
                            key={socialIndex}
                            href={social.link}
                            className="w-10 h-10 flex justify-center items-center bg-gray-200 rounded-full hover:bg-secondary text-gray-600 hover:text-white transition-all duration-300"
                            >
                            {platformIcon.icon}
                            </a>
                        ) : null;
            })}
          </div>
        </motion.div>
      ))}
        </motion.div>
    </div>
  );
};

export default ServicesTeamSection;
