import useAuth from './useAuth';

const useLoginStatus = () => {
  const { auth } = useAuth();

  if (auth?.user?.id && auth?.accessToken) {
    return true;
  }

  return false;
};

export default useLoginStatus;
