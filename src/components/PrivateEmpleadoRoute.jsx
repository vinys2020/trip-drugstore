import React from "react";
import { Navigate } from "react-router-dom";
import { useEmpleadoCheck } from "../hooks/useEmpleadoCheck";

const PrivateEmpleadoRoute = ({ children }) => {
  const { isEmpleado, loading, isAuthenticated } = useEmpleadoCheck();

  if (loading) return <div>Cargando acceso...</div>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (!isEmpleado) return <Navigate to="/" replace />;

  return children;
};

export default PrivateEmpleadoRoute;
