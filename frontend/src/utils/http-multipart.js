import axios from "axios";
import { useSelector, shallowEqual } from "react-redux";

export const uploadImage = (formdata) => {
  return new Promise((resolve, reject) => {
    const loginToken = useSelector(
      (state) => state.account.loginToken,
      shallowEqual
    );
    // not logined
    if (!loginToken) reject("login needed");

    axios
      .post("http://localhost:8000/image", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: loginToken,
        },
      })
      .then((response) => {
        resolve(response.data.image_id);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
