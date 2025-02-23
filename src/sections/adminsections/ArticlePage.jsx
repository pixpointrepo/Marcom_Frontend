import React from "react";
import { useParams } from "react-router-dom";
import useFetchArticleById from "../../components/hooks/useFetchArticleById";
import { Edit, Trash2 } from "lucide-react"; // Importing Lucide icons
import { useNavigate } from 'react-router-dom';


const ArticlePage = () => {
  const { title, id } = useParams(); // Get the title and id from the URL
  const { article, loading, error } = useFetchArticleById(id); // Use the custom hook to fetch article by ID
  const navigate = useNavigate(); // Get the navigate function
    

  // Handle loading, error, and missing article cases
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!article) return <p>No article found.</p>;

  
  // Handle Edit/Delete actions
  const handleAction = (action, articleId) => {
  
    if (action === "edit") {
      console.log(article._id)
      // Navigate to the edit page and pass the articleId as part of the URL
      navigate(`/dashboard/edit-article/${article._id}`);
    } else if (action === "delete") {
      console.log(`Delete article ${articleId}`);
      // Implement delete logic here
    }
  };
  

  return (
    <div className="w-full mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex w-full justify-between  flex-col sm:flex-row sm:pl-10 md:pl-0">
        <div className="flex justify-end sm:order-2">
            {/* Edit and Delete buttons */}
            <div className="flex gap-3 mb-2 ">
              <button
                onClick={() => handleAction("edit")}
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Edit size={18} className="mr-2" />
                Edit
              </button>
              <button
                onClick={() => handleAction("delete")}
                className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <Trash2 size={18} className="mr-2" />
                Delete
              </button>
            </div>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 sm:order-1">
            {article.title}
          </h1>
         
        </div>
      </div>

      {/* Thumbnail */}
      <div className="mb-6">
        <img
            src={`http://localhost:5000${article.thumbnail}`}
  
          alt={article.title}
          className="w-full h-72 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Article Description */}
      <strong className=" text-gray-500 text-lg">Description</strong>
      <p className="text-lg text-gray-700 mb-4">{article.description}</p>

      {/* Article Metadata */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-500 mb-6">
        <div>
          <strong>Last Modified:</strong>{" "}
          {new Date(article.date).toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </div>
        <div>
          <strong>Read Time:</strong> {article.readTime} minutes
        </div>
        <div>
          <strong>Author:</strong> {article.author}
        </div>
        <div>
          <strong>Category:</strong> {article.category}
        </div>
        <div className="col-span-2 sm:col-span-3">
          <strong>Tags:</strong> {article.tags.join(", ")}
        </div>
      </div>

      {/* Additional Content (Optional) */}
      <div className="text-gray-600">
        {/* You can add more sections for the article's body, comments, etc. */}
      </div>
    </div>
  );
};

export default ArticlePage;
