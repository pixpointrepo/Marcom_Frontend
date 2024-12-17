
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import allNewsArticles from "../data/articles";

const AuthorScreen = () => {

  const { authorName } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get the current page from the URL or default to 1
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Flatten all articles to filter by author
  const allArticles = Object.values(allNewsArticles).flatMap(
    (category) => category.articles
  );

  // Filter articles by the author's name
  const authorArticles = allArticles.filter(
    (article) =>
      article.author.toLowerCase().replace(/\s+/g, "-") ===
      authorName.toLowerCase()
  );

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(pageFromUrl);
  }, [searchParams]);

  if (!authorArticles.length) {
    return <div className="p-6 text-center text-gray-600">No articles found for this author.</div>;
  }

  const articlesPerPage = 2;
  const totalPages = Math.ceil(authorArticles.length / articlesPerPage);

  // Paginate the articles
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = authorArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    setSearchParams({ page });
  };

 
  return (
    <div className="p-6">
      <h1 className="text-2xl font-medium mb-6 text-center capitalize">
        Articles by {authorName.replace(/-/g, " ")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white p-4 rounded-md border cursor-pointer hover:shadow-lg transition"
            onClick={() => {
              navigate(
                `/${article.categoryUrl}/${article.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")}`
              );
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img
              src={article.thumbnail}
              alt={article.title}
              className="h-48 w-full object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">{article.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{article.summary}</p>
            <div className="text-sm text-gray-500 mt-2">
              <span>{article.date}</span> · <span>{article.readTime}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 border rounded ${
            currentPage === 1 ? "bg-gray-200 text-gray-400" : "bg-gray-100 hover:bg-blue-500 hover:text-white"
          }`}
        >
          Previous
        </button>
        <span className="px-3 py-1 border rounded bg-blue-500 text-white">{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border rounded ${
            currentPage === totalPages ? "bg-gray-200 text-gray-400" : "bg-gray-100 hover:bg-blue-500 hover:text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AuthorScreen;
