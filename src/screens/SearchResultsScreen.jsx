/* eslint-disable */

import { useLocation, useSearchParams } from "react-router-dom";
import allNewsArticles from "../data/articles";

import { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import Pagination from "../components/ui/Pagination";

import useFetchArticles from "../components/hooks/useFetchArticles";

const SearchResultsScreen = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTitle = queryParams.get("title");

  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const articlesPerPage = 5; // Customize as needed

  // Fetch articles based on search query and pagination
  const { articles, totalFetchedPages, loading, error } = useFetchArticles({
    page: currentPage,
    limit: articlesPerPage,
    searchQuery: searchTitle,
  });

  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalFetchedPages) return; // Prevent invalid page numbers
    setCurrentPage(page);
    setSearchParams({ title: searchTitle, page }); // Update the URL with the new page
  };

  if (!searchTitle) {
    return <p className="text-center mt-4">Please enter a search term.</p>;
  }

  return (
    <div>
      <h1 className="text-center font-bold text-xl my-4">
        Search Results for: '{searchTitle}'
      </h1>

      {loading ? (
        <p className="text-center mt-20">Loading...</p>
      ) : error ? (
        <p className="text-center mt-20 text-red-500">{error}</p>
      ) : articles.length > 0 ? (
        <div>
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalFetchedPages={totalFetchedPages}
            handlePageChange={handlePageChange}
          />
          
        </div>
      ) : (
        <p className="text-center mt-20">
          No articles found for '{searchTitle}'
        </p>
      )}
    </div>
  );
};

export default SearchResultsScreen;
