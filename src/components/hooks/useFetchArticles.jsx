import { useState, useEffect } from "react";
import { fetchArticles } from "../../services/api";
import { useCallback } from "react";

const useFetchArticles = ({
  page = 1,
  limit = 10,
  categoryFilter = null,
  tagsFilter = null,
  searchQuery = null,
  isFeatured = null,
}) => {
  const [articles, setArticles] = useState([]);
  const [totalFetchedPages, setTotalFetchedPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("categoryFilter", categoryFilter);
  console.log("tagsFilter", tagsFilter);

  const loadArticles =  useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const category = categoryFilter ? categoryFilter : "";
      const tags = tagsFilter ? tagsFilter : "";

      // console.log(tags);

      const data = await fetchArticles({
        page,
        limit, 
        category,
        tags,
        search: searchQuery,
        isFeatured,
      });
      setArticles(data.articles);
      setTotalFetchedPages(data.totalPages);
    } catch (err) {
      setError("Failed to load articles");
    } finally {
      setLoading(false); // Ensure loading is reset even on error
    }
  }, [page, limit, categoryFilter, tagsFilter, searchQuery, isFeatured]); 

  // Initial fetch and re-fetch on dependency change
  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  // Expose refetch as a manual trigger // check
  const refetch = () => {
    loadArticles();
  };

  return { totalFetchedPages, articles, loading, error, refetch };
};

export default useFetchArticles;
