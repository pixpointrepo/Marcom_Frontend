/* eslint-disable */
const SuccessModal = ({ message, onClose }) => {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          {/* <h2 className="text-xl font-semibold text-center mb-4">{isFailure? '': 'Success'}</h2> */}
          <p className="text-center text-gray-700">{message}</p>
          <div className="flex justify-center mt-4">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  

export default SuccessModal;