/* eslint-disable */

import React from 'react'
import allArticles from '../data/articles';
import latestStories from '../data/latest_stories';
import { useNavigate } from "react-router-dom";
import ArticleCard from '../components/ArticleCard';

const HomeScreen = () => {
  const navigate = useNavigate();
    return (
      <>
      {Object.keys(allArticles).map((categoryKey, idx) => {
        const categoryData = allArticles[categoryKey];
        const { category, urlSlug,  articles } = categoryData;  // Destructure category and articles

        return (
          <div key={idx} className="space-y-4">
            {/* category title */}
            {
              category === 'Overview'?  
              null:
                <div className="flex items-center">
                  <h2 className="text-2xl text-left font-semibold text-blue-500">{category}</h2>
                  <div className='ml-4 w-32 h-0.5 bg-blue-500'></div>
                </div>
            }
            
            {/* Display the articles in that category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map((article, index) => (
                <ArticleCard article={article} index={index} isHomeScreen={true}  />
              ))}
            </div>
          </div>
        );
      })}
      </>
    );
  };
  
  export default HomeScreen;