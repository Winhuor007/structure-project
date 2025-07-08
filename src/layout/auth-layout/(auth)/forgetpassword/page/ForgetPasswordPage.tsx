import * as yup from "yup";
import { RegisterSchema } from "../schema/forgetpassword";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LogoSmall, Wing } from "@/assets/card";

const secretKey = import.meta.env.VITE_SECRET_KEY || "";

type RegisterFormData = yup.InferType<typeof RegisterSchema>;

export default function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(RegisterSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
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
          <div className="pb-7">
            <img src={LogoSmall} alt="Verification" className="w-36" />
          </div>
          <h2 className="text-2xl font-bold mb-2">
            Reset Password
          </h2>
          <div className="pb-4">
            <div className="text-xs text-gray-400">
              {`Back to `}
              <button
                onClick={() => navigate("/auth/login")}
                className="underline text-blue-500 font-sans cursor-pointer"
              >
                Login
              </button>
            </div>
          </div>

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
                  <p className="text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="pt-3">
              <button
                type="submit"
                className="w-full flex cursor-pointer justify-center py-2 px-4 border border-transparent rounded-sm text-sm font-medium text-white bg-[#AAC936] hover:bg-[#AAC936] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#AAC936]"
                disabled={isLoading}
              >
                {isLoading ? "RESET..." : "RESET"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
