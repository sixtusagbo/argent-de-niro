import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.post(
        '/refresh',
        JSON.stringify({
          refresh: auth?.refreshToken,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      setAuth((prev) => {
        return {
          ...prev,
          accessToken: response?.data?.access,
          refreshToken: response?.data?.refresh,
        };
      });

      return response.data.access;
    } catch (err) {
      if (err?.response?.status === 401) {
        setAuth({});
      }
    }
  };

  return refresh;
};

export default useRefreshToken;
