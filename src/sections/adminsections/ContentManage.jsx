import React, { useState } from "react";
import Select from "react-select";
import useFetchMetadata from "../../components/hooks/useFetchMetadata";
import useFetchFeaturedCategories from "../../components/hooks/useFetchFeaturedCategories";
import { Button } from "../../components/ui/button";
import {
  createFeaturedCategories,
  deleteFeaturedCategory,
} from "../../services/api";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal";
import ActionsLoader from "../../components/dashboardcomponents/ActionsLoader";

const ContentManage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [featuredCategoryToDelete, setfeaturedCategoryToDelete] =
    useState(null);

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
    refetch: featureRefetch,
  } = useFetchFeaturedCategories();

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions || []);
  };

  const handleSubmit = async () => {
    if (selectedCategories.length === 0) {
      setSubmitStatus("Please select at least one category.");
      return;
    }

    try {
      const categoriesToSave = selectedCategories.map((cat) => cat.label);
      await createFeaturedCategories(categoriesToSave);
      setSubmitStatus("Categories saved successfully!");
      setSelectedCategories([]);
      featureRefetch();
    } catch (err) {
      setSubmitStatus("Failed to save categories: " + err.message);
    }
  };

  // Open the confirmation modal
  const openDeleteModal = (categoryId) => {
    const category = featuredCategories.find((cat) => cat._id === categoryId);
    setfeaturedCategoryToDelete(category);
    setIsModalOpen(true);
  };

  // Handle deletion after confirmation
  const handleDeleteFeaturedCategory = async () => {
    if (!featuredCategoryToDelete) return;

    try {
      await deleteFeaturedCategory(featuredCategoryToDelete._id);
      setSubmitStatus("Category deleted successfully!");
      featureRefetch();
    } catch (err) {
      setSubmitStatus("Failed to delete category: " + err.message);
    } finally {
      setIsModalOpen(false); // Close the modal
      setfeaturedCategoryToDelete(null); // Clear the category
    }
  };

  if (metadataLoading) {
    return (
      <ActionsLoader loading={metadataLoading} />
    );
  }

  if (metadataError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">{metadataError}</p>
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
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 min-h-[300px]">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Featured Categories
              </h2>
              {featuredLoading ? (
                <p className="text-gray-500">Loading...</p>
              ) : featuredError ? (
                <p className="text-red-500">{featuredError}</p>
              ) : (
                <ul className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {featuredCategories.map((cat) => (
                    <li
                      key={cat._id}
                      className="flex items-center justify-between text-gray-600 py-1 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <span>{cat.name}</span>
                      <button
                        onClick={() => openDeleteModal(cat._id)}
                        className="pr-2 text-red-500 hover:text-red-700 focus:outline-none"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
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

      {/* Render the ConfirmDeleteModal */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteFeaturedCategory}
        itemName={featuredCategoryToDelete?.name || "this category"}
      />
    </div>
  );
};

export default ContentManage;
