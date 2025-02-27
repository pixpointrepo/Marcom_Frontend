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

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const category = categoryFilter ? categoryFilter : "";
        const tags = tagsFilter.map(tag => tag.value).join(',');
        console.log(tags)

        const data = await fetchArticles({ page, category, tags, search: searchQuery , isFeatured   });
        setArticles(data.articles);
        setTotalFetchedPages(data.totalPages);
       
      } catch (err) {
        setError("Failed to load articles");
      }
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
  }, [page, limit, categoryFilter, tagsFilter, searchQuery, isFeatured]);

  return { totalFetchedPages, articles, loading, error };
};

// page,
//     limit,
//     JSON.stringify(categoryFilter),  // Fix infinite loop by converting object to string
//     JSON.stringify(tagsFilter),      // Fix infinite loop by converting array to string
//     searchQuery,
//     isFeatured

export default useFetchArticles;