import { WithRoutes } from "@/components/withRoutes";
import { LoginPage } from "../pages/loginPage";

export const LoginRoutes = () => (
  <WithRoutes
    configs={[
      {
        path: "",
        element: <LoginPage />,
      },
    ]}
  />
);
