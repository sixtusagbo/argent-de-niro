import useAuth from './useAuth';

const useLoginStatus = () => {
  const { auth } = useAuth();

  if (auth?.userId) {
    return true;
  }

  return false;
};

export default useLoginStatus;
