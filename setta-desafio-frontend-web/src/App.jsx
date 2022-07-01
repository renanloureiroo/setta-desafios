import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider, useAuth } from "./contexts/AuthContext";
import { AppRoutes } from "./Router";

function App() {
  const { isLoading } = useAuth();
  return (
    <AuthContextProvider>
      <BrowserRouter>{!isLoading && <AppRoutes />}</BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
