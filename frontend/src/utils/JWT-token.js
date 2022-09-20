import { isEmpty } from "lodash";
const tokenName = "Authorization";

export const saveToken = (token) => {
  window.localStorage.setItem(tokenName, token);
};

export const deleteToken = () => {
  window.localStorage.removeItem(tokenName);
};

export const getToken = () => {
  if (!isEmpty(window.localStorage.getItem(tokenName))) {
    return window.localStorage.getItem(tokenName);
  } else {
    window.location.href = "http://localhost:3000" + "/members/login/1";
    return false;
  }
};
