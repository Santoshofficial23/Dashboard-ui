import type { LoginFormData } from "@/types/type";
import { authApi } from "./apiConfig";
import { API_ENDPOINTS } from "./api";

export const loginApi = async (
  data: LoginFormData
) => {
  const response = await authApi.post(
    API_ENDPOINTS.AUTH.LOGIN,
    {data}
  );


  return response;
};