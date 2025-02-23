import React, { useState } from "react";
import Select from "react-select";
import useFetchMetadata from "../../components/hooks/useFetchMetadata";
import useFetchArticles from "../../components/hooks/useFetchArticles";

const DashBoardHomePage = () => {
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [tagsFilter, setTagsFilter] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  

  
  const {
    categories,
    tags,
    loading: metadataLoading,
    error: metadataError,
  } = useFetchMetadata();

  // Use the custom hook to fetch articles
  const {
    articles,
    loading: articlesLoading,
    error: articlesError,
  } = useFetchArticles({
    page,
    categoryFilter,
    tagsFilter,
    searchQuery
  });

  return (
    <div>
      <h1>Articles</h1>

      {/* Category Filter Select */}
      <Select
        options={categories}
        value={categoryFilter}
        onChange={(selectedOption) => setCategoryFilter(selectedOption || null)}
        placeholder="Filter by Category"
        isClearable
      />

      {/* Tags Filter Select */}
      <Select
        options={tags}
        value={tagsFilter} // Make sure the format is [{ value, label }]
        onChange={(selectedOptions) => setTagsFilter(selectedOptions || [])}
        isMulti
        placeholder="Filter by Tags"
      />

      <input
        type="text"
        placeholder="Search articles by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
      />

      {/* Loading and Error Handling for Metadata */}
      {metadataLoading && <p>Loading metadata...</p>}
      {metadataError && <p style={{ color: "red" }}>{metadataError}</p>}

      {/* Loading and Error Handling for Articles */}
      {articlesLoading && <p>Loading articles...</p>}
      {articlesError && <p style={{ color: "red" }}>{articlesError}</p>}

      {/* Articles List */}
      <ul>
        {articles.length > 0 ? (
          articles.map((article) => <li key={article._id}>{article.title}</li>)
        ) : (
          <p>No articles found.</p>
        )}
      </ul>

      {/* Pagination Controls */}
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default DashBoardHomePage;
