import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


const getToken = () => localStorage.getItem("adminToken");

const api = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to automatically include token in headers
api.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }

    // Simulate loading by delaying the request
    // await new Promise((resolve) => setTimeout(resolve, 4000)); // 2-second delay

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle unauthorized errors (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Logging out...");
      localStorage.removeItem("adminToken"); // Clear invalid token
      window.location.href = "/pixadmin"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

// Admin login (No token needed for login request, but using api for consistency)
export const adminLogin = async (email, password) => {
  try {
    const response = await api.post(
      "/auth/login",
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during login request:", error);
    throw error;
  }
};

// Upload article
export const uploadArticle = async (postData) => {
  try {
    const response = await api.post("/articles", postData);
    console.log("Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Fetch all articles
export const fetchArticles = async ({
  page = 1,
  category = "",
  tags = [],
  date = "",
  search = "",
  limit = 10,
  isFeatured = null,
}) => {
  try {
    const response = await api.get("/articles", {
      params: {
        page,
        limit,
        category,
        tags,
        date,
        search,
        isFeatured,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

// fetch articles for homepage
export const fetchHomepageArticles = async (limit = 5) => {
  try {
    const response = await api.get(`/articles/homepage?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching homepage articles:", error);
    throw error;
  }
};

// Fetch tags
export const fetchTags = async () => {
  try {
    const response = await api.get("/articles/tags");
    const uniqueTags = Array.from(new Set(response.data)).map((tag) => ({
      value: tag,
      label: tag,
    }));
    return uniqueTags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};

// Fetch categories
export const fetchCategories = async () => {
  try {
    const response = await api.get("/articles/categories");
    const uniqueCategories = Array.from(
      new Set(response.data.map((cat) => JSON.stringify(cat)))
    ).map((str) => JSON.parse(str));
    return uniqueCategories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Fetch article by ID
export const fetchArticleById = async (articleId) => {
  try {
    const response = await api.get(`/articles/${articleId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to load article");
  }
};

// Fetch article by url
export const fetchArticleByUrl = async (url) => {
  try {
    const response = await api.get(`/articles/url/${url}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to load article");
  }
};


// Update article
export const updateArticle = async (articleId, formData) => {
  try {
    const response = await api.put(`/articles/${articleId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating article:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to update article");
  }
};

// Delete article
export const deleteArticle = async (articleId) => {
  try {
    const response = await api.delete(`/articles/${articleId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting article:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to delete article");
  }
};

// Create multiple featured categories at once
export const createFeaturedCategories = async (names) => {
  try {
    const response = await api.post("/categories", { names }, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data; // { message: "Categories added successfully", categories: [...] }
  } catch (error) {
    console.error("Error creating categories:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to create categories");
  }
};

// Get all featured categories
export const getFeaturedCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data; // Array of category objects
  } catch (error) {
    console.error("Error fetching categories:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to load categories");
  }
};

// Delete featured category by ID
export const deleteFeaturedCategory = async (categoryId) => {
  try {
    const response = await api.delete(`/categories/${categoryId}`);
    return response.data; // { message: "Category deleted successfully" }
  } catch (error) {
    console.error("Error deleting category:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to delete category");
  }
};

// src/services/api.js
export const logPageView = async ( pageUrl,userUuid, articleId) => {
  try {
    const response = await api.post(`/analytics/pageview`, { // Changed to /analytics/pageview
      pageUrl,
      userUuid,
      articleId,
    });
    return response.data;
  } catch (error) {
    console.error('Error logging page view:', error);
  }
}
// Upload article
export const submitForm = async (postData) => {
  try {
    const response = await api.post("/form/submit", postData);
    console.log("Success:", response.data);
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Get all submitted forms
export const getFormData = async () => {
  try {
    const response = await api.get("/form");
    return response.data; // Array of category objects
  } catch (error) {
    console.error("Error fetching formdata:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to load form data");
  }
};


// Update a category by ID (placeholder since not provided)
// export const updateCategory = async (categoryId, categoryData) => {
//   try {
//     const response = await api.put(`/categories/${categoryId}`, categoryData, {
//       headers: { "Content-Type": "application/json" },
//     });
//     return response.data; // Expected: Updated category object or success message
//   } catch (error) {
//     console.error("Error updating category:", error.response?.data || error.message);
//     throw new Error(error.response?.data?.message || "Failed to update category");
//   }
// };



export const fetchViewsOverTime = async (startDate, endDate) => {
  try {
    const url = startDate && endDate 
      ? `/analytics/views-over-time?startDate=${startDate}&endDate=${endDate}`
      : '/analytics/views-over-time';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching views over time:", error);
    throw error;
  }
};
export const fetchViewsByCategory = async (startDate, endDate) => {
  try {
    const url = startDate && endDate 
      ? `analytics/views-by-category?startDate=${startDate}&endDate=${endDate}`
      : 'analytics/views-by-category';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching views by category:", error);
    throw error;
  }
};

export const fetchAnalyticsOverview = async (startDate, endDate) => {
  try {
    // If no dates provided, fetch all data; otherwise fetch filtered data
    const url = startDate && endDate 
      ? `/analytics/overview?startDate=${startDate}&endDate=${endDate}`
      : '/analytics/overview';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching analytics overview:", error);
    throw error;
  }
};

export const fetchArticleAnalytics = async (startDate, endDate, limit = 5, sortOrder = 'desc',category) => {
  try {
    let url = `/analytics/article-analytics?limit=${limit}&sortOrder=${sortOrder}&category=${category}`;
    if (startDate && endDate) {
      url += `&startDate=${startDate}&endDate=${endDate}`;
    }
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching article analytics:", error);
    throw error;
  }
};

export const fetchTrends = async (startDate, endDate, granularity = 'day', category) => {
  try {
    let url = `/analytics/trends?granularity=${granularity}`;
    if (startDate && endDate) url += `&startDate=${startDate}&endDate=${endDate}`;
    if (category) url += `&category=${category}`;
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching trends:", error);
    throw error;
  }
};

