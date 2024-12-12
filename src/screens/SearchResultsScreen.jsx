/* eslint-disable */

import { useLocation } from 'react-router-dom';
import allArticles from '../data/articles';

import { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard';

const SearchResultsScreen = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTitle = queryParams.get('title'); 

  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    
    if (!searchTitle) {
      setFilteredArticles([]); 
      return;
    }

    // Filter articles based on search query
    const allArticlesArray = Object.values(allArticles).flatMap((data) => data.articles);
    const filtered = allArticlesArray.filter((article) =>
      article.title.toLowerCase().includes(searchTitle.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTitle.toLowerCase())
    );

    setFilteredArticles(filtered);

  }, [searchTitle]);  // Only re-run the effect if searchTitle changes

  if (!searchTitle) {
    return <p>Please enter a search term.</p>;
  }

  return (
    <div>
      <h1 className=' items-center justify-center m-4'>Search Results for: {searchTitle}</h1>
      {filteredArticles.length > 0 ? (
        <div >
          {filteredArticles.map((article, index) => (
            <ArticleCard article={article} index={index} />
          ))}
        </div>
      ) : (
        <p className='mt-20  text-center'>No articles found for {searchTitle}</p>
      )}
    </div>
  );
};

export default SearchResultsScreen;
