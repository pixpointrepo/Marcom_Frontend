/* eslint-disable */

import React from "react";
import allNewsArticles from "../data/articles";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import ArticleCardSkeleton from "../components/skeletons/ArticleCardSkeleton";

import useFetchHomePage from "../components/hooks/useFetchHomePage";
import ErrorScreen from "./ErrorScreen";

const HomeScreen = () => {
  const navigate = useNavigate();
  // const { articles, loading, error } = useFetchHomePage(5); // Limit of 5 articles per category
  const { data: articles, isLoading: loading, error } = useFetchHomePage(5);

  if (error) return <ErrorScreen  />;

  return (
 
      <>
        {loading
          ? // Show Skeleton Loader while data is loading
            
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(5)].map((_, index) => (
                    <ArticleCardSkeleton
                      key={index}
                      index={index}
                      isHomeScreen={true}
                    />
                  ))}
                </div>
            
          : // Show Articles when data is loaded
            Object.keys(articles).map((categoryKey, idx) => {
              const categoryArticles = articles[categoryKey];

              return (
                <div key={idx} className="space-y-4">
                  {/* Category Title (except for featuredArticles) */}
                  {categoryKey !== "featuredArticles" && (
                    <div className="flex items-center">
                      <h2 className="text-2xl text-left font-semibold text-blue-500">
                        {categoryKey}
                      </h2>
                      <div className="ml-4 w-32 h-0.5 bg-blue-500"></div>
                    </div>
                  )}

                  {/* Display Articles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categoryArticles.map((article, index) => (
                      <ArticleCard
                        key={article._id}
                        article={article}
                        index={index}
                        isHomeScreen={true}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
      </>
      );
   
  
};

export default HomeScreen;
