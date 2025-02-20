// src/pages/ArticlesPage.js

import React, { useState } from "react";
import Select from "react-select"; // For tags and category filters
import {
  SlidersHorizontal,
  TableProperties,
  Grid2x2,
  Trash2,
  FilePenLine,
  X,
} from "lucide-react";
import { grid2Classes } from "@mui/material";
{
  /* <TableProperties /><TableProperties /><Grid2x2 /> */
}
// Dummy data for articles
const dummyArticles = [
  {
    id: 1,
    title: "Understanding React",
    description: "A comprehensive guide to React and its features...",
    category: "React",
    tags: ["JavaScript", "Frontend"],
    thumbnail: "https://via.placeholder.com/150",
    lastModified: "2025-02-18",
  },
  {
    id: 2,
    title: "Getting Started with Node.js",
    description:
      "Node.js is a powerful JavaScript runtime used for backend development...",
    category: "Node.js",
    tags: ["Backend", "JavaScript"],
    thumbnail: "https://via.placeholder.com/150",
    lastModified: "2025-02-15",
  },
  // Add more dummy articles...
];

const categories = [
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
  { value: "Vue", label: "Vue" },
];

const tags = [
  { value: "JavaScript", label: "JavaScript" },
  { value: "Frontend", label: "Frontend" },
  { value: "Backend", label: "Backend" },
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
];

const ArticlesPage = () => {
  const [viewMode, setViewMode] = useState("tile"); // grid or tile
  const [filteredArticles, setFilteredArticles] = useState(dummyArticles);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [tagsFilter, setTagsFilter] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");
  const [dropdownOpen, setDropdownOpen] = useState(false); // Manage dropdown state
  const [isMobileFilter, setMobileFilter] = useState(false);

  // Filter articles based on selected filters
  const filterArticles = () => {
    let filtered = dummyArticles;

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter(
        (article) => article.category === categoryFilter.value
      );
    }

    // Filter by tags
    if (tagsFilter.length > 0) {
      filtered = filtered.filter((article) =>
        tagsFilter.every((tag) => article.tags.includes(tag.value))
      );
    }

    // Sort by latest or oldest
    if (sortOrder === "latest") {
      filtered = filtered.sort(
        (a, b) => new Date(b.lastModified) - new Date(a.lastModified)
      );
    } else if (sortOrder === "oldest") {
      filtered = filtered.sort(
        (a, b) => new Date(a.lastModified) - new Date(b.lastModified)
      );
    }

    setFilteredArticles(filtered);
  };

  // Handle apply button click
  const handleApplyFilters = () => {
    filterArticles();
  };

  // Handle view mode toggle
  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  // Handle Edit/Delete actions
  const handleAction = (action, articleId) => {
    if (action === "edit") {
      console.log(`Edit article ${articleId}`);
    } else if (action === "delete") {
      console.log(`Delete article ${articleId}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex flex-col gap-2 lg:flex-row lg:gap-8">
        <h1 className="text-center text-2xl font-bold mb-2 order-1">Articles</h1>
        <div className="relative w-full xl:w-[30%] order-2">
          <input
            type="text"
            placeholder="Search articles..."
            className=" p-3 pl-4 mb-2 pr-12 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => console.log(e.target.value)} // Handle search here
          />
          <button
            className={`${
              isMobileFilter ? "hidden" : "absolute"
            } top-1/2 right-1 transform -translate-y-[60%] bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            onClick={() => console.log("Search clicked")} // Handle search action here
          >
            Search
          </button>
        </div>

        <div className="flex justify-between items-center order-3 xl:order-4">
          <div className="xl:hidden bg-gray-200 p-3 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
            {isMobileFilter ? (
              <X onClick={() => setMobileFilter(false)} />
            ) : (
              <SlidersHorizontal onClick={() => setMobileFilter(true)} />
            )}
          </div>

          <div className="flex justify-end  gap-1">
            <button
              onClick={() => toggleViewMode("tile")}
              className={`bg-gray-200 p-3 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ${
                viewMode === "tile" ? "bg-blue-100" : ""
              }`}
            >
              <TableProperties />
            </button>
            <button
              onClick={() => toggleViewMode("grid")}
              className={`bg-gray-200 p-3 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ${
                viewMode === "grid" ? "bg-blue-100" : ""
              }`}
            >
              <Grid2x2 />
            </button>
          </div>
        </div>

        <div
          className={`flex  justify-around items-center order-4 xl:order-3 bg-white gap-2 w-full sm:w-2/3 
    ${
      isMobileFilter
        ? "absolute w-[90%] top-48 z-40 flex-col"
        : "hidden xl:flex xl:flex-row"
    }`}
        >
          <Select
            options={categories}
            onChange={setCategoryFilter}
            isClearable
            placeholder="Category"
            className="w-full sm:w-1/3"
            classNamePrefix="select"
          />
          <Select
            isMulti
            options={tags}
            onChange={setTagsFilter}
            placeholder="Tags"
              className="w-full sm:w-1/3"
            classNamePrefix="select"
          />
           <Select
            options={categories}
            onChange={setCategoryFilter}
            isClearable
            placeholder="Latest"
            className="w-full sm:w-1/3"
            classNamePrefix="select"
          />
          <button
            onClick={handleApplyFilters}
            className="bg-blue-500 text-white px-3 py-0 rounded-lg w-full sm:w-auto hover:bg-blue-600 transition duration-300"
          >
            Apply 
          </button>
        </div>
      </div>

      <div
        className={`grid  ${
          viewMode === "grid" ? "grid-cols-2 gap-2" : "grid-cols-1 gap-6"
        }`}
      >
        {filteredArticles.map((article) => (
          <div className="flex flex-col   p-2 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ">
            <div
              key={article.id}
              className={`flex   ${
                viewMode === "tile" ? " flex-row" : " flex-col"
              }`}
            >
              <img
                src={article.thumbnail}
                alt={article.title}
                className={` bg-red-50 ${
                  viewMode === "tile" ? "w-20" : "w-full h-full"
                } aspect-[1/1] h-20 object-cover rounded-lg mb-4`}
              />

              <div className="relative w-full">
                <div className="flex flex-col justify-around w-full  gap-2 pl-2">
                  <h3
                    className={` ${
                      viewMode === "tile" ? " w-[80%]" : "w-full"
                    } font-semibold text-base text-gray-800`}
                  >
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {article.description.slice(0, 100)}...
                  </p>
                </div>
                {/* Custom Edit and Delete Buttons */}
                <div
                  className={`  ${
                    viewMode === "tile" ? "right-0 top-0 " : "-top-12 right-0"
                  } absolute `}
                >
                  <div className="flex gap-1">
                    {/* Edit Button */}
                    <button
                      onClick={() => handleAction("edit", article.id)}
                      className="flex items-center bg-blue-500 text-white px-2 py-2 rounded-lg text-xs hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <FilePenLine size={16} />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleAction("delete", article.id)}
                      className="flex items-center bg-red-500 text-white px-2 py-2 rounded-lg text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={` p-2 ${
                viewMode === "tile" ? "flex-row" : "flex-col"
              } flex justify-between text-xs text-gray-400 mt-${
                viewMode === "tile" ? "0" : "auto"
              }`}
            >
              <h1>By someone</h1>
              <small>Last Modified: {article.lastModified}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
