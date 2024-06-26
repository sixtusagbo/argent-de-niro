import axios from 'axios';

// const BASE_URL = 'http://127.0.0.1:5000/api/v1';
const BASE_URL = 'https://turbo-space-invention-45rvpv95gx63v9w-5000.app.github.dev/api/v1';

export const axiosForm = axios.create({
  baseURL: BASE_URL,
  headers: {
      'Content-Type': 'multipart/form-data',
  },
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
      'Content-Type': 'multipart/form-data',
  },
});

