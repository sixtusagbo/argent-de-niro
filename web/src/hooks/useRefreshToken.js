import axios from '../api/axios';
import useAuth from './useAuth';
import { useSelector, useDispatch } from 'react-redux';
import { refreshToken} from '../app/slices/refreshSlice';

const useRefreshToken = () => {

  const dispatch = useDispatch();
  const newToken = useSelector((state) => state.refresh.refresh);

  const refresh = async () => {
    try {
      dispatch(refreshToken()).then(() => {
        return newToken;
      });
    } catch (err) {
      console.error(err);
    }
  };

  return refresh;
};

export default useRefreshToken;
