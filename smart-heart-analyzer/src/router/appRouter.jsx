import Home from "@/components/Homes/Home";
import { LayoutClient } from "@/Layout.jsx";
import { HomePage } from "@/page/HomePage";
import { Routes, Route } from "react-router-dom";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<LayoutClient />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
};
export default AppRouter;
