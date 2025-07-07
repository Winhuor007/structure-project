import { WithRoutes } from "@/components/withRoutes";
import { EmailVerification } from "../page/VerifyEmail";

export const VerificationRoutes = () => (
  <WithRoutes
    configs={[
      {
        path: "",
        element: <EmailVerification />,
      },
    ]}
  />
);
