/* eslint-disable */

import React from "react";
import { useNavigate } from "react-router-dom";

import htmlToPlainText from "../utils/htmlToPlainText";

const ArticleCard = ({ article, index, isHomeScreen }) => {
  const navigate = useNavigate();

  return (
    <div
      key={article.id}
      className={` bg-white p-2 border  rounded-md cursor-pointer overflow-hidden text-left hover:shadow-lg transition  ${
        isHomeScreen && index === 0 ? "md:col-span-2 " : "bg-[#EAEAEA]"
      }`}
      onClick={() => {
        navigate(`/${article.categoryUrl}/${article.url}`);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
    >
      {/* image */}
      <img
        src={`http://localhost:5000${article.thumbnail}`}
        alt={article.title}
        className={`${
          isHomeScreen && index === 0 ? "h-64" : "h-48"
        } w-full object-cover`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/placeholder-2.png"; // Fallback image path
        }}
      />

      {/* article content */}
      <div className="p-4">
        <h3
          className={`${
            isHomeScreen && index === 0 ? "text-2xl" : "text-lg"
          } font-semibold hover:text-blue-500`}
        >
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {htmlToPlainText(article.description)}
        </p>
        {/* article metadata */}
        <div className="mt-3 text-sm text-gray-500">
          
            {new Date(article.date).toLocaleString("en-US", {
              weekday: "short", // Optional: display day of the week (e.g., Mon, Tue)
              year: "numeric",
              month: "short", // Optional: display abbreviated month (e.g., Jan, Feb)
              day: "numeric",
              hour: "2-digit", // 12-hour clock
              minute: "2-digit", // 2-digit minute
              hour12: true, // Use 12-hour format
            })}
          {" "}
          ·{" "}
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
            
          </span>{" "}
          · <span>{article.author}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
