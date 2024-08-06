import axios from "axios";
// 创建axios实例对象
const instance = axios.create({
  // baseURL: "http://127.0.0.1:8000",
  baseURL: "https://project3-mysql-express.onrender.com",
  timeout: 10000,
});

export default instance;
