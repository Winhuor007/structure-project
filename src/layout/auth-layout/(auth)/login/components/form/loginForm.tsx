import { useState} from "react";
import { useForm } from "react-hook-form";
import type { LoginFormData } from "../../interface";
import { LoginSchema } from "../../schema/login";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/constants/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useToast } from "@/lib/toast/toast";

const toast = useToast();
const LoginForm = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(LoginSchema),
  });

const setAuth = useAuthStore((s) => s.setAuth);

const onSubmit = async (data: LoginFormData) => {
  try {
    const response = await axiosInstance.post("/oauth/token", data);
    const { access_token, refresh_token } = response.data;

    setAuth({ accessToken: access_token, refreshToken: refresh_token });

    toast.success("Login Successful", "Welcome back!")

    navigate("/dashboard");
  } catch (error) {
    toast.error("Login Failed", "Invalid credentials.");
    console.error("Login error:", error);
  }
};

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Username input */}
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          {...register("username")}
          type="text"
          placeholder="Username"
          className="border px-3 py-2 w-full rounded"
          autoComplete="username"
          aria-invalid={errors.username ? "true" : "false"}
          aria-describedby="username-error"
        />
        {errors.username && (
          <p id="username-error" className="text-red-500 text-sm" role="alert">
            {errors.username.message}
          </p>
        )}
      </div>

      {/* Password input */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1 relative">
          <input
            {...register("password")}
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            className="border px-3 py-2 w-full rounded"
            autoComplete="current-password"
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby="password-error"
          />
          {errors.password && (
            <p
              id="password-error"
              className="text-red-500 text-sm"
              role="alert"
            >
              {errors.password.message}
            </p>
          )}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {isPasswordVisible ? <Eye /> : <EyeOff />}
          </button>
        </div>
      </div>

      {/* Forgot password */}
      <button
        className="cursor-pointer"
        type="button"
        onClick={() => navigate("/auth/forget-password")}
      >
        <p>Forgot Password?</p>
      </button>

      {/* Submit button */}
      <button
        type="submit"
        className="w-full cursor-pointer py-2 px-4 rounded-sm shadow-sm text-sm font-medium text-white bg-[#AAC936] hover:bg-[#AAC936] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#AAC936]"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export { LoginForm };
