import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const signIn = useCallback(async ({ email, password }) => {
    try {
      const { data } = await api.post("/accounts/signin", {
        email,
        password,
      });

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.accessToken}`;

      localStorage.setItem("settaAccessToken", data.accessToken);
      localStorage.setItem("settaUser", JSON.stringify(data.account));
      setUser(data.account);
    } catch (err) {
      if (err.response.status === 401) {
        throw new Error("Usuário ou senha inválidos");
      } else {
        console.log(err);
      }
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
      if (err.response.status === 400) {
        throw new Error("Houve um erro ao criar sua conta!");
      } else {
        console.log(err);
      }
    }
  }, []);

  const rehydrated = () => {
    const accessToken = localStorage.getItem("settaAccessToken");
    const user = JSON.parse(localStorage.getItem("settaUser"));
    if (!!accessToken && !!user.id) {
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      setUser(user);
    }
  };

  useEffect(() => {
    if (isLoading) {
      rehydrated();
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthContextProvider };
