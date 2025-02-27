// src/components/ui/ResultModal.jsx
import React from "react";
import { Button } from "../ui/button"; // Adjust the import based on your project structure

const ResultModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  const isSuccess = message && !message.includes("Failed");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3
          className={`text-xl font-semibold mb-4 ${
            isSuccess ? "text-green-600" : "text-red-600"
          }`}
        >
          {isSuccess ? "Success" : "Error"}
        </h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end">
          <Button
            onClick={onClose}
            className={`${
              isSuccess
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            } text-white px-4 py-2 rounded-md transition-colors`}
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;