/* eslint-disable */

import { useState, useEffect } from "react";
import allNewsArticles from "../data/articles";
import { useNavigate, useParams, useSearchParams  } from "react-router-dom";

const NewsCategoryScreen = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get the current page from the URL or default to 1
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Find the category using the categoryName from the URL slug
  const categoryData = Object.values(allNewsArticles).find(
    (data) => data.urlSlug === categoryName
  );

  if (!categoryData) {
    return <div>Category not found</div>;
  }

  const articles = categoryData.articles;

  const articlesPerPage = 2; // Customize as needed
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  // Calculate current articles
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid page numbers
    setCurrentPage(page);
    setSearchParams({ page }); // Update the URL with the new page
  };

  // Sync state with URL when `page` changes
  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(pageFromUrl);
  }, [searchParams]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{categoryData.category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white p-2 rounded-md border cursor-pointer hover:shadow-lg transition"
            onClick={() =>{
              navigate(
                `/${categoryData.urlSlug}/${article.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")}`
              )
              window.scrollTo({
                top: 0,
                behavior: 'smooth', 
              });
            }
            }
          >
            <img
              src={article.thumbnail}
              alt={article.title}
              className="h-48 w-full object-cover rounded-md"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold hover:text-blue-500">{article.title}</h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{article.summary}</p>
              <div className="text-sm text-gray-500 mt-3">
                <span>{article.date}</span> · <span>{article.readTime}</span> ·{" "}
                <span>{article.author}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 border rounded ${
            currentPage === 1 ? "bg-gray-200 text-gray-400" : "bg-gray-100 hover:bg-blue-500 hover:text-white"
          }`}
        >
          Previous
        </button>

        {/* Current Page */}
        <span className="px-3 py-1 border rounded bg-blue-500 text-white">
          {currentPage}
        </span>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border rounded ${
            currentPage === totalPages ? "bg-gray-200 text-gray-400" : "bg-gray-100 hover:bg-blue-500 hover:text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NewsCategoryScreen;