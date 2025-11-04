import { LayoutClient } from "@/Layout.jsx";
import { AnalyzePage } from "@/page/AnalyzePage";
import { ChatPage } from "@/page/ChatPage";
import { HomePage } from "@/page/HomePage";
import { LoginPage } from "@/page/LoginPage";
import { RegisterPage } from "@/page/RegisterPage";
import { SymptomPage } from "@/page/SymptomPage";
import { Routes, Route } from "react-router-dom";

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
        </Route>
      </Routes>
    </>
  );
};
export default AppRouter;
