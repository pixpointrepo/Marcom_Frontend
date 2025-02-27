import { useState, useEffect, useCallback } from "react";
import { getFeaturedCategories } from "../../services/api"; // Adjust path as needed

const useFetchFeaturedCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories logic wrapped in useCallback for memoization
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFeaturedCategories();
      setCategories(data); // Assuming data is an array of category objects
    } catch (err) {
      setError(err.message || "Failed to load featured categories");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Expose refetch function
  const refetch = () => fetchCategories();

  return { categories, loading, error, refetch };
};

export default useFetchFeaturedCategories;