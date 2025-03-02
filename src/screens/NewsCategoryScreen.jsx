/* eslint-disable */

import { useState, useEffect } from "react";
import allNewsArticles from "../data/articles";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import urlToName from "../utils/urlToName";
import useFetchArticles from "../components/hooks/useFetchArticles";
import ArticleCard from "../components/ArticleCard";
import Pagination from "../components/ui/Pagination";
import ArticleCardSkeleton from "../components/skeletons/ArticleCardSkeleton";

const NewsCategoryScreen = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get the current page from the URL or default to 1
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Fetch articles based on category
  const { articles, totalFetchedPages, loading, error } = useFetchArticles({
    page: currentPage,
    limit: 4, // Customize as needed
    categoryFilter: categoryName,
  });

  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalFetchedPages) return;
    setCurrentPage(page);
    setSearchParams({ page });
  };

  // Sync state with URL when `page` changes
  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(pageFromUrl);
  }, [searchParams]);
  if (loading) {
    return (
      <div className="py-6 px-2">
        <h1 className="text-3xl font-bold mb-4">{urlToName(categoryName)}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, index) => (
            <ArticleCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }
  
  if (error) return <div className="text-red-500 py-6 px-2">{error}</div>;
  if (!articles || articles.length === 0) return <div className="py-6 px-2">No articles found</div>;
  
  return (
    <div className="py-6 px-2">
      <h1 className="text-3xl font-bold mb-4">{urlToName(categoryName)}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            index={article.index}
            isHomeScreen={false}
          />
        ))}
      </div>
      
      {/* Pagination */}
      { totalFetchedPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalFetchedPages={totalFetchedPages}
          handlePageChange={handlePageChange}
        />
      )}
     
    </div>
  );
  
};

export default NewsCategoryScreen;
