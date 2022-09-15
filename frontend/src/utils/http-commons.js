import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "content-type": "application/json; charset=UTF-8",
  },
});

http.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default http;
