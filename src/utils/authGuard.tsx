import { Navigate } from "react-router-dom";
import type { ReactElement } from "react";

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("emailId");
};

/** Wrap a route element to require auth */
export const RequireAuth = ({ children }: { children: ReactElement }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
