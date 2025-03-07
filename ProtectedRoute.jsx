import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Auth from "../Services/Auth"; // Ensure correct path

const ProtectedRoute = () => {
  const user = Auth.getAuthData(); // Get user authentication data

  if (!user?.token) {
    return <Navigate to="/signin" replace />; // Redirect to login if not authenticated
  }

  return <Outlet />; // Render the protected component
};

export default ProtectedRoute;
