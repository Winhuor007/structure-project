import * as yup from "yup";

export const RegisterSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .min(8, "Confirm Password is required")
    .required("Confirm Password is required"),
}).test(
  "passwords-match",
  "Passwords do not match",
  function (value) {
    return value.password === value.confirmPassword;
  }
);