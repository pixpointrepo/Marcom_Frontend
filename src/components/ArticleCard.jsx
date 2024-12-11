/* eslint-disable */

import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArticleCard = ({ article, index, isSearchScreen }) => {
  const navigate = useNavigate();

  return (
    <div
      key={article.id}
      className={`bg-white p-2 rounded-md cursor-pointer overflow-hidden text-left hover:shadow-lg transition ${
        isSearchScreen || index === 0 ? "md:col-span-2 border border-gray-300" : "bg-gray-100"
      }`}
      onClick={() =>
        navigate(
          `/${article.categoryUrl}/${article.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")}`
        )
      }
    >
      <img
        src={article.thumbnail}
        alt={article.title}
        className={`${isSearchScreen || index === 0 ? "h-64" : "h-48"} w-full object-cover`}
      />
      <div className="p-4">
        <h3 className={`${isSearchScreen || index === 0 ? "text-2xl" : "text-lg"} font-semibold hover:text-blue-500`}>
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{article.summary}</p>
        <div className="mt-3 text-sm text-gray-500">
          <span>{article.date}</span> ·{" "}
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
