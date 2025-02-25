import { useEffect, useState } from "react";
import { fetchHomepageArticles } from "../../services/api";

const useFetchHomepage = (limit = 5) => {
  const [articles, setArticles] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchHomepageArticles(limit);
        
        setArticles(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, [limit]);

  return { articles, loading, error };
};

export default useFetchHomepage;
