import React, { useState } from "react";
import Select from "react-select";
import useFetchMetadata from "../../components/hooks/useFetchMetadata";
import useFetchFeaturedCategories from "../../components/hooks/useFetchFeaturedCategories";
import { Button } from "../../components/ui/button";
import {
  createFeaturedCategories,
  deleteFeaturedCategory,
} from "../../services/api"; // Added deleteFeaturedCategory


const ContentManage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    categories,
    tags,
    loading: metadataLoading,
    error: metadataError,
  } = useFetchMetadata();
  const {
    categories: featuredCategories,
    loading: featuredLoading,
    error: featuredError,
    refetch: featureRefetch
  } = useFetchFeaturedCategories();

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions || []);
  };

  const handleSubmit = async () => {
    console.log(categories);
    console.log(selectedCategories);
    if (selectedCategories.length === 0) {
      setSubmitStatus("Please select at least one category.");
      return;
    }

    try {
      const categoriesToSave = selectedCategories.map((cat) => cat.label);
      await createFeaturedCategories(categoriesToSave);
      setSubmitStatus("Categories saved successfully!");
      featureRefetch()
      setSelectedCategories([])
     
    } catch (err) {
      setSubmitStatus("Failed to save categories: " + err.message);
    }
  };

  // Handle deletion of a featured category
  const handleDeleteFeaturedCategory = async (categoryId) => {
    try {
      await deleteFeaturedCategory(categoryId);
      setSubmitStatus("Category deleted successfully!");
      featureRefetch()
     
      // Note: featuredCategories won't update automatically unless you refetch or manage state locally
    } catch (err) {
      setSubmitStatus("Failed to delete category: " + err.message);
    }
  };

  if (metadataLoading || featuredLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading categories and tags...</p>
      </div>
    );
  }

  if (metadataError || featuredError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">{metadataError || featuredError}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 w-full p-3">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Content Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Select categories to display at HomePage
            </h2>

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
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
              />
            </div>

            {selectedCategories.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Selected Categories
                </h3>
                <div className="space-y-2">
                  {selectedCategories.map((cat) => (
                    <div
                      key={cat.label}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded-md border border-gray-200"
                    >
                      <span className="text-gray-600">{cat.label}</span>
                      <button
                        onClick={() =>
                          setSelectedCategories(
                            selectedCategories.filter(
                              (c) => c.label !== cat.label
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

          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Featured Categories
              </h2>
              <ul className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {featuredCategories.map((cat) => (
                  <li
                    key={cat._id}
                    className="flex items-center justify-between text-gray-600 py-1 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <span>{cat.name}</span>
                    <button
                      onClick={() => handleDeleteFeaturedCategory(cat._id)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Available Categories
              </h2>
              <ul className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {categories.map((cat) => (
                  <li
                    key={cat.label}
                    className="text-gray-600 py-1 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    {cat.label}
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

export default ContentManage;
