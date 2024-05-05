import { useEffect, useState } from 'react';
import axiosForm from '../api/axios';
import useAxiosAuth from './useAxiosAuth';

/**
 * Custom hook for making HTTP requests to a specified URL.
 *
 * @param {string} url - The URL to make the request to.
 * @param {*} initialValue - The initial value for the data state.
 * @param {boolean} [authorized=true] - Flag indicating whether the request should be authorized.
 * @returns {object} - An object containing the data, isLoading, and error states.
 */
const useClient = (url, initialValue, authorized = true) => {
  const [data, setData] = useState(initialValue ?? null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const httpClient = authorized ? axiosAuth : axiosForm;

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

  return { data, isLoading, error, setData };
};

export default useClient;
