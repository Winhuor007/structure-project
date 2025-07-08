import { useState } from "react";
import { useForm } from "react-hook-form";
import type { LoginFormData, LoginInput } from "../../interface";
import { toast } from "@/lib/toast/toast";
import { LoginSchema } from "../../schema/login";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services";
import Cookies from "js-cookie";

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

  // Toggle password visibility
  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);
  const setAuth = useAuthStore((state) => state.setAuth);

  const { mutate: login } = useLoginMutation();

  const onSubmit = (data: LoginInput) => {
    login(data, {
      onSuccess: (response) => {
        console.log(response);
        const accessToken = response?.accessToken || "";
        const refreshToken = response?.refreshToken || "";
        const name = `${response?.firstName || ""} ${response?.lastName || ""}`;
        const username = response?.username || "";

        Cookies.set("accessToken", accessToken);
        Cookies.set("refreshToken", refreshToken);

        setAuth({ accessToken, refreshToken, name, username });

        toast({
          title: "Login successful",
          description: `Welcome back, ${name}!`,
          type: "success",
        });
      },
      onError: () => {
        toast({
          title: "Login failed",
          description: "Invalid username or password.",
          type: "error",
        });
      },
    });
  };
  // }
  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Email input field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
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

      {/* Password input field */}
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
          {/* Toggle password visibility */}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {isPasswordVisible ? <Eye /> : <EyeOff />}
          </button>
        </div>
      </div>
      <button
        className=" cursor-pointer"
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
