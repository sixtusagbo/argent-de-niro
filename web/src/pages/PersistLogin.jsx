import { useEffect, useState } from 'react';
import useRefreshToken from '../../hooks/useRefreshToken';
import useAuth from '../../hooks/useAuth';
import { Outlet } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth } = useAuth();
  const [remember] = useLocalStorage('remember', false);

  useEffect(() => {
    let isMounted = true;

    if (remember) {
      const auth = JSON.parse(localStorage.getItem('orot'));

      if (auth) {
        isMounted && setAuth(auth);
      }
    }

    isMounted && setIsLoading(false);
  }, []);

  return !remember ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />;
};

export default PersistLogin;
