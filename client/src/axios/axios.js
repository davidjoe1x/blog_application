import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3001",
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const headers = config.headers || {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
      config.headers = headers;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Обработка ошибки авторизации
    } else {
      // Обработка других ошибок
    }
    return Promise.reject(error);
  }
);

export default http;
