import useLoginStatus from "../hooks/useLoginStatus";
import { Navigate, Outlet } from 'react-router-dom';

const PreAuth = () => {
  const loggedIn = useLoginStatus();

  if (loggedIn) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}

export default PreAuth;