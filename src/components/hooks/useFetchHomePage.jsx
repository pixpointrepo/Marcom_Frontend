import { useQuery } from "@tanstack/react-query";
import { fetchHomepageArticles } from "../../services/api";

const useFetchHomepage = (limit = 5) => {
  return useQuery({
    queryKey: ["homepageArticles", limit], // Cache based on limit
    queryFn: () => fetchHomepageArticles(limit),
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    refetchOnWindowFocus: false, // Prevent refetching when switching tabs
  });
};

export default useFetchHomepage;


// import { useEffect, useState, useCallback } from "react";
// import { fetchHomepageArticles } from "../../services/api";


// const useFetchHomepage = (limit = 5) => {
//   const [articles, setArticles] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const getArticles = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await fetchHomepageArticles(limit);
//       setArticles(data);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [limit]);

//   useEffect(() => {
//     getArticles();
//   }, [getArticles]);

//   return { articles, loading, error, refetch: getArticles };
// };

// export default useFetchHomepage;