import { loginApi } from "../../../services/api/auth.api";
import type { LoginFormData } from "@/types/type";
import { setToken } from "../../../utils/token/tokenkey";
import { setUserInfo } from "../../../utils/token/userinfo";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../../../utils/toaster/notification";

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: LoginFormData) => loginApi(data),

    onSuccess: (response, variables) => {
      // console.log(response)
      const token =response.data.data.accessToken;

      if (!token) {
        showError("Login response did not contain an access token", "Login failed");
        return;
      }

      setToken(token);
      
      // Store user information
      const email = response.data.data.email || response.data.data.user?.email || "";
      setUserInfo({
        username: variables.username,
        email: email
      });
      
      showSuccess("Login successful");
      navigate("/dashboard", {
        replace: true
      })
    },
    onError: (error) => {
      showError(error, "Login failed");
    }
  });

};