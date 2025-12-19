import React from "react";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "../Util/LoadingSpinner";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoutes;
