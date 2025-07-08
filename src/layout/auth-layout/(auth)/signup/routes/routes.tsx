import { WithRoutes } from "@/components/withRoutes";
import { SignUpPage } from "../page/SignUp";

export const SignupRoutes = () => (
  <WithRoutes
    configs={[
      {
        path: "",
        element: <SignUpPage />,
      },
    ]}
  />
);
