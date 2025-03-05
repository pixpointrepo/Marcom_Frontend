import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetchArticleByUrl from "../components/hooks/useFetchArticleByUrl";
import { fetchArticles } from "../services/api";
import { logPageView } from "../services/api";
import { useUuid } from "../context/UuidContext";
import ArticleSkeleton from "../components/skeletons/ArticleDetailsSkeleton";
import RelatedArticlesSkeleton from "../components/skeletons/RelatedArticleSkeleton";
import nameToUrl from "../utils/nameToUrl";
import ErrorScreen from "./ErrorScreen";

const NewsDetailScreen = () => {
  const navigate = useNavigate();
  const { url } = useParams();
  const { userUuid } = useUuid();

  const { article, loading, error } = useFetchArticleByUrl(url);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loadingSimilarArticles, setLoadingSimilarArticles] = useState(false);
  const [errorSimilarArticles, setErrorSimilarArticles] = useState(null);

  useEffect(() => {
    if (article?._id && userUuid) {
      const trackPageView = async () => {
        try {
          await logPageView(window.location.pathname, userUuid, article._id);
        } catch (err) {
          console.error("Failed to log page view:", err);
        }
      };
      trackPageView();
    }
  }, [article?._id, userUuid]);

  useEffect(() => {
    if (!article?.category) return;

    const fetchRelatedArticles = async () => {
      setLoadingSimilarArticles(true);
      setErrorSimilarArticles(null);
      try {
        const data = await fetchArticles({
          limit: 4,
          categoryFilter: article.category,
        });
        const filteredArticles = data.articles.filter(
          (relatedArticle) => relatedArticle._id !== article._id
        );
        setRelatedArticles(filteredArticles);
      } catch (err) {
        setErrorSimilarArticles("Failed to load related articles");
        console.error(err);
      } finally {
        setLoadingSimilarArticles(false);
      }
    };

    fetchRelatedArticles();
  }, [article?.category, article?._id]);

  return (
    <div className="px-4 md:p-6">
      <div className="flex gap-3 mb-2">
        {article?.tags.map((tag) => (
          <div
            onClick={() => navigate(`/tags/${nameToUrl(tag)}`)}
            key={tag}
            className="py-0.5 px-2 bg-amber-300 rounded-md text-sm cursor-pointer"
          >
            <h2>{tag}</h2>
          </div>
        ))}
      </div>

      {loading ? (
        <ArticleSkeleton />
      ) : error ? (
        <ErrorScreen />
      ) : !article ? (
        <div className="text-gray-500 text-center mt-10">No article found.</div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <p className="text-sm text-gray-500 flex space-x--">
            {new Date(article.date).toLocaleString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
            <span className="mx-2">·</span>
            <span>
              <svg
                className="h-4 w-4 text-gray-400 inline"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 7V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>{" "}
              {article.readTime}
            </span>
            <span className="mx-2">·</span>
            <span>{article.author}</span>
          </p>

          <img
            src={`http://localhost:5000${article.thumbnail}`}
            alt={article.title}
            className="w-full h-64 object-cover rounded-md mt-4 mb-6"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder-2.png";
            }}
          />
          <p
            className="pr-2 mb-4 prose max-w-full prose-lg prose-ul:list-disc prose-ol:list-decimal text-sm text-gray-600"
            dangerouslySetInnerHTML={{
              __html: article.description,
            }}
          />
          <div className="flex justify-center">
            <a
              type="button"
              href={article.mainArticleUrl}
              target="_blank"
              className="bg-gradient-to-tr from-main to-purple-700 text-xs text-white px-4 py-2 rounded-md 
           hover:from-blue-600 hover:to-blue-700"
              aria-label="Read more"
            >
              Read More
            </a>
          </div>
        </>
      )}
      <hr className="my-6" />

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Similar Articles</h2>
        {loadingSimilarArticles || loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, index) => (
              <RelatedArticlesSkeleton key={index} />
            ))}
          </div>
        ) : errorSimilarArticles ? (
          <div className="text-red-500 text-center mt-10">
            {errorSimilarArticles}
          </div>
        ) : relatedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedArticles.map((related) => (
              <div
                key={related.id}
                className="bg-white border p-2 rounded-md cursor-pointer hover:shadow-lg transition"
                onClick={() => {
                  navigate(`/${related?.categoryUrl}/${related.url}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <img
                  src={`http://localhost:5000${related.thumbnail}`}
                  alt={related.title}
                  className="h-48 w-full object-cover rounded-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder-2.png";
                  }}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold hover:text-blue-500 line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {related.summary}
                  </p>
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