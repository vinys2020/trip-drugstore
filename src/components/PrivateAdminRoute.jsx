import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminCheck } from "../hooks/useAdminCheck";

const PrivateAdminRoute = ({ children }) => {
  const { isAdmin, loading, isAuthenticated } = useAdminCheck();

  if (loading) return <div>Cargando acceso...</div>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
};

export default PrivateAdminRoute;
