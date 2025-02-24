import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetchArticleById from "../../components/hooks/useFetchArticleById";
import { Edit, Trash2 } from "lucide-react";
import { deleteArticle } from "../../services/api";

const ArticlePage = () => {
  const { id } = useParams(); // Fetch article ID from URL
  const { article, loading, error } = useFetchArticleById(id);
  const navigate = useNavigate();

  // Handle loading, error, and no-article states
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!article)
    return (
      <div className="text-gray-500 text-center mt-10">No article found.</div>
    );

  const handleAction = async (action, event) => {
    event.preventDefault(); // Prevent any default navigation or form submission

    if (action === "edit") {
      console.log("Navigating to edit page with ID:", article._id);
      navigate(`/dashboard/edit-article/${article._id}`);
    } else if (action === "delete") {
      if (window.confirm("Are you sure you want to delete this article?")) {
        try {
          await deleteArticle(article._id);
          alert("Article deleted successfully!");
          navigate("/dashboard/articles"); // Redirect after successful deletion
        } catch (error) {
          console.error("Delete error:", error);
          alert("Failed to delete article: " + error.message);
        }
      }
    }
  };

  return (
    <div className="px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          {article.title}
        </h1>
        <div className="flex gap-3">
          <button
            onClick={(e) => handleAction("edit", e)}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Edit size={18} className="mr-2" />
            Edit
          </button>
          <button
            onClick={(e) => handleAction("delete", e)}
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <Trash2 size={18} className="mr-2" />
            Delete
          </button>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="mb-8">
        <img
          src={`http://localhost:5000${article.thumbnail}`}
          alt={article.title}
          className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02]"
        />

      </div>

      {/* Description */}
      <div className="mb-8">
        {console.log(article.description)}
        <div className="flex items-center gap-2 justify-between">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 ">
          Description
        </h2>
        {article.isFeatured ? (<strong className="text-green-400">Featured</strong>) : ("")}
        </div>
        <div
          className="prose prose-lg prose-ul:list-disc prose-ol:list-decimal text-sm text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.description }}
        />
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">
            Last Modified
          </span>
          <span className="text-base text-gray-900">
            {new Date(article.date).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">Read Time</span>
          <span className="text-base text-gray-900">
            {article.readTime} min
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">Author</span>
          <span className="text-base text-gray-900">{article.author}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">Category</span>
          <span className="inline-flex mt-1">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {article.category}
            </span>
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
