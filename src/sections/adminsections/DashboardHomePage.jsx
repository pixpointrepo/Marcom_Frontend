import React, { useState, useEffect } from 'react';
import useFetchArticles from "../../components/hooks/useFetchArticles";
import { fetchAnalyticsOverview } from "../../services/api"; // Adjust path as needed

function DashboardHomePage() {
  // Set current date dynamically
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  }); // e.g., "March 07, 2025"

  const { totalArticle } = useFetchArticles({ page: 1 });

  // State for analytics data
  const [analyticsData, setAnalyticsData] = useState({
    totalViews: 0,
    uniqueUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch analytics overview data on mount
  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true);
        const data = await fetchAnalyticsOverview(); // No date filters, fetch all data
        setAnalyticsData({
          totalViews: data.totalViews || 0,
          uniqueUsers: data.uniqueUsers || 0,
        });
      } catch (err) {
        setError("Failed to load analytics data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#111827] text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin</h1>
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
        {loading ? (
          <div className="text-gray-600">Loading data...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="flex space-x-6">
            <div className="bg-white p-6 rounded-lg shadow-md w-40 text-center">
              <h3 className="text-lg font-medium text-gray-700">Total Articles</h3>
              <p className="text-2xl font-bold text-gray-800">{totalArticle || 0}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-40 text-center">
              <h3 className="text-lg font-medium text-gray-700">Viewers</h3>
              <p className="text-2xl font-bold text-gray-800">{analyticsData.uniqueUsers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-40 text-center">
              <h3 className="text-lg font-medium text-gray-700">Views</h3>
              <p className="text-2xl font-bold text-gray-800">{analyticsData.totalViews}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default DashboardHomePage;