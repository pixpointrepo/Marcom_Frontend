import React, { useState } from "react";
import Select from "react-select";
import useFetchMetadata from "../../components/hooks/useFetchMetadata"; // Adjust path as needed
import { Button } from "../../components/ui/button"; // Adjust path as needed

const ContentManage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [submitStatus, setSubmitStatus] = useState(null);

  const { categories, tags, loading, error } = useFetchMetadata();

  // Handle category selection change
  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions || []);
  };

  // Simulate saving selected categories to the database
  const handleSubmit = async () => {
    if (selectedCategories.length === 0) {
      setSubmitStatus("Please select at least one category.");
      return;
    }

    try {
      const categoriesToSave = selectedCategories.map((cat) => ({
        categoryUrl: cat.value,
        category: cat.label,
      }));

      await saveCategoriesToDB(categoriesToSave); // Hypothetical API call
      setSubmitStatus("Categories saved successfully!");
    } catch (err) {
      setSubmitStatus("Failed to save categories: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading categories and tags...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  // Limit to 6 categories for display initially
  const displayedCategories = categories.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-100 w-full p-3">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Content Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section: Category Selection and Submission */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Select categories to display at HomePage
            </h2>

            {/* Category Multi-Select */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Choose Categories
              </label>
              <Select
                isMulti
                options={categories}
                value={selectedCategories}
                onChange={handleCategoryChange}
                placeholder="Select categories..."
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>

            {/* Selected Categories */}
            {selectedCategories.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Selected Categories
                </h3>
                <div className="space-y-2">
                  {selectedCategories.map((cat) => (
                    <div
                      key={cat.value}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded-md border border-gray-200"
                    >
                      <span className="text-gray-600">
                        {cat.label}{" "}
                        <span className="text-gray-400">({cat.value})</span>
                      </span>
                      <button
                        onClick={() =>
                          setSelectedCategories(
                            selectedCategories.filter(
                              (c) => c.value !== cat.value
                            )
                          )
                        }
                        className="text-red-500 hover:text-red-700 focus:outline-none"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button and Feedback */}
            <div className="flex items-center gap-4">
              <Button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Categories
              </Button>
              {submitStatus && (
                <p
                  className={`text-sm ${
                    submitStatus.includes("Failed")
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {submitStatus}
                </p>
              )}
            </div>
          </div>

          {/* Right Section: Available Categories */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Available Categories
              </h2>
              <ul className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {categories.map((cat) => (
                  <li
                    key={cat.value}
                    className="text-gray-600 py-1 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    {cat.label}{" "}
                    <span className="text-gray-400">({cat.value})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Hypothetical API function (add to your api.js if needed)
const saveCategoriesToDB = async (categories) => {
  console.log("Saving categories to DB:", categories);
  return Promise.resolve(); // Simulate success
};

export default ContentManage;
