import axios from "axios";
import { useSelector, shallowEqual } from "react-redux";
import { getToken } from "./JWT-token";

const http = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "content-type": "application/json; charset=UTF-8",
  },
});

// const loginToken = useSelector((state) => {
//   state.account.loginToken;
// });

http.interceptors.request.use(
  (config) => {
    // const loginToken = useSelector(
    //   (state) => state.account.loginToken,
    //   shallowEqual
    // );
    const loginToken = getToken();
    // if has login token
    if (loginToken)
      config.headers.common["Authorization"] = `Bearer ${loginToken}`;
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
