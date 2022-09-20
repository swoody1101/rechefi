const tokenName = "Authorization";

export const saveToken = (token) => {
  window.localStorage.setItem(tokenName, token);
};

export const deleteToken = () => {
  window.localStorage.removeItem(tokenName);
};

export const getToken = () =>
  window.localStorage.getItem(tokenName);
