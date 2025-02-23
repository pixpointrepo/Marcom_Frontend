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

    // Simulate a delay (e.g., 2 seconds)
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(config); // Proceed with the request after delay
    //   }, 2000);
    // });
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
// Admin login (No token needed for login request)
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
export const uploadArticle = async (postData) => {
    try {
      // Use the configured api (axios instance) to make the request
      const response = await api.post("/articles", postData);
  
      // If the request is successful, return the result
      console.log("Success:", response.data);
      return response.data;
    } catch (error) {
      // Handle errors by logging and rethrowing them
      console.error("Error:", error);
      throw error;  // Rethrow error to be handled by the caller
    }
  };

  //fetching all articles
  export const fetchArticles = async ({ page = 1, category = "", tags = "", date = "",search = "" ,limit = 10}) => {
    console.log("Sending tags:", tags);
    try {
        const response = await axios.get(`${API_URL}/articles`, {
            params: {
                page,
                limit,
                category,
                tags,
                date,
                search
            }
        });
        return response.data;
       
    } catch (error) {
        console.error("Error fetching articles:", error);
        throw error;
    }
};

export const fetchTags = async () => {
  try {
      const response = await axios.get(`${API_URL}/articles/tags`);
      
      // Remove duplicates but keep the original case
      const uniqueTags = Array.from(
          new Set(response.data) // No lowercase conversion
      ).map(tag => ({ value: tag, label: tag }));
      
      return uniqueTags;
  } catch (error) {
      console.error("Error fetching tags:", error);
      throw error;
  }
};


export const fetchCategories = async () => {
  try {
      const response = await axios.get(`${API_URL}/articles/categories`);
      
      // Extract unique categories
      const uniqueCategories = Array.from(
          new Set(response.data.map(cat => JSON.stringify(cat)))
      ).map(str => JSON.parse(str));
      
      return uniqueCategories;
  } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
  }
};
// Fetch article by ID
export const fetchArticleById = async (articleId) => {
  try {
    const response = await axios.get(`${API_URL}/articles/${articleId}`);
    return response.data; // Return the article data
  } catch (error) {
    throw new Error("Failed to fetch article");
  }
};

