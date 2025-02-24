// src/pages/ArticlesPage.js

import React, { useState } from "react";
import Select from "react-select"; // For tags and category filters
import { Link } from "react-router-dom"; // Import Link from React Router
import { useNavigate } from "react-router-dom";

import {
  SlidersHorizontal,
  TableProperties,
  Grid2x2,
  Trash2,
  FilePenLine,
  X,
} from "lucide-react";
import useFetchMetadata from "../../components/hooks/useFetchMetadata";
import useFetchArticles from "../../components/hooks/useFetchArticles";
import { deleteArticle } from "../../services/api"; // Import the new function

const ArticlesPage = () => {
  const [viewMode, setViewMode] = useState("tile"); // grid or tile
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("latest");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileFilter, setMobileFilter] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [tagsFilter, setTagsFilter] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

  const {
    categories,
    tags,
    loading: metadataLoading,
    error: metadataError,
  } = useFetchMetadata();

  // Use the custom hook to fetch articles
  const {
    articles,
    loading: articlesLoading,
    error: articlesError,
  } = useFetchArticles({
    page,
    categoryFilter,
    tagsFilter,
    searchQuery,
  });
  {
    /* Loading and Error Handling for Metadata */
  }
  {
    metadataLoading && <p>Loading metadata...</p>;
  }
  {
    metadataError && <p style={{ color: "red" }}>{metadataError}</p>;
  }

  {
    /* Loading and Error Handling for Articles */
  }
  {
    articlesLoading && <p>Loading articles...</p>;
  }
  {
    articlesError && <p style={{ color: "red" }}>{articlesError}</p>;
  }

  // Handle view mode toggle
  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  // Handle Edit/Delete actions
  const handleAction = async (action, id) => {
    // Accepting both action and id

    if (action === "edit") {
      navigate(`/dashboard/edit-article/${id}`); // Use the id here
    } else if (action === "delete") {
      if (window.confirm("Are you sure you want to delete this article?")) {
        try {
          await deleteArticle(id); // Use the id here as well
          alert("Article deleted successfully!");
          navigate("/dashboard/articles"); // Redirect to dashboard after deletion
        } catch (error) {
          alert("Failed to delete article: " + error.message);
        }
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex flex-col  gap-2 lg:flex-row lg:items-center lg:gap-8">
        <h1 className="text-center text-2xl font-bold mb-2 order-1">
          Articles
        </h1>
        <div className="relative mt-2  w-full xl:w-[40%] 3xl:w-[60%] order-2">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            className=" p-3  pl-4 mb-2 pr-12 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchQuery(e.target.value)} // Handle search here
          />
          <button
            className={`${
              isMobileFilter ? "hidden" : "absolute"
            } xl:hidden top-1/2 right-1 transform -translate-y-[60%] bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
          className={`flex  justify-around items-center order-4 xl:order-3 bg-white gap-2 w-[94%] p-2  xl:p-0 sm:w-2/3 
    ${
      isMobileFilter
        ? "absolute w-[90%] top-48 z-40 flex-col"
        : "hidden xl:flex xl:flex-row"
    }`}
        >
          <Select
            options={categories}
            value={categoryFilter}
            onChange={(selectedOption) =>
              setCategoryFilter(selectedOption || null)
            }
            isClearable
            placeholder="Category"
            className="w-full sm:w-1/3"
            classNamePrefix="select"
          />
          <Select
            isMulti
            options={tags}
            value={tagsFilter} // Make sure the format is [{ value, label }]
            onChange={(selectedOptions) => setTagsFilter(selectedOptions || [])}
            placeholder="Tags"
            className="w-full sm:w-1/3"
            classNamePrefix="select"
          />
          <Select
            options={categories}
            value={categoryFilter}
            onChange={(selectedOption) =>
              setCategoryFilter(selectedOption || null)
            }
            isClearable
            placeholder="Latest"
            className="w-full sm:w-1/3"
            classNamePrefix="select"
          />
          <button className="bg-blue-500 text-white px-3 py-2 rounded-lg w-full  sm:w-auto hover:bg-blue-600 transition duration-300">
            Search
          </button>
        </div>
      </div>

      <div
        className={`grid  ${
          viewMode === "grid"
            ? "grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5"
            : "grid-cols-1 gap-6"
        }`}
      >
        {articles.length > 0 ? (
          articles.map((article) => (
            <div
              key={article.id} // Move key here, on the outermost div
              className="flex flex-col p-2 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="flex flex-col w-full">
                <div
                  className={`flex ${
                    viewMode === "tile" ? "flex-row" : "flex-col"
                  }`}
                >
                  <Link
                    to={`/dashboard/article/${encodeURIComponent(
                      article.title
                    )}/${article._id}`}
                  >
                    <img
                      src={`http://localhost:5000${article.thumbnail}`}
                      alt={article.title}
                      className={`bg-red-50 ${
                        viewMode === "tile" ? "w-20" : "w-full h-full"
                      } aspect-[4/3] h-20 object-cover rounded-lg mb-4`}
                    />
                  </Link>

                  <div className="relative w-full">
                    <Link
                      to={`/dashboard/article/${encodeURIComponent(
                        article.title
                      )}/${article._id}`} // Use encodeURIComponent to safely pass the title as a parameter
                      className="flex flex-col justify-around w-full gap-2 pl-2 "
                    >
                      <h3
                        className={`font-semibold text-base text-gray-800 ${
                          viewMode === "tile" ? "w-[80%]" : "w-full"
                        }`}
                      >
                        {article.title}
                      </h3>
                      {viewMode === "tile" ? (
                        <p
                          className="prose prose-lg prose-ul:list-disc prose-ol:list-decimal text-sm text-gray-600 line-clamp-3 "
                          dangerouslySetInnerHTML={{
                            __html: article.description,
                          }}
                        />
                      ) : (
                        <p
                          className="prose prose-lg prose-ul:list-disc prose-ol:list-decimal text-sm text-gray-600 line-clamp-3"
                          dangerouslySetInnerHTML={{
                            __html: article.description,
                          }}
                        />
                      )}
                    </Link>

                    {/* Custom Edit and Delete Buttons */}
                    <div
                      className={`${
                        viewMode === "tile"
                          ? "right-0 top-0"
                          : "-top-12 right-0"
                      } absolute z-40`}
                    >
                      <div className="flex gap-1">
                        {/* Edit Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent click from bubbling up to Link
                            handleAction("edit", article._id);
                          }}
                          className="flex items-center bg-blue-500 text-white px-2 py-2 rounded-lg text-xs hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <FilePenLine size={16} />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent click from bubbling up to Link
                            handleAction("delete", article._id); // Fixed to "delete"
                          }}
                          className="flex items-center bg-red-500 text-white px-2 py-2 rounded-lg text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                  
                    </div>
                  </div>
                </div>

                <div
                  className={`p-2 ${
                    viewMode === "tile" ? "flex-row" : "flex-col"
                  } flex justify-between text-xs text-gray-400 mt-${
                    viewMode === "tile" ? "0" : "auto"
                  }`}
                >

                  <div className="flex gap-2">
                  <h1> {article.author}</h1>
                  {article.isFeatured ? (<strong>Featured</strong>) : ("")}
                  </div>
                  <small>
                    Last Modified:{" "}
                    {new Date(article.date).toLocaleString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true, // Use 24-hour format
                    })}
                  </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No articles found.</p>
        )}

        {/* Pagination Controls */}
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default ArticlesPage;
