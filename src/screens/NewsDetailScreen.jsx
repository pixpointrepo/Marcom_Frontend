import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import useFetchArticleByUrl from "../components/hooks/useFetchArticleByUrl";
import { fetchArticles } from "../services/api";


const NewsDetailScreen = () => {
  const navigate = useNavigate();
  const { url } = useParams();

  // Fetch main article
  const { article, loading, error } = useFetchArticleByUrl(url);

  // State for related articles
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loadingSimilarArticles, setLoadingSimilarArticles] = useState(false);
  const [errorSimilarArticles, setErrorSimilarArticles] = useState(null);

  // Fetch related articles AFTER main article is loaded
  useEffect(() => {
    if (!article?.category) return; // Avoid unnecessary fetch

    const fetchRelatedArticles = async () => {
      setLoadingSimilarArticles(true);
      setErrorSimilarArticles(null);
      try {
        const data = await fetchArticles({ limit: 6, categoryFilter: article.category });
        setRelatedArticles(data.articles);
      } catch (err) {
        setErrorSimilarArticles("Failed to load related articles");
      } finally {
        setLoadingSimilarArticles(false);
      }
    };

    fetchRelatedArticles();
  }, [article?.category]); // Runs only when `article?.category` changes

  return (
    <div className="px-4 md:p-6">
      {/* Main Article Content */}
      {loading ? (
        <div className="flex justify-center items-center h-60">Loading article...</div>
      ) : error ? (
        <div className="text-red-500 text-center mt-10">{error}</div>
      ) : !article ? (
        <div className="text-gray-500 text-center mt-10">No article found.</div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <p className="text-sm text-gray-500">{article.date} · {article.readTime} · {article.author}</p>
          <img
            src={`http://localhost:5000${article.thumbnail}`}
            alt={article.title}
            className="w-full h-64 object-cover rounded-md mt-4 mb-6"
          />
          <p className="text-base leading-relaxed">{article.summary}</p>
        </>
      )}

      {/* Related Articles */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Similar Articles</h2>
        {loadingSimilarArticles ? (
          <div className="flex justify-center items-center h-32">Loading related articles...</div>
        ) : errorSimilarArticles ? (
          <div className="text-red-500 text-center mt-10">{errorSimilarArticles}</div>
        ) : relatedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedArticles.map((related) => (
              <div
                key={related.id}
                className="bg-white border p-2 rounded-md cursor-pointer hover:shadow-lg transition"
                onClick={() => {
                  navigate(
                    `/${related?.categoryUrl}/${related.url}`
                  );
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <img src={related.thumbnail} alt={related.title} className="h-48 w-full object-cover rounded-md" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold hover:text-blue-500">{related.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{related.summary}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No related articles found.</p>
        )}
      </div>
    </div>
  );
};

export default NewsDetailScreen;
