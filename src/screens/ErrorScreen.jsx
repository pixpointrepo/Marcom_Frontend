import { useNavigate } from "react-router-dom";

const ErrorScreen = ({ message = "Something went wrong. Please try again." }) => {

  return (
    <div className="flex flex-col items-center justify-center min-h-80 bg-gray-100 p-6 text-center">
      <h1 className="text-2xl font-medium text-red-500">Something went wrong</h1>
      <p className="text-lg text-gray-600 mt-2 mb-4">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-gradient-to-tr from-main to-purple-700 text-xs text-white px-4 py-2 rounded-md hover:from-blue-600 hover:to-blue-700"
      >
        Reload
      </button>
    </div>
  );
};

export default ErrorScreen;
