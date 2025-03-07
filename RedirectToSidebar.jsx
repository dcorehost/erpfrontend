import React from "react";
import { Navigate } from "react-router-dom";
import Auth from "../Services/Auth"; // Ensure correct path

const RedirectToSidebar = () => {
  const user = Auth.getAuthData(); // Get user authentication data

  if (user?.token) {
    if (user?.typeOfUser === "Admin") {
      return <Navigate to="/admin-sidebar" replace />;
    } else if (user?.typeOfUser === "User") {
      return <Navigate to="/user-sidebar" replace />;
    } else if (user?.typeOfUser === "SuperAdmin") {
      return <Navigate to="/superadmin-sidebar" replace />;
    }
  }

  return <Navigate to="/signin" replace />; // Redirect to login if no token
};

export default RedirectToSidebar;
