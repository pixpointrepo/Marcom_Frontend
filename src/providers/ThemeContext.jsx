/* eslint-disable */

// ThemeContext.js
import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  
  /*
  // const [darkMode, setDarkMode] = useState(false);
  // runs once when the component mounts (because the dependency array [] is empty), similar to initState
  // Load saved dark mode state from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    console.log('darkmode value initially: '+ savedMode);
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  // Ensures this effect runs only when darkMode changes, avoiding unnecessary re-renders. similar to didChangeDependencies
  // Persist dark mode state in localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    console.log('darkmode value changed: '+ darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
  
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

   */

  const [darkMode, setDarkMode] = useState(() => {
    // read the value initially when the component renders for the first time from the localstorage and set the value of darkMode
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false; // Default to false if no value exists
  });

  // Apply the `dark` class to <html> and persist in localStorage whenever darkMode changes
  useEffect(() => {
    
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);


  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
