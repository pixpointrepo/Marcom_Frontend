// components/ConfirmDeleteModal.jsx
import React from "react";
import { Button } from "../ui/button"; // Adjust the import based on your project structure

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName = "item", // Default to "item" if no specific name is provided
}) => {
  if (!isOpen) return null; // Don't render anything if the modal isn't open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Confirm Deletion
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-medium">{itemName}</span>?
           {/* This action cannot be
          undone. */}
        </p>
        <div className="flex justify-end gap-4">
          <Button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;