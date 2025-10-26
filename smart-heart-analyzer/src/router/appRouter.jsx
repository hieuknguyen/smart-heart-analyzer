import { LayoutClient } from "@/Layout.jsx";
import { Routes, Route } from "react-router-dom";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<LayoutClient />}>
          <Route path="/" element={<div>Home Page</div>} />
        </Route>
      </Routes>
    </>
  );
};
export default AppRouter;
