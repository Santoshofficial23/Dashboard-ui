import { Navigate, Outlet, useLocation } from "react-router-dom";
import { hasToken } from "../../utils/token/tokenkey";

const ProtectedRoute = () => {
  const location = useLocation();

  if (!hasToken()) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;