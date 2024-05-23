import axios from "axios";
import { SERVER_URL } from "../constants/constants";
import { generateRefreshToken } from "../api/user";

export const customAxios = axios.create({
  baseURL: SERVER_URL,
});

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await generateRefreshToken();
        return customAxios(originalRequest);
      } catch (err) {
        console.error("Token refresh failed : ", err);
      }
    }
    return Promise.reject(error);
  }
);
