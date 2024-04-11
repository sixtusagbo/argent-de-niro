import axios from 'axios';

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function getMonthName() {
    return month[new Date().getMonth()];
}

export const user = async (data) => {
    let credentials = {};
    try{
        const userInfo = await axios.get('/login', data);
        credentials.append('refresh_token', userInfo.data.refresh_token);
        credentials.append('access_token', userInfo.data.access_token);
        return credentials;
    } catch (error) {
        console.error(error);
    }
}

const BASE_URL = 'http://127.0.0.1:5000/api/v1';

export const axiosForm = axios.create({
  baseURL: BASE_URL,
  headers: {
      'Content-Type': 'multipart/form-data',
  },
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL
});

