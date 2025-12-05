import { HeartECGAnalazyeList } from "@/components/Result/ECGAnalyzeList";
import { HeartSymptomAnalyzeList } from "@/components/Result/SymptomAnalyzeList";
import { LayoutClient } from "@/Layout.jsx";
import { AnalyzePage } from "@/page/AnalyzePage";
import { ChangePasswordPage } from "@/page/ChangePasswordPage";
import { ChatPage } from "@/page/ChatPage";
import { ContactPage } from "@/page/ContactPage";
import { HistoryPage } from "@/page/HistoryPage";
import { HomePage } from "@/page/HomePage";
import { LoginPage } from "@/page/LoginPage";
import { PageResult } from "@/page/PageResult";
import { ProfilePage } from "@/page/ProfilePage";
import { RegisterPage } from "@/page/RegisterPage";
import { ReportPage } from "@/page/ReportPage";
import { ResultSymptomPage } from "@/page/ResultSymptomPage";
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
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/result" element={<HeartECGAnalazyeList />} />
          <Route path="/result-symptom" element={<HeartSymptomAnalyzeList />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Route>
      </Routes>
      <Toaster position="top-right" richColors />
    </>
  );
};
export default AppRouter;
