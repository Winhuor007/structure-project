import * as yup from "yup";
import { RegisterSchema } from "../schema/signup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { LogoSmall, Wing } from "@/assets/card";

const secretKey = import.meta.env.VITE_SECRET_KEY || "";

type RegisterFormData = yup.InferType<typeof RegisterSchema>;

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(RegisterSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [secretKey, setSecretKey] = useState<string>("");

  const navigate = useNavigate();
  interface AxiosErrorResponse {
    response?: {
      status: number;
    };
  }

  // Handle the sign-up process
  const handleSignUp = async (data: RegisterFormData) => {
    // const secretKey = "kf93!@nF3?/$rJQ2@kT6b%rTYqKq9t1n3F!qL";
    const { email, password, username } = data; //Destructures the email, password, and username fields from the data object for easier access.

    setIsLoading(true); // Start loading spinner
    setError(null); // Reset error message   & Clears any previous error messages.

    try {
      const response = await axios.post("/signup", {
        email,
        password,
        username,
      });

      if (response.status === 200) {
        const encryptedUsername = CryptoJS.AES.encrypt(
          username,
          secretKey
        ).toString();
        const encryptedPassword = CryptoJS.AES.encrypt(
          password,
          secretKey
        ).toString();
        console.log("encrypted Username:", encryptedUsername);
        console.log("encrypted Password:", encryptedPassword);

        localStorage.setItem("username", encryptedUsername);
        localStorage.setItem("password", encryptedPassword);
        localStorage.setItem("email", email);

        // const { token } = response.data;
        // console.log("token:", token);
        // localStorage.setItem("authToken", token);

        navigate("/signup/verify-email"); // Redirect to the verification page
      } else {
        setError("Sign-up failed. Please try again.");
      }
    } catch (err) {
      const errorResponse = err as AxiosErrorResponse;
      if (errorResponse.response) {
        if (errorResponse.response.status === 409) {
          setError("User already exists. Please try logging in.");
        } else {
          setError("Sign-up failed. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Sign-up error:", err);
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleGoogleSignUp = async () => {
    try {
      const response = await axios.get("/google");
      //This endpoint is expected to initiate the Google OAuth flow
      // and return a redirect URL for Google sign-in.

      if (response.data && response.data.url) {
        window.location.href = response.data.url; // Redirect to the Google OAuth page
      } else {
        setError("An error occurred during Google login. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during Google login. Please try again.");
      console.error("Google Sign-up error:", err);
    }
  };

  //   const handleBack = () => {
  //     navigate("/"); // Go back to the homepage
  //   };

  return (
    <div className="min-h-screen flex">
      {/* left Section - Image */}
      <div className="hidden sm:block w-3/4 lg:w-3/4 relative">
        <div className="h-full w-full flex items-center justify-center bg-blue-500 rounded-l-3xl">
          <img
            src={Wing}
            alt="Verification"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* right Section - Form */}
      <div className="flex flex-col justify-center w-full sm:w-1/4 p-8 lg:w-1/4 sm:p-8  bg-white rounded-r-3xl">
        <div className="sm:max-w-md w-full mx-auto">
          {/* Back Button */}
          {/* <button
            onClick={handleBack}
            className="mb-6 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={24} />
          </button> */}
          <div className="pb-7">
            <img src={LogoSmall} alt="Verification" className="w-36" />
          </div>
          <h1 className="text-2xl font-bold mb-4 cursor-pointer">SIGN UP</h1>
          {error && (
            <div className="flex items-center text-red-600 mb-2">
              <p>{error}</p>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit(handleSignUp)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Enter Password"
                  autoComplete="new-password"
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...register("password")}
                />
                {/* Eye button */}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {isPasswordVisible ? <Eye /> : <EyeOff />}
                </button>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...register("confirmPassword")}
                />
                {/* Eye button */}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {isPasswordVisible ? <Eye /> : <EyeOff />}
                </button>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex cursor-pointer justify-center py-2 px-4 border border-transparent rounded-sm text-sm font-medium text-white bg-[#AAC936] hover:bg-[#AAC936] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#AAC936]"
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "Sign up"}
              </button>
            </div>
          </form>

          {/* Google Sign Up */}
          <div className="relative flex items-center justify-center text-sm mt-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <p className="px-2 text-sm text-gray-500 bg-white">
              Or continue with
            </p>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleGoogleSignUp}
              className="w-full flex justify-center cursor-pointer py-2 px-4 border border-gray-300 rounded-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              {/* Google icon and text */}
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
                  fill="#3F83F8"
                />
                <path
                  d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
                  fill="#34A853"
                />
                <path
                  d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
                  fill="#FBBC04"
                />
                <path
                  d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
                  fill="#EA4335"
                />
              </svg>
              Sign up with Google
            </button>
          </div>

          <div className="mt-4">
            <div className="text-xs text-gray-400">
              I have already account
              <button
                onClick={() => navigate("/auth/login")}
                className="underline text-blue-500 cursor-pointer"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SignUpPage };
