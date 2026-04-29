import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/ecommerce",
});

api.interceptors.request.use((config) => {
  const emailId = localStorage.getItem("userEmail") || localStorage.getItem("emailId");
  const password = localStorage.getItem("userPassword") || localStorage.getItem("password");
  
  if (emailId) config.headers.emailId = emailId;
  if (password) config.headers.password = password;
  
  return config;
});

export default api;
