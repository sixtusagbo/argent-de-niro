import { useEffect, useState } from 'react';
import axios from '../api/axios';
import useAxiosAuth from './useAxiosAuth';

const useClient = (url, initialValue, authorized = true) => {
  const [data, setData] = useState(initialValue ?? null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const httpClient = authorized ? axiosAuth : axios;

    const getCourses = async () => {
      try {
        const response = await httpClient.get(url, {
          signal: controller.signal,
        });

        isMounted && setData(response.data);
      } catch (err) {
        isMounted && setError(err.message);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    getCourses();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url]);

  return { data, isLoading, error };
};

export default useClient;
