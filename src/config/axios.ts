import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // ideally: import.meta.env.VITE_BASE_URL
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
