import { WithRoutes } from "@/components/withRoutes";
import ForgetPassword from "../page/ForgetPasswordPage";

export const ForgetRoutes = () => (
  <WithRoutes
    configs={[
      {
        path: "",
        element: <ForgetPassword />,
      },
    ]}
  />
);
