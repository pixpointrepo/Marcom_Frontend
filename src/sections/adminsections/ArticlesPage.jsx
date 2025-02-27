// src/pages/ArticlesPage.js

import React, { useEffect, useState } from "react";
import Select from "react-select"; // For tags and category filters
import { Link } from "react-router-dom"; // Import Link from React Router
import { useNavigate } from "react-router-dom";
import htmlToPlainText from "../../utils/htmlToPlainText";

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
import Pagination from "../../components/dashboardcomponents/PaginationArticles";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal";
import ResultModal from "../../components/ui/ResultModal";
import { useLocation } from "react-router-dom";

const ArticlesPage = () => {
  const [viewMode, setViewMode] = useState("tile"); // grid or tile
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState(null);
  const [isFeatured, setisFeatured] = useState(null);
  const [isMobileFilter, setMobileFilter] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [tagsFilter, setTagsFilter] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState(""); // New state for search query
  const [itemsDisplayed, setItemsDisplayed] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [articelToDeleteTitle, setArticleToDeleteTitle] = useState(null);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [tagsMapped, setMappedTags] = useState("");
  const [categoryValueSelect, setCategoryValueSelect] = useState("");
  const [isGettingDeleted,setisGettingDeleted]= useState(false);
 
  const location = useLocation();
  const message = location.state?.message;
  useEffect(() => {
    if (location.state?.message) {
      setSubmitStatus(location.state.message);
      setIsResultModalOpen(true); // Open modal when there's a message
    }
  }, [location.state]);
  const sortOrderCategory = [
    { label: "Latest", value: "latest" }, //
    { label: "Featured", value: "featured" },

    // ... more options
  ];

  const {
    categories,
    tags,
    loading: metadataLoading,
    error: metadataError,
  } = useFetchMetadata();

  useEffect(() => {
   
    const handleResize = () => {
     
     
 // Function to update items based on screen width
      const width = window.innerWidth;

      if (width >= 1920) {
        setItemsDisplayed(15);
      } else if (width >= 1280) {
        // xl breakpoint in Tailwind
        setItemsDisplayed(12);
      } else if (width >= 1024) {
        // lg breakpoint in Tailwind
        setItemsDisplayed(9);
      } else {
        setItemsDisplayed(8);
      }
    };

    // Call once on mount to set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array means this runs once on mount
  // Use the custom hook to fetch articles
  const {
    totalFetchedPages,
    articles,
    loading: articlesLoading,
    error: articlesError,
    refetch: articleRefetch,
  } = useFetchArticles({
    page,
    categoryFilter: categoryValueSelect,
    tagsFilter: tagsMapped,
    searchQuery,
    isFeatured,
    limit: itemsDisplayed,
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

  const mapTagsWithComma = () => {
    const tags = tagsFilter.map((tag) => tag.value).join(",");
    console.log("checking tags", tags);
    setMappedTags(tags);
  };
  const selectCategoryValue = () => {
    const selectValue = categoryFilter.value;
    console.log("checking value", selectValue);
    setCategoryValueSelect(selectValue);
  };
  useEffect(() => {
    mapTagsWithComma();
  }, [tagsFilter]);
  useEffect(() => {
    selectCategoryValue();
  }, [categoryFilter]);

  const resetFilterStatus = () => {
    const mediaQuery = window.matchMedia("(min-width: 1280px)");
    if (mediaQuery.matches) {
      setMobileFilter(false);
    }
  };
  useEffect(() => {
    resetFilterStatus(); // Run initially
    
    window.addEventListener("resize", resetFilterStatus); // Run on resize
    return () => window.removeEventListener("resize", resetFilterStatus); // Cleanup
  }, []);

  const handleSort = (selectedOption) => {
    if (selectedOption) {
      console.log(selectedOption.label); // Access label safely
      if (selectedOption.value == "featured") {
        setisFeatured(true);
      } else {
        setisFeatured(null);
      }
    } else {
      console.log("No option selected (undefined/null)");
    }
  };

  const handleSearch = () => {
    console.log(query);
    setSearchQuery(query);
  };

  const selectStyles = {
    valueContainer: (provided) => ({
      ...provided,
      maxHeight: "40px", // Limit height (adjust as needed)
      overflowY: "auto", // Scroll vertically if tags exceed height
      display: "flex",
      flexWrap: "wrap", // Allow tags to wrap if needed (optional)
    }),
    multiValue: (provided) => ({
      ...provided,
      margin: "2px", // Spacing between tags
    }),
    container: (provided) => ({
      ...provided,
      // Ensure it respects the parent width
    }),
  };

  // Handle Edit/Delete actions
  const handleAction = async (action, id) => {
    // Accepting both action and id

    if (action === "edit") {
      navigate(`/dashboard/edit-article/${id}`); // Use the id here
    }
  };
  // Open the confirmation modal
  const openDeleteModal = (articleId, articelTitle) => {
    setArticleToDelete(articleId);
    setArticleToDeleteTitle(articelTitle);

    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    setisGettingDeleted(true)
    try {
      
      await deleteArticle(articleToDelete);
      setisGettingDeleted(false)
      setSubmitStatus("Article deleted successfully!");
      setIsModalOpen(false); // Close modal before navigation
      setArticleToDelete(null);
      setArticleToDeleteTitle(null);
   
      articleRefetch();
      setIsResultModalOpen(true);
    } catch (error) {
      console.error("Delete error:", error);
      setisGettingDeleted(false)
      setSubmitStatus("Failed to delete article: " + error.message);
      
      setIsModalOpen(false); // Close modal even on error
      setIsResultModalOpen(true);
    }
  };
  const closeResultModal = () => {
    setIsResultModalOpen(false);
    setSubmitStatus(null); // Clear the message after closing
    // Optionally clear the navigation state if needed
    window.history.replaceState({}, document.title, location.pathname); // Removes state from URL
  };
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex flex-col relative  gap-2 lg:flex-row lg:items-center lg:gap-8">
        <h1 className="text-center text-2xl font-bold mb-2 order-1">
          Articles
        </h1>
        <div className="relative mt-2  w-full xl:w-[60%] 3xl:w-[60%] order-2">
          <input
            type="text"
            placeholder="Search articles..."
            value={query}
            className=" p-3   pl-4 mb-2 pr-12 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setQuery(e.target.value)} // Handle search here
          />
          <button
            className={`absolute
           top-1/2 right-1 transform -translate-y-[60%] bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            onClick={handleSearch} // Handle search action here
          >
            Search
          </button>
        </div>

        <div className="flex justify-between items-center order-3 xl:order-4">
          <div className="xl:hidden mr-1 bg-gray-200 p-3 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
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
          className={`flex  justify-around items-center order-4 xl:order-3 bg-white gap-2 w-[94%] p-2  xl:p-0  
    ${
      isMobileFilter
        ? "absolute w-full top-48 z-50 flex-col lg:top-16 pb-10 pt-2 shadow-md "
        : "hidden xl:flex xl:flex-row"
    }`}
        >
          <Select
            options={categories}
            value={categoryFilter}
            onChange={(selectedOption) => {
              setMobileFilter(false);
              setCategoryFilter(selectedOption || null);
            }}
            isClearable
            placeholder="Category"
            className="w-full xl:w-1/3"
            classNamePrefix="select"
          />
          {/* <Select
            options={categories}
            value={categoryFilter}
            onChange={(selectedOption) => {
              setMobileFilter(false);
              const newValue = selectedOption ? selectedOption.value : null;
              setCategoryFilter(newValue);
              console.log("sent", newValue); // Log the new value immediately
            }}
            isClearable
            placeholder="Category"
            className="w-full xl:w-1/3"
            classNamePrefix="select"
          /> */}
          <Select
            isMulti
            options={tags}
            value={tagsFilter} // Make sure the format is [{ value, label }]
            onChange={(selectedOptions) => {
              setMobileFilter(false);
              setTagsFilter(selectedOptions || []);
              console.log("selecredTags", selectedOptions);
            }}
            placeholder="Tags"
            className="w-full xl:w-1/3 "
            classNamePrefix="select"
            styles={selectStyles}
          />
          <Select
            options={sortOrderCategory}
            value={sortOrder}
            onChange={(selectedOption) => {
              setMobileFilter(false);
              setSortOrder(selectedOption);
              handleSort(selectedOption);
            }}
            placeholder="Latest"
            className="w-full xl:w-1/3"
            classNamePrefix="select"
          />
          {/* <button className="bg-blue-500 text-white px-3 py-2 rounded-lg w-full  sm:w-auto hover:bg-blue-600 transition duration-300">
            Search
          </button> */}
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
              className="flex flex-col  border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="flex flex-col h-full  w-full">
                <div
                  className={`flex  ${
                    viewMode === "tile" ? "flex-row" : "flex-col"
                  }`}
                >
                  {/* image  */}
                  <Link
                    to={`/dashboard/article/${encodeURIComponent(
                      article.title
                    )}/${article._id}`}
                  >
                    <div className="p-2 ">
                      <img
                        src={`http://localhost:5000${article.thumbnail}`}
                        alt={article.title}
                        className={`bg-red-50  ${
                          viewMode === "tile" ? "w-20" : "w-full h-full"
                        } aspect-[4/3] h-20 object-cover rounded-lg mb-4`}
                      />
                    </div>
                  </Link>
                  {/* title desc and buttons */}
                  <div className="relative w-full">
                    <Link
                      to={`/dashboard/article/${encodeURIComponent(
                        article.title
                      )}/${article._id}`} // Use encodeURIComponent to safely pass the title as a parameter
                      className="flex flex-col justify-around w-full  gap-2 pl-2 "
                    >
                      <h3
                        className={`  font-semibold text-base  text-gray-800 mt-1 pr-1 ${
                          viewMode === "tile"
                            ? "w-[80%]"
                            : "w-full line-clamp-1"
                        }`}
                      >
                        {article.title}
                      </h3>
                      {viewMode === "tile" ? (
                        <p
                          className="pr-2 prose max-w-full prose-lg prose-ul:list-disc prose-ol:list-decimal !text-sm !font-normal text-gray-600 line-clamp-3">
                            {htmlToPlainText(article.description)}
                          </p>
                        
                      
                       
                      ) : (
                        <p
                          className="prose max-w-full prose-lg prose-ul:list-disc prose-ol:list-decimal text-sm text-gray-600 line-clamp-3"
                          dangerouslySetInnerHTML={{
                            __html: article.description,
                          }}
                        />
                      )}
                    </Link>

                    {/* Custom Edit and Delete Buttons */}
                    <div
                      className={` px-2 pt-1 ${
                        viewMode === "tile" ? "right-0 top-0" : "-top-9 right-0"
                      } absolute z-40`}
                    >
                      <div className="flex gap-1">
                        {/* Edit Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent click from bubbling up to Link
                            handleAction("edit", article._id);
                          }}
                          className=" shadow-md flex items-center bg-blue-500 text-white px-2 py-2 rounded-lg text-xs hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <FilePenLine size={16} />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent click from bubbling up to Link
                            openDeleteModal(article._id, article.title); // Directly call the function
                          }}
                          className="shadow-md flex items-center bg-red-500 text-white px-2 py-2 rounded-lg text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* author featured and modified date */}
                <div
                  className={`p-2 h-full ${
                    viewMode === "tile" ? "flex-row" : "flex-col "
                  } flex justify-between text-xs text-gray-400 mt-${
                    viewMode === "tile" ? "0" : "auto"
                  }`}
                >
                  <div className="flex gap-2">
                    <h1>{article.author}</h1>
                    {article.isFeatured && <strong>Featured</strong>}
                  </div>
                  <small>
                    Last Modified:{" "}
                    {new Date(article.date).toLocaleString("en-US", {
                      weekday: "short", // Optional: display day of the week (e.g., Mon, Tue)
                      year: "numeric",
                      month: "short", // Optional: display abbreviated month (e.g., Jan, Feb)
                      day: "numeric",
                      hour: "2-digit", // 12-hour clock
                      minute: "2-digit", // 2-digit minute
                      hour12: true, // Use 12-hour format
                    })}
                  </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No articles found.</p>
        )}
      </div>
      {/* Pagination Controls */}
      <div className="mt-9">
        <Pagination
          totalFetchedPages={totalFetchedPages}
          page={page}
          setPage={setPage}
        />
      </div>
      {/* Render the ConfirmDeleteModal */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        itemName={articelToDeleteTitle}
      />
      <ResultModal
        isOpen={isResultModalOpen}
        onClose={closeResultModal}
        message={submitStatus}
      />
    </div>
  );
};

export default ArticlesPage;
