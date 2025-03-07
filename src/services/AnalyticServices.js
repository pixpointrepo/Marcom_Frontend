// analyticsService.js - Handles API calls for analytics

const API_BASE_URL = '/api/analytics';

export const fetchViewsPerArticle = async (startDate, endDate) => {
  try {
    console.log('Calling API: fetchViewsPerArticle', { startDate, endDate });
    const response = await fetch(
      `${API_BASE_URL}/views-per-article?startDate=${startDate}&endDate=${endDate}`
    );
    const data = await response.json();
    console.log('Response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching views per article:', error);
    return [];
  }
};

export const fetchViewsOverTime = async () => {
  try {
    console.log('Calling API: fetchViewsOverTime');
    const response = await fetch(`${API_BASE_URL}/views-over-time`);
    const data = await response.json();
    console.log('Response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching views over time:', error);
    return [];
  }
};

export const fetchViewsByCategory = async (startDate, endDate) => {
  try {
    console.log('Calling API: fetchViewsByCategory', { startDate, endDate });
    const response = await fetch(
      `${API_BASE_URL}/views-by-category?startDate=${startDate}&endDate=${endDate}`
    );
    const data = await response.json();
    console.log('Response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching views by category:', error);
    return [];
  }
};

export const fetchAnalyticsOverview = async (startDate, endDate) => {
  try {
    console.log('Calling API: fetchAnalyticsOverview', { startDate, endDate });
    const response = await fetch(
      `${API_BASE_URL}/overview?startDate=${startDate}&endDate=${endDate}`
    );
    const data = await response.json();
    console.log('Response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching analytics overview:', error);
    return null;
  }
};

export const fetchArticleAnalytics = async (startDate, endDate, category, limit = 10) => {
  try {
    console.log('Calling API: fetchArticleAnalytics', { startDate, endDate, category, limit });
    const response = await fetch(
      `${API_BASE_URL}/article-analytics?startDate=${startDate}&endDate=${endDate}&category=${category}&limit=${limit}`
    );
    const data = await response.json();
    console.log('Response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching article analytics:', error);
    return [];
  }
};

export const fetchTrends = async (startDate, endDate, granularity = 'day', category) => {
  try {
    console.log('Calling API: fetchTrends', { startDate, endDate, granularity, category });
    const response = await fetch(
      `${API_BASE_URL}/trends?startDate=${startDate}&endDate=${endDate}&granularity=${granularity}&category=${category}`
    );
    const data = await response.json();
    console.log('Response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching trends:', error);
    return [];
  }
};
