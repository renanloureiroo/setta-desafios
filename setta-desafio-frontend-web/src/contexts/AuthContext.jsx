import { createContext, useCallback, useContext, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const signIn = useCallback(async ({ email, password }) => {
    try {
      const { data } = await api.post("/accounts/signin", {
        email,
        password,
      });

      setUser(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const signUp = useCallback(async ({ name, email, password }) => {
    try {
      await api.post("/accounts/signup", {
        name,
        email,
        password,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthContextProvider };
