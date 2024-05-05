import useAuth from './useAuth';

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    localStorage.clear();
    setAuth({});
  };

  return logout;
};

export default useLogout;
