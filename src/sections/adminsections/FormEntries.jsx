import {useEffect, useState} from "react";
import { getFormData } from "../../services/api";

const FormSubmissionsPage = () => {
  const [formEntries, setFormEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFormEntries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getFormData();
      setFormEntries(data);
    } catch (error) {
      setError("Failed to fetch form submissions. Please try again later.");
      console.error("Error fetching form entries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFormEntries();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Form Submissions
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <span className="ml-6 text-lg text-gray-700 font-medium">Loading submissions...</span>
        </div>
      ) : error ? (
        <div className="text-red-600 text-center p-6 bg-red-100 rounded-xl shadow-md">
          <p className="font-semibold">{error}</p>
          <button
            onClick={fetchFormEntries}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            disabled={isLoading}
          >
            Try Again
          </button>
        </div>
      ) : formEntries.length === 0 ? (
        <div className="text-gray-600 text-center p-6 bg-white rounded-xl shadow-md">
          <p className="font-medium">No submissions found.</p>
          <button
            onClick={fetchFormEntries}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            disabled={isLoading}
          >
            Refresh
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {formEntries.map((entry) => (
            <div
              key={entry._id}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {entry.fullName}
                  </h2>
                  <p className="mt-1 text-gray-600">
                    <span className="font-medium text-gray-800">Email:</span> {entry.email}
                  </p>
                  <p className="mt-2 text-gray-600">
                    <span className="font-medium text-gray-800">Subject:</span> {entry.subject}
                  </p>
                  <p className="mt-2 text-gray-700">
                    <span className="font-medium text-gray-800">Description:</span>{" "}
                    {entry.description}
                  </p>
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  ID: {entry._id.slice(0, 8)}...
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Optional: Add a "Refresh" button if there are submissions */}
      {!isLoading && !error && formEntries.length > 0 && (
        <button
          onClick={fetchFormEntries}
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Refreshing..." : "Refresh Submissions"}
        </button>
      )}
    </div>
  );
};

export default FormSubmissionsPage;