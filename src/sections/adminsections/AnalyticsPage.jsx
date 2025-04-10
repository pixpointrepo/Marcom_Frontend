// src/pages/Analytics.js
import React, { useState, useEffect } from "react";
import {ChartColumnIncreasing}  from "lucide-react"; 
import {
  fetchAnalyticsOverview,
  fetchViewsOverTime,
  fetchViewsByCategory,
  fetchArticleAnalytics,
  fetchTrends,
} from "../../services/api";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useFetchMetadata from "../../components/hooks/useFetchMetadata"; // Adjust path as needed

import formatDate from "../../utils/formatDate";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const end = new Date().toISOString().split("T")[0]; // Today's date
const start = new Date(new Date().setDate(new Date().getDate() - 30))
  .toISOString()
  .split("T")[0]; // 30 days ago

const AnalyticsPage = () => {
  const [overviewData, setOverviewData] = useState(null);
  const [viewsOverTime, setViewsOverTime] = useState([]);
  const [viewsByCategory, setViewsByCategory] = useState([]);
  const [articleAnalytics, setArticleAnalytics] = useState([]);
  const [trendsData, setTrendsData] = useState([]);
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);
  const [trendsGranularity, setTrendsGranularity] = useState("day");
  const [trendsCategory, setTrendsCategory] = useState("");
  const [articlesLimit, setArticlesLimit] = useState(10); // Default to 10
  const [articlesCategory, setArticlesCategory] = useState("");
  const [articlesSortOrder, setArticlesSortOrder] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
