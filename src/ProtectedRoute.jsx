import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const typeOfUser = localStorage.getItem("typeOfUser");

  // Check for a valid token
  if (!token) {
    return <Navigate to="/" replace />; // Use replace to avoid history stack
  }

  // Check if user has the correct role
  if (!allowedRoles.includes(typeOfUser)) {
    return <Navigate to="/" replace />; // Use replace to avoid history stack
  }

  return children;
};

export default ProtectedRoute;
