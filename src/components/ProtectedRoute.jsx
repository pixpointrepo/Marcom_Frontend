// src/components/ProtectedRoute.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminDashBoard from '../screens/adminscreens/AdminDashBoard';

const ProtectedRoute = () => {
  const { token } = useAuth();

  // If the user is not authenticated, redirect to login page
  if (!token) {
    return <Navigate to="/pixadmin" />;
  }

  // If authenticated, allow access to the admin pages
  return <AdminDashBoard />;
};

export default ProtectedRoute;
