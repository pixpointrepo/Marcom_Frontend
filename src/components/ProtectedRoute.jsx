// src/components/ProtectedRoute.js
import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import AdminDashBoard from "../screens/adminscreens/AdminDashBoard"


 

const ProtectedRoute = () => {
  const { admin, loading, logout } = useContext(AuthContext);
  const [isValid, setIsValid] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (admin) {
      try {
        const decoded = jwtDecode(admin);
        
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          console.log("Token expired");
          logout(); // Clear invalid token
          setIsValid(false);
        } else {
          setIsValid(true);
        }
      } catch (error) {
        console.error("Invalid token");
        logout();
        setIsValid(false);
      }
    }
  }, [admin, logout, location]);
 if (loading) return null; // Prevent rendering before authentication check

  return admin && isValid ? <AdminDashBoard /> : <Navigate to="/pixadmin" />;
};

export default ProtectedRoute;
