import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@/layout/auth-layout/(auth)/login/pages/loginPage";
import ProtectedRoute from "@/middleware/ProtectedRoute";
import Layout from "@/layout/main-layout/Layout";
import PickUpPage from "@/pages/PickUpPage";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors expand />
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route
          path="/crossbank"
          element={
            <ProtectedRoute>
              <Layout>
                <PickUpPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
