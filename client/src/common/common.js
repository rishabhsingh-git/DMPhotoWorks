import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllCookies = () => {
  const accessToken = Cookies.get("accessToken");
  return accessToken;
};

export const setupInterceptors = (navigate) => {
  api.interceptors.response.use(
    (response) => response,

    async (error) => {
      if (error.response && error.response.status === 401) {
        try {
          const refreshResponse = await fetch(
            "http://localhost:5000/api/auth/refresh-token",
            {
              method: "GET",
              credentials: "include",
            }
          );
          const data = await refreshResponse.json();

          if (refreshResponse.ok) {
            localStorage.setItem(
              "userDetails",
              JSON.stringify(data.userDetails)
            );
            const originalRequest = error.config;
            return api(originalRequest);
          } else {
            localStorage.removeItem("userDetails");
            navigate("/admin-signin");
            return Promise.reject(error);
          }
        } catch (refreshError) {
          localStorage.removeItem("userDetails");
          navigate("/admin-signin");
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};
