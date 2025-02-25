import { useState, useEffect } from "react";
import { fetchArticleByUrl } from "../../services/api"; // Import the API function

const useFetchArticleByUrl = (url) => {
    console.log("URL received: ",url);
  const [article, setArticle] = useState(null); // State to store article data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to store errors

  useEffect(() => {
    if (!url) return; // Prevent fetching if no url

    const fetchArticle = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state
      try {
        const articleData = await fetchArticleByUrl(url); // Call the API function
        setArticle(articleData); // Set the article data in state
      } catch (err) {
        setError("Failed to fetch article");
        console.error(err); // Log the error for debugging
      } finally {
        setLoading(false); // Set loading to false after fetching is complete
      }
    };

    fetchArticle(); // Call the fetch function

  }, [url]); // Re-run the effect when url changes

  return { article, loading, error };
};

export default useFetchArticleByUrl;
