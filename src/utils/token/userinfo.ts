export const USER_INFO_KEY = "user_info";

export type UserInfo = {
  username: string;
  email: string;
};

export const setUserInfo = (userInfo: UserInfo) => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
};

export const getUserInfo = (): UserInfo | null => {
  const userInfo = localStorage.getItem(USER_INFO_KEY);

  if (!userInfo || userInfo === "undefined" || userInfo === "null") {
    return null;
  }

  try {
    return JSON.parse(userInfo);
  } catch {
    return null;
  }
};

export const removeUserInfo = () => {
  localStorage.removeItem(USER_INFO_KEY);
};
