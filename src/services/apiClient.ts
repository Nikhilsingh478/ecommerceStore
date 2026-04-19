import axios from "axios";
import { BASE_URL } from "@/config/api";

/**
 * Central axios instance.
 * Auto-attaches header-based auth (emailId + password) from localStorage.
 * Handles 403 by clearing session and redirecting to /login.
 */
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const emailId = localStorage.getItem("emailId");
  const password = localStorage.getItem("password");

  if (emailId && password) {
    config.headers.set("emailId", emailId);
    config.headers.set("password", password);
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 403) {
      localStorage.removeItem("emailId");
      localStorage.removeItem("password");
      localStorage.removeItem("user");
      if (typeof window !== "undefined" && window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
