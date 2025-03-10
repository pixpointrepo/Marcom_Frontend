/* eslint-disable */

import React from "react";
import { useNavigate } from "react-router-dom";

import htmlToPlainText from "../utils/htmlToPlainText";

const domain = import.meta.env.VITE_APP_BACKEND_DOMAIN;

// Helper function to calculate time difference or show future date
const formatDate = (date) => {
  const now = new Date();
  const articleDate = new Date(date);

  // If the article date is in the future, show the full formatted date
  if (articleDate > now) {
    return articleDate.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  // Otherwise, calculate time ago for past dates
  const seconds = Math.floor((now - articleDate) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 }, // Approx 30 days
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "min", seconds: 60 },
    { label: "sec", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }
  return "just now"; // Fallback for very recent posts
};

const ArticleCard = ({ article, index, isHomeScreen }) => {
  const navigate = useNavigate();

  return (
    <div
      key={article.id}
      className={`flex flex-col font-roboto bg-white p-2 border rounded-md cursor-pointer overflow-hidden text-left hover:shadow-lg transition ${
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
        src={`${domain}${article.thumbnail}`}
        alt={article.title}
        className={`${
          isHomeScreen && index === 0 ? "h-80" : "aspect-[16/9]"
        } w-full object-cover`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/placeholder-2.png"; // Fallback image path
        }}
      />

      {/* article content */}
      <div className="p-4 h-full flex flex-col justify-between">
        <div>
          <h3
            className={`${
              isHomeScreen && index === 0 ? "text-2xl" : "text-lg"
            } font-medium hover:text-blue-500`}
          >
            {article.title}
          </h3>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {htmlToPlainText(article.description)}
          </p>
        </div>
        {/* article metadata */}
        <div className="mt-3 text-sm text-gray-500">
          <span>{formatDate(article.date)}</span>
          {" "}·{" "}
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
            {article.readTime} min
          </span>{" "}
          · <span>{article.author}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;