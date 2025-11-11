import { LayoutClient } from "@/Layout.jsx";
import { AnalyzePage } from "@/page/AnalyzePage";
import { ChangePasswordPage } from "@/page/ChangePasswordPage";
import { ChatPage } from "@/page/ChatPage";
import { HomePage } from "@/page/HomePage";
import { LoginPage } from "@/page/LoginPage";
import { ProfilePage } from "@/page/ProfilePage";
import { RegisterPage } from "@/page/RegisterPage";
import { SymptomPage } from "@/page/SymptomPage";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<LayoutClient />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/diagnosis" element={<AnalyzePage />} />
          <Route path="/symptom" element={<SymptomPage />} />
          <Route path="/chatbot" element={<ChatPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/profile/ChangePassword"
            element={<ChangePasswordPage />}
          />
        </Route>
      </Routes>
      <Toaster position="top-right" richColors />
    </>
  );
};
export default AppRouter;
