// src/context/AuthContext.js

import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [token, setToken] = useState(localStorage.getItem('token') || null);
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);

        // Check if token is expired
        // the .exp converts the expiry time into seconds and compares it with current timestamp (in milliseconds)
        if (decoded.exp * 1000 < Date.now()) {
          console.log("Token expired");
          localStorage.removeItem("adminToken");
          setAdmin(null);
        } else {
          setAdmin(token);
        }
      } catch (error) {
        console.error("Invalid token");
        localStorage.removeItem("adminToken");
        setAdmin(null);
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("adminToken", token);
    setAdmin(token); // Save token to localStorage
    window.location.href = "/dashboard";
  };

  const logout = () => {
  
    localStorage.removeItem("adminToken");
    setAdmin(null);
    window.location.href = "/pixadmin"; // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
