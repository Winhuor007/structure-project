import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { Typography } from "@/components";
import { LoginForm } from "../components/form/loginForm";
import { LogoSmall, Wing } from "@/assets/card";

const LoginPage = () => {
  const navigate = useNavigate();

  // const handleGoogleSignUp = async () => {
  //   try {
  //     const response = await axios.get("/google");

  //     // Check if the response contains the redirect URL
  //     if (response.data && response.data.url) {
  //       // Redirect the browser to Google's OAuth URL
  //       window.location.href = response.data.url;
  //     } else {
  //       console.error("Google Sign-in URL not found in response.");
  //       alert("And error occurred during Google login.");
  //     }
  //   } catch (err) {
  //     console.error("Google Sign-up error:", err);
  //     alert("An error occurred during Google login.");
  //   }
  // };
const handleGoogle=()=>{
  window.open("http://localhost:5000/auth/google/", "_self")
}
  // const handleBack = () => navigate("/");

  return (
    <div className="min-h-screen flex">
      {/* left Section - Image */}
      <div className=" hidden sm:block w-3/4 lg:w-3/4 relative">
        <div className="h-full w-full flex items-center justify-center bg-blue-500 rounded-l-3xl">
          <img
            src={Wing}
            alt="Verification"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* right Section - Form */}
      <div className="flex flex-col justify-center w-full sm:w-1/4 lg:w-1/4 p-8 bg-white rounded-r-3xl">
        <div className="sm:max-w-md w-full mx-auto">
          <div className="pb-7">
            <img src={LogoSmall} alt="Verification" className="w-36" />
          </div>

          <Typography className="text-2xl font-bold mb-4">LOGIN</Typography>

          {/* LoginForm with handleLogin */}
          <LoginForm />

          {/* Divider */}
          <div className="relative flex items-center justify-center text-sm mt-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <Typography className="px-2 text-sm text-gray-500 bg-white">
              Or continue with
            </Typography>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Sign in with Google */}
          <div className="mt-4">
            <button
              onClick={handleGoogle}
              className="w-full flex justify-center cursor-pointer py-2 px-4 border border-gray-300 rounded-sm shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Google icon */}
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

          {/* Sign in with Github */}
          <div className="mt-4">
            <button
              // onClick={handleGoogleSignUp}
              className="w-full flex justify-center cursor-pointer py-2 px-4 border border-gray-300 rounded-sm shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 0.297607C5.37 0.297607 0 5.66761 0 12.2976C0 17.4824 3.438 21.8476 8.207 23.3876C8.805 23.4976 9.025 23.1376 9.025 22.8276C9.025 22.5476 9.015 21.7076 9.01 20.7076C5.672 21.3476 4.968 19.1576 4.968 19.1576C4.422 17.7976 3.633 17.4376 3.633 17.4376C2.546 16.7176 3.717 16.7326 3.717 16.7326C4.922 16.8176 5.555 17.9726 5.555 17.9726C6.617 19.7826 8.348 19.2676 9.048 18.9576C9.157 18.1776 9.467 17.6476 9.81 17.3476C7.145 17.0476 4.343 16.0326 4.343 11.4176C4.343 10.1176 4.804 9.05761 5.585 8.23761C5.46 7.93761 5.045 6.68761 5.705 5.05761C5.705 5.05761 6.705 4.73761 9.005 6.31761C9.965 6.04761 10.995 5.91761 12.025 5.91261C13.055 5.91761 14.085 6.04761 15.045 6.31761C17.34 4.73761 18.34 5.05761 18.34 5.05761C19 6.68761 18.585 7.93761 18.46 8.23761C19.245 9.05761 19.7 10.1176 19.7 11.4176C19.7 16.0426 16.895 17.0426 14.225 17.3376C14.675 17.7176 15.075 18.4676 15.075 19.6276C15.075 21.2276 15.06 22.4676 15.06 22.8276C15.06 23.1376 15.275 23.5026 15.885 23.3826C20.655 21.8376 24 17.4776 24 12.2976C24 5.66761 18.63 0.297607 12 0.297607Z"
                />
              </svg>
              Sign up with Github
            </button>
          </div>

          {/* Sign in with Facebokk*/}
          <div className="mt-4">
            <button
              // onClick={handleGoogleSignUp}
              className="w-full flex justify-center cursor-pointer py-2 px-4 border border-gray-300 rounded-sm shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#1877F2"
                  d="M24 12.0736C24 5.40487 18.6274 0 12 0C5.37258 0 0 5.40487 0 12.0736C0 18.0988 4.3882 23.0937 10.125 24V15.563H7.07812V12.0736H10.125V9.41287C10.125 6.40562 11.9164 4.76512 14.6573 4.76512C15.9706 4.76512 17.3438 4.99237 17.3438 4.99237V7.96875H15.8306C14.3391 7.96875 13.875 8.89062 13.875 9.83437V12.0736H17.2031L16.6711 15.563H13.875V24C19.6118 23.0937 24 18.0988 24 12.0736Z"
                />
              </svg>
              Sign up with Facebook
            </button>
          </div>

         
          <div className="mt-4">
            <div className="flex gap-2">
              <Typography variant="base" color="secondary">
                Don't have an account?
              </Typography>
              <button
                onClick={() => navigate("/auth/sign-up")}
                className="underline text-blue-500 font-sans cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LoginPage };
