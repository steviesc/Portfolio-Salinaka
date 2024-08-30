import axios from "axios";
const instance = axios.create({
  // baseURL: "http://127.0.0.1:8050",
  baseURL: "https://project3-mysql-express.onrender.com",
  timeout: 10000,
});

// Add a request interceptor to include JWT
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
