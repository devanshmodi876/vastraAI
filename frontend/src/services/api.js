import axios from "axios";

export const API_BASE =
  import.meta.env.VITE_API_URL.replace("/api", "");

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;