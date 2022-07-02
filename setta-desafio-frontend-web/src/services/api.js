import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3333/api/v1",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("settaAccessToken");
      localStorage.removeItem("settaUser");
      history.replaceState(null, null, "/signin");
    }

    if (error.response.status === 400) {
      return Promise.reject({
        message: error.response.data.error,
        code: error.response.status,
      });
    }

    return Promise.reject(error);
  }
);

export { api };
