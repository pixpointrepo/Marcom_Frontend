import axios from "axios";

const API_URL = "http://localhost:5000/api";

const getToken = () => localStorage.getItem("adminToken");

const api = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to automatically include token in headers
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
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
  tags = "",
  date = "",
  search = "",
  limit = 10,
  isFeatured = null,
}) => {
  console.log("Sending tags:", tags);
  console.log("Sending feature:", isFeatured);
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
    throw new Error("Failed to fetch article");
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
    throw new Error(error.response?.data?.message || "Failed to fetch categories");
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