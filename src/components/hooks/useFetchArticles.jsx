import { useState, useEffect } from "react";
import { fetchArticles } from "../../services/api";

const useFetchArticles = ({ page = 1, limit=10,  categoryFilter = null, tagsFilter = [], searchQuery = null,  isFeatured = null}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const category = categoryFilter ? categoryFilter.value : "";
        const tags = tagsFilter.map(tag => tag.value).join(',');

        const data = await fetchArticles({ page, category, tags,search: searchQuery  });
        setArticles(data.articles);
      } catch (err) {
        setError("Failed to load articles");
      }
      setLoading(false);
    };

    loadArticles();
  }, [page, categoryFilter, tagsFilter, searchQuery, limit, isFeatured]);

  return { articles, loading, error };
};

export default useFetchArticles;
