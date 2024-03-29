import { axiosAuth } from '../api/axios';
import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';
import { useEffect } from 'react';

const useAxiosAuth = () => {
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosAuth(prevRequest);
        } else if (error?.response?.status === 401 && prevRequest.sent) {
          // Refresh token has expired, log the user out
          setAuth({});
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestInterceptor);
      axiosAuth.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh]);

  return axiosAuth;
};

export default useAxiosAuth;
