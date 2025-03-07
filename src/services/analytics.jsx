// src/api/analyticsApi.js
import axios from "axios";

const API_BASE_URL = "/api/analytics"; // Adjust based on your backend URL

const buildQueryString = (params) =>
  new URLSearchParams(params).toString();

export const fetchViewsPerArticle = async (startDate, endDate) => {
  try {
    const query = buildQueryString({ startDate, endDate });
    const response = await axios.get(`${API_BASE_URL}/views-per-article?${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching views per article:", error);
    throw error;
  }
};

export const fetchViewsOverTime = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/views-over-time`);
    return response.data;
  } catch (error) {
    console.error("Error fetching views over time:", error);
    throw error;
  }
};

export const fetchViewsByCategory = async (startDate, endDate) => {
  try {
    const query = buildQueryString({ startDate, endDate });
    const response = await axios.get(`${API_BASE_URL}/views-by-category?${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching views by category:", error);
    throw error;
  }
};

export const fetchAnalyticsOverview = async (startDate, endDate) => {
  try {
    const query = buildQueryString({ startDate, endDate });
    const response = await axios.get(`${API_BASE_URL}/overview?${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching analytics overview:", error);
    throw error;
  }
};

export const fetchArticleAnalytics = async (params) => {
  try {
    const query = buildQueryString(params);
    const response = await axios.get(`${API_BASE_URL}/article-analytics?${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching article analytics:", error);
    throw error;
  }
};

export const fetchTrends = async (params) => {
  try {
    const query = buildQueryString(params);
    const response = await axios.get(`${API_BASE_URL}/trends?${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching trends:", error);
    throw error;
  }
};