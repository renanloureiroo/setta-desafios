import { Route, Routes } from "react-router-dom";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Home } from "../pages/Home";
import { RequireAuth } from "../components/RequiredAuth";
import { Report } from "../pages/Report";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        index
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/task/:id"
        element={
          <RequireAuth>
            <Report />
          </RequireAuth>
        }
      />
      <Route index path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
};
