import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const typeOfUser = localStorage.getItem("typeOfUser");

  if (!token) return <Navigate to="/" />;
  if (!allowedRoles.includes(typeOfUser)) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
