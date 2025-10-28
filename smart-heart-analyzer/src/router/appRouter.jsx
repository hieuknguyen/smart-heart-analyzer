import { LayoutClient } from "@/Layout.jsx";
import { HomePage } from "@/page/HomePage";
import { LoginPage } from "@/page/LoginPage";
import { RegisterPage } from "@/page/RegisterPage";
import { Routes, Route } from "react-router-dom";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<LayoutClient />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
};
export default AppRouter;
