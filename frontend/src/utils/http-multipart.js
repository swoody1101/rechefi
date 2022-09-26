import axios from "axios";
import { getToken } from "./JWT-token";

export const uploadImage = (formdata) => {
  return new Promise((resolve, reject) => {
    const loginToken = getToken();
    // not logined
    if (!loginToken) reject("login needed");

    axios
      .post("http://localhost:8000/image", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${loginToken}`,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
