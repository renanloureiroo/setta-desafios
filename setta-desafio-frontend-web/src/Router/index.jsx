import { Route, Routes } from "react-router-dom";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Home } from "../pages/Home";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="timer" element={<Home />} />
    </Routes>
  );
};
