import { useNavigate } from "react-router-dom";

const ErrorScreen = ({ message = "Something went wrong. Please try again." }) => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <h1 className="text-3xl font-medium text-red-500">Oops!</h1>
      <p className="text-lg text-gray-600 mt-2">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-3 py-1 bg-[#1E3A8A] text-white rounded-md hover:bg-blue-700 transition"
      >
        Reload
      </button>
    </div>
  );
};

export default ErrorScreen;
