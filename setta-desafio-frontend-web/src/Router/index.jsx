import { Route, Routes } from "react-router-dom";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Home } from "../pages/Home";

export const RouterApp = () => {
  return (
    <Routes>
      <Route path="singin" element={<SignIn />} />
      <Route path="singup" element={<SignUp />} />
      <Route path="timer" element={<Home />} />
    </Routes>
  );
};
