import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useLoginStatus from "../hooks/useLoginStatus";

const RequireAuth = () => {
  const location = useLocation();
  const isLoggedIn = useLoginStatus();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;