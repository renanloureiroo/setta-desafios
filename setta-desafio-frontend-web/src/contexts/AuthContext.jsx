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
      if (err.code === 400) {
        throw new Error("E-mail ou senha inválidos!");
      } else {
        throw new Error("Houve um erro ao fazer login!");
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
      console.log(err);
      if (err.code === 400 && err.message === "Email already register!") {
        throw new Error("E-mail já cadastrado!");
      } else {
        throw new Error("Houve um erro ao criar sua conta!");
      }
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("settaAccessToken");
    localStorage.removeItem("settaUser");
    setUser(null);

    history.replaceState(null, null, "/signin");
  });

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
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthContextProvider };
