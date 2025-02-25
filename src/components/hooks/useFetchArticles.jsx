import { useState, useEffect, useCallback } from "react";
import { fetchArticles } from "../../services/api";

const useFetchArticles = ({
  page = 1,
  limit = 10,
  categoryFilter = null,
  tagsFilter = [],
  searchQuery = null,
  isFeatured = null,
}) => {
  const [articles, setArticles] = useState([]);
  const [totalFetchedPages, setTotalFetchedPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Define the fetch function using useCallback to memoize it
  const loadArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const category = categoryFilter ? categoryFilter.value : "";
      const tags = tagsFilter.map((tag) => tag.value).join(",");
      console.log(tags);

      const data = await fetchArticles({
        page,
        limit, // Include limit in the fetch call
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
      setLoading(false);
    }
  }, [page, limit, categoryFilter, tagsFilter, searchQuery, isFeatured]); // Dependencies for memoization

  // Initial fetch and re-fetch on dependency change
  useEffect(() => {
    loadArticles();
  }, [loadArticles]); // Depend on the memoized function

  // Expose refetch as a manual trigger
  const refetch = () => {
    loadArticles();
  };

  return { articles, totalFetchedPages, loading, error, refetch };
};

export default useFetchArticles;