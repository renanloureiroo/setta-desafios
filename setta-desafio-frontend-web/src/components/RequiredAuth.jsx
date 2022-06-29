import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const RequireAuth = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to={{ pathname: "/signin", state: { from: location } }}
        replace
      />
    );
  }

  return children;
};
