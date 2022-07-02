import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3333/api/v1",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      localStorage.removeItem("settaAccessToken");
      localStorage.removeItem("settaUser");
      history.replaceState(null, null, "/signin");
    }
  }
);

export { api };
