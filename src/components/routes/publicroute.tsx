import { Navigate, Outlet } from "react-router-dom";
import { hasToken } from "../../utils/token/tokenkey";

const PublicRoute = () => {
  if (hasToken()) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default PublicRoute;