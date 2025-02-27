import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetchArticleById from "../../components/hooks/useFetchArticleById";
import { Edit, Trash2 } from "lucide-react";
import { deleteArticle } from "../../services/api";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal";

const ArticlePage = () => {
  const { id } = useParams();
  const { article, loading, error } = useFetchArticleById(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center mt-10 text-lg">{error}</div>
    );
  if (!article)
    return (
      <div className="text-gray-500 text-center mt-10 text-lg">
        No article found.
      </div>
    );

  const handleAction = (action, event) => {
    event.preventDefault();
    if (action === "edit") {
      navigate(`/dashboard/edit-article/${article._id}`);
    }
  };

  // Open the confirmation modal
  const openDeleteModal = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteArticle(article._id);
      setSubmitStatus("Article deleted successfully!");
      setIsModalOpen(false); // Close modal before navigation
      navigate("/dashboard/articles");
    } catch (error) {
      console.error("Delete error:", error);
      setSubmitStatus("Failed to delete article: " + error.message);
      setIsModalOpen(false); // Close modal even on error
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm mt-4 p-2 mb-6 lg:min-h-20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h1 className="mb-6 sm:mb-0 text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {article.title}
            </h1>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={(e) => handleAction("edit", e)}
                className="flex-1 sm:flex-none flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Edit size={18} className="mr-2" />
                Edit
              </button>
              <button
                onClick={openDeleteModal}
                className="flex-1 sm:flex-none flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <Trash2 size={18} className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Thumbnail and Description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Thumbnail */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img
                src={`http://localhost:5000${article.thumbnail}`}
                alt={article.title}
                className="w-full h-[400px] object-cover rounded-t-xl transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm p-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Description
                </h2>
                {article.isFeatured && (
                  <span className="text-green-500 font-medium">
                    Featured Article
                  </span>
                )}
              </div>
              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.description }}
              />
            </div>
          </div>

          {/* Right Column - Metadata and Tags */}
          <div className="space-y-6">
            {/* Metadata */}
            <div className="bg-white rounded-xl shadow-sm p-2">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Article Details
              </h3>
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-500 block">
                    Last Modified
                  </span>
                  <span className="text-gray-900">
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
                <div>
                  <span className="text-sm font-medium text-gray-500 block">
                    Read Time
                  </span>
                  <span className="text-gray-900">{article.readTime} min</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 block">
                    Author
                  </span>
                  <span className="text-gray-900">{article.author}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 block">
                    Category
                  </span>
                  <span className="inline-flex items-center px-3 py-1 mt-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {article.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl shadow-sm p-2">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Tags
              </h3>
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
        </div>
      </div>

      {/* Render the ConfirmDeleteModal */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        itemName={article.title} // Use article title instead of "this category"
      />
    </div>
  );
};

export default ArticlePage;