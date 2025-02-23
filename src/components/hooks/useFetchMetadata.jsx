import { useState, useEffect } from "react";
import { fetchCategories, fetchTags } from "../../services/api";

const useFetchMetadata = () => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategoriesAndTags = async () => {
      try {
        setLoading(true);
        const fetchedCategories = await fetchCategories();
        const fetchedTags = await fetchTags(); // This already returns { value, label }

        setCategories(
          fetchedCategories.map((cat) => ({
            value: cat.categoryUrl,
            label: cat.category,
          }))
        );
        setTags(fetchedTags); // Directly set fetchedTags since it's already in the correct format
      } catch (err) {
        setError("Failed to load categories or tags");
      } finally {
        setLoading(false);
      }
    };

    loadCategoriesAndTags();
  }, []);

  return { categories, tags, loading, error };
};

export default useFetchMetadata;
