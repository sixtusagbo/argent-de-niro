// import useAuth from './useAuth';
import { useSelector } from 'react-redux';

/**
 * 
 * import useSelector from react-redux
 * capture the user accesToken and id from the store
 *
 */
 const useLoginStatus = () => {
 const user = useSelector(state => state.user);
 if (user?.user?.id && user?.accessToken) {
   return true;
 }
 return false;
 }

export default useLoginStatus;
