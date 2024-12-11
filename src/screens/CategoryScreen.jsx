import { useParams } from "react-router-dom";
import { useState } from "react";
import allArticles from "../data/articles";
import { useNavigate } from "react-router-dom";

const CategoryScreen = () => { 
    const navigate = useNavigate();
    const { categoryName } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
  
    // Find the category using the categoryName from the URL slug
    const categoryData = Object.values(allArticles).find(
      (data) => data.urlSlug === categoryName
    );
  
    if (!categoryData) {
      return <div>Category not found</div>;
    }
  
    const articles = categoryData.articles;
  
    const articlesPerPage = 10; // 5 rows (2 articles per row)
  
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  
    const totalPages = Math.ceil(articles.length / articlesPerPage);
  
    const handlePageChange = (page) => setCurrentPage(page);
  
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">{categoryData.category}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white p-2 rounded-md cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/${categoryData.urlSlug}/${article.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`)}
            >
              <img
                src={article.thumbnail}
                alt={article.title}
                className="h-48 w-full object-cover rounded-md"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold hover:text-blue-500">{article.title}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{article.summary}</p>
                <div className="text-sm text-gray-500 mt-3">
                  <span>{article.date}</span> · <span>{article.readTime}</span> ·{" "}
                  <span>{article.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => handlePageChange(idx + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === idx + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
export default CategoryScreen;
