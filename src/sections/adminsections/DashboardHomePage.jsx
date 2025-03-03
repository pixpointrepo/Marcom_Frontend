import React from 'react';
import useFetchMetadata from "../../components/hooks/useFetchMetadata";
import useFetchArticles from "../../components/hooks/useFetchArticles";



function DashboardHomePage() {
  const currentDate = "March 03, 2025"; // Static date for placeholder
  const {
    categories,
    tags,
    loading: metadataLoading,
    error: metadataError,
  } = useFetchMetadata();

  const {
    totalFetchedPages,
    articles,
    totalArticle,
    loading: articlesLoading,
    error: articlesError,
  } = useFetchArticles({
    page:1,
   

  });
  console.log("pages",totalArticle)

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#111827] text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold"> Admin</h1>
        <div className="flex items-center space-x-4">
          <span>{currentDate}</span>
          
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-6 flex flex-col items-center justify-center bg-gray-100">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Welcome to the Marcom Admin Dashboard
        </h2>
        <p className="text-gray-600 mb-6">
          This is a dashboard for managing content
        </p>
        <div className="flex space-x-6">
          <div className="bg-white p-6 rounded-lg shadow-md w-40 text-center">
            <h3 className="text-lg font-medium text-gray-700">Total Articles</h3>
            <p className="text-gray-500">0{totalArticle}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-40 text-center">
            <h3 className="text-lg font-medium text-gray-700">Users</h3>
            <p className="text-gray-500">0 (Placeholder)</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-40 text-center">
            <h3 className="text-lg font-medium text-gray-700">Views</h3>
            <p className="text-gray-500">0 (Placeholder)</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardHomePage;