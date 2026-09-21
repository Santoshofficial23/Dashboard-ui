import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup
    .string()
    .required("Email is required")
    .matches(
         /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "username is not valid"
    ),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});