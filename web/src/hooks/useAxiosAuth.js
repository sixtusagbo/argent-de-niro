import { axiosAuth } from '../api/axios';
import { logOutUser } from '../app/slices/userSlice';
import useRefreshToken from './useRefreshToken';
import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';



const useAxiosAuth = () => {
  const dispatch = useDispatch();
  const refresh = useRefreshToken();
  const accessToken = useSelector(state => state.user.accessToken);
  const auth = useSelector(state => state.user);

  useEffect(() => {
    const requestInterceptor = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
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
          dispatch(logOutUser());
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