localhost
  const IMG_URL = import.meta.env.VITE_APP_BACKEND_DOMAIN || "http://localhost:5000";

  const {
    categories,
    loading: metadataLoading,
    error: metadataError,
  } = useFetchMetadata();

  useEffect(() => {
    fetchData();
  }, [
    startDate,
    endDate,
    trendsGranularity,
    trendsCategory,
    articlesLimit,
    articlesCategory,
    articlesSortOrder,
  ]);

  const fetchData = async () => {
    // console.log("aaa", articlesCategory);
    try {
      setLoading(true);
      setError(null);

      const [overview, viewsTime, viewsCategory, articles, trends] =
        await Promise.all([
          fetchAnalyticsOverview(startDate, endDate),
          fetchViewsOverTime(startDate, endDate),
          fetchViewsByCategory(startDate, endDate),
          fetchArticleAnalytics(
            startDate,
            endDate,
            articlesLimit,
            articlesSortOrder,
            articlesCategory
          ),
          fetchTrends(startDate, endDate, trendsGranularity, trendsCategory),
        ]);

      setOverviewData(overview);
      setViewsOverTime(viewsTime);
      setViewsByCategory(viewsCategory);
      setArticleAnalytics(articles);
      setTrendsData(trends);
    } catch (err) {
      setError("Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchData();
  };

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    setTrendsGranularity("day");
    setTrendsCategory("");
    setArticlesLimit(10);
    setArticlesCategory("");
    setArticlesSortOrder("desc");
  };

  const formatOverviewData = () => {
    if (!overviewData) return [];
    const dataArray = Array.isArray(overviewData)
      ? overviewData
      : [overviewData];
    return dataArray.map((data, index) => ({
      date:
        data.date ||
        (startDate && endDate ? `${formatDate(startDate)} to ${endDate}` : "All Time"),
      totalViews: data.totalViews,
      uniqueUsers: data.uniqueUsers,
      avgViewsPerUser: parseFloat(data.avgViewsPerUser).toFixed(2),
      articlesViewed: data.articlesViewed,
    }));
  };

  

  // Views Over Time Line Chart
  const viewsOverTimeChartData = {
    labels: viewsOverTime.map((item) => item.date),
    datasets: [
      {
        label: "Page Views",
        data: viewsOverTime.map((item) => item.views),
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const viewsOverTimeChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Page Views Over Time",
        font: { size: 18 },
      },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { title: { display: true, text: "Date" } },
      y: { beginAtZero: true, title: { display: true, text: "Views" } },
    },
    hover: { mode: "nearest", intersect: true },
  };

  // Trends Bar Chart
  const trendsChartData = {
    labels: trendsData.map((item) => item.time),
    datasets: [
      {
        label: "Views",
        data: trendsData.map((item) => item.views),
        backgroundColor: "rgba(139, 92, 246, 0.6)",
        borderColor: "#8B5CF6",
        borderWidth: 1,
      },
    ],
  };

  const trendsChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "View Trends", font: { size: 18 } },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        title: {
          display: true,
          text:
            trendsGranularity.charAt(0).toUpperCase() +
            trendsGranularity.slice(1),
        },
      },
      y: { beginAtZero: true, title: { display: true, text: "Views" } },
    },
  };

  const overviewToDisplay = formatOverviewData();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className=" text-3xl flex items-center a font-bold text-gray-800 mb-6 ">
        <h1 className="mr-4">Analytics</h1>
        <ChartColumnIncreasing  size={26}  />
      </div>

      {/* Filter Section */}
      <form
        onSubmit={handleFilter}
        className="flex flex-col sm:flex-row gap-4 mb-8 bg-gray-50 p-6 rounded-lg shadow-md"
      >
        <div className="flex flex-col w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div className="flex flex-col w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div className="flex gap-4 self-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Apply"}
          </button>
          <button
            type="button"
            onClick={clearFilters}
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
          >
            Clear
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6 text-center">
          {error}
        </div>
      )}
      <div className="flex w-full justify-between items-start gap-6 ">
        {/* Overview Cards */}
        {overviewToDisplay.length > 0 && (
          <div className="w-1/2 bg-white rounded-lg shadow-md p-6 h-80 ">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Overview
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {overviewToDisplay.map((data, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {data.date}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                      Total Views:
                    </span>
                    <span className="text-emerald-600 font-bold">
                      {data.totalViews}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                      Unique Viewers:
                    </span>
                    <span className="text-blue-600 font-bold">
                      {data.uniqueUsers}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                      Avg Views/User:
                    </span>
                    <span className="text-purple-600 font-bold">
                      {data.avgViewsPerUser}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                      Articles Viewed:
                    </span>
                    <span className="text-amber-600 font-bold">
                      {data.articlesViewed}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Views By Category List */}
        {viewsByCategory.length > 0 && (
          <div className="w-1/2 bg-white p-6 rounded-lg shadow-md h-80 overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Views by Category
            </h2>
            <div className="flex justify-between w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Category
              </h3>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Views
              </h3>
            </div>
            <ul className="space-y-3">
              {viewsByCategory.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <span className="text-gray-700 font-medium truncate">
                    {item.category}
                  </span>
                  <span className="text-blue-600 font-bold">{item.views}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Views Over Time Chart */}
      {viewsOverTime.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <Line
            data={viewsOverTimeChartData}
            options={viewsOverTimeChartOptions}
          />
        </div>
      )}

      {/* Trends Bar Chart with Dropdowns */}

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">
            View Trends
          </h2>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Granularity
              </label>
              <select
                value={trendsGranularity}
                onChange={(e) => setTrendsGranularity(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="hour">Hour</option>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={trendsCategory}
                onChange={(e) => setTrendsCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                disabled={metadataLoading || metadataError}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.label} value={cat.label}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {trendsData.length > 0 ? (
          <Bar data={trendsChartData} options={trendsChartOptions} />
        ) : (
          <div className="text-center text-gray-600 text-lg mt-4 h-40 flex items-center justify-center">
            No trends data available
          </div>
        )}
      </div>

      {/* Top 5 Articles List */}
      {/* {articleAnalytics.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Top 5 Articles
          </h2>
          <div className="flex justify-between w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Article Title
            </h3>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Views</h3>
          </div>
          <div className="max-h-64 overflow-y-auto">
            <ul className="space-y-3">
              {articleAnalytics.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <span className="text-gray-700 font-medium truncate max-w-[70%]">
                    {item.title}
                  </span>
                  <span className="text-purple-600 font-bold">
                    {item.views}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )} */}

      {/* Top Articles List with Dropdowns */}

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">
            Top Articles
          </h2>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Limit
              </label>
              <select
                value={articlesLimit}
                onChange={(e) => setArticlesLimit(parseInt(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={articlesCategory}
                onChange={(e) => setArticlesCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                disabled={metadataLoading || metadataError}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Sort Order
              </label>
              <select
                value={articlesSortOrder}
                onChange={(e) => setArticlesSortOrder(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 w-full mb-2">
          <h3 className="col-span-2 text-lg font-semibold text-gray-800">
            Thumbnail
          </h3>
          <h3 className="col-span-6 text-lg font-semibold text-gray-800">
            Article Title
          </h3>
          <h3 className="col-span-2 text-lg font-semibold text-gray-800 text-center">
            Views
          </h3>
          <h3 className="col-span-2 text-lg font-semibold text-gray-800 text-center">
            Unique Viewers
          </h3>
        </div>
        <div className="min-h-[300px] max-h-96 overflow-y-auto">
          {articleAnalytics.length > 0 ? (
            <ul className="space-y-3">
              {articleAnalytics.map((item, index) => (
                <li
                  key={index}
                  className="grid grid-cols-12 gap-2 items-center p-2 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <div className="col-span-2">
                    {item.thumbnail ? (
                      <img
                        src={`${IMG_URL}${item.thumbnail}`}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded-md border border-gray-200"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-sm">
                        No Image
                      </div>
                    )}
                  </div>
                  <span className="col-span-6 text-gray-700 font-medium truncate">
                    {item.title}
                  </span>
                  <span className="col-span-2 text-purple-600 font-bold text-center">
                    {item.views}
                  </span>
                  <span className="col-span-2 text-blue-600 font-bold text-center">
                    {item.uniqueUsers}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-600 text-lg mt-4 h-40 flex items-center justify-center">
              No articles data available
            </div>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center text-gray-600 text-lg mt-4">
          Loading analytics data...
        </div>
      )}

      {/* No Data State */}
      {!loading &&
        overviewToDisplay.length === 0 &&
        viewsOverTime.length === 0 &&
        viewsByCategory.length === 0 &&
        articleAnalytics.length === 0 &&
        trendsData.length === 0 &&
        !error && (
          <div className="text-center text-gray-600 text-lg mt-4">
            No analytics data available
          </div>
        )}
    </div>
  );
};

export default AnalyticsPage;
