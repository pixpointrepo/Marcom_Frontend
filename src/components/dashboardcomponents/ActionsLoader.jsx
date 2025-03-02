/* eslint-disable */
import { ImSpinner3 } from "react-icons/im"; // Import spinner icon from react-icons

const ActionsLoader = ({ loading, widthLeft = '16rem' }) => { // Set default value for widthLeft

  if (!loading) return null; // Don't render if not loading

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
      <div className={`md:w-[${widthLeft}] `}>
        {/* Content can be added here */}
      </div>
      <div><ImSpinner3 className="animate-spin text-blue-500 text-5xl" /></div>
    </div>
  );
};

export default ActionsLoader;
