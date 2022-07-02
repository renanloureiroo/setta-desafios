import { Route, Routes } from "react-router-dom";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Timer } from "../pages/Timer";
import { RequireAuth } from "../components/RequiredAuth";
import { Report } from "../pages/Report";
import { Profile } from "../pages/Profile";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        index
        path="/"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route path="/timer" element={<Timer />} />
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
