import axios from "axios";

// const http = axios.create({
//   baseURL: "http://localhost:8000",
//   headers: {
//     "content-type": "application/json; charset=UTF-8",
//   },
// });

const http = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "content-type": "multipart/form-data",
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
