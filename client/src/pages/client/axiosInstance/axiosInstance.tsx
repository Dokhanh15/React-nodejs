import axios from 'axios';

// Tạo một instance của Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

// Thêm một request interceptor để chèn token vào header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('Token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

