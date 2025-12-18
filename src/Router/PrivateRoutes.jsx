import React from "react";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "../Util/LoadingSpinner";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  if (user) return children;

  return <Navigate to="/auth/login" state={location.pathname} replace="true" />;
};

export default PrivateRoutes;
