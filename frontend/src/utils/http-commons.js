import axios from "axios";
import { getToken } from "./JWT-token";

const http = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "content-type": "application/json; charset=UTF-8",
  },
});

http.interceptors.request.use(
  (config) => {
    const loginToken = getToken();

    // if has login token
    if (loginToken)
      config.headers.common["Authorization"] = loginToken;
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
