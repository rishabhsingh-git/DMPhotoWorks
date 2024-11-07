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
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        console.log(`You have been triggered`);
        navigate("/admin-signin");
      }
      return Promise.reject(error);
    }
  );
};
