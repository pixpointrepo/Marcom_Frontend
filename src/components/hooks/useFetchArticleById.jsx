import { useState, useEffect } from "react";
import { fetchArticleById } from "../../services/api"; // Import the API function

const useFetchArticleById = (articleId) => {
  const [article, setArticle] = useState(null); // State to store article data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to store errors

  useEffect(() => {
    if (!articleId) return; // Prevent fetching if no articleId

    const fetchArticle = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state
      try {
        const articleData = await fetchArticleById(articleId); // Call the API function
        setArticle(articleData); // Set the article data in state
      } catch (err) {
        setError("Failed to load article");
        console.error(err); // Log the error for debugging
      } finally {
        setLoading(false); // Set loading to false after fetching is complete
      }
    };

    fetchArticle(); // Call the fetch function

  }, [articleId]); // Re-run the effect when articleId changes

  return { article, loading, error };
};

export default useFetchArticleById;
