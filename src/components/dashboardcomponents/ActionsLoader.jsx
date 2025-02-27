/* eslint-disable */

import { ImSpinner3 } from "react-icons/im"; // Import spinner icon from react-icons

const ActionsLoader = ({ loading }) => {
  if (!loading) return null; // Don't render if not loading

  return (
    <div className="fixed inset-0 flex  items-center justify-center bg-gray-100 bg-opacity-50 z-50">
      <ImSpinner3 className="animate-spin text-blue-500 text-5xl" />
    </div>
  );
};

export default ActionsLoader;