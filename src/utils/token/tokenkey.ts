import { TOKEN_KEY } from "./../../utils/token/token";

export const setToken = (token: string) => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  const token = sessionStorage.getItem(TOKEN_KEY);

  if (!token || token === "undefined" || token === "null") {
    return null;
  }

  return token;
};

export const removeToken = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};

export const hasToken = () => {
  return !!getToken();
};