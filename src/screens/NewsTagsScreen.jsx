/* eslint-disable */

import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams  } from "react-router-dom";

import urlToName from "../utils/urlToName";
import ArticleCard from "../components/ArticleCard";
import Pagination from "../components/ui/Pagination";

import useFetchArticles from "../components/hooks/useFetchArticles"; 

const NewsTagsScreen = () => {
  const navigate = useNavigate();
  const { tagName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get the current page from the URL or default to 1
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Fetch articles based on category
  const { articles, totalFetchedPages, loading, error } = useFetchArticles({
    page: currentPage,
    limit: 4, // Customize as needed
    tagsFilter: urlToName(tagName),
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!articles.length) return <div>No articles found</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{urlToName(tagName)}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} index={article.index}   isHomeScreen={false}/>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalFetchedPages={totalFetchedPages}
        handlePageChange={handlePageChange}
      />
     
    </div>
  );
};

export default NewsTagsScreen;