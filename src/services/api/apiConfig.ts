import { getToken } from "../../utils/token/tokenkey";
import axios from "axios";

const createApi = (baseURL: string) => {
  const client = axios.create({
    baseURL,
    headers: {
      "X-URN": "123",
    },
  });

  client.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return client;
};

export const authApi = createApi(
  import.meta.env.VITE_BACKEND_API_ENDPOINT
);

export const bankApi = createApi(
  import.meta.env.VITE_BANK_API_ENDPOINT
);

export const fileApi = createApi(
  import.meta.env.VITE_FILE_PATH_ENDPOINT
);
