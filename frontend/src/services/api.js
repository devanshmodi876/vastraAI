import axios from "axios";

export const API_BASE =
  "https://vastraai-production.up.railway.app";

const api = axios.create({
  baseURL: `${API_BASE}/api/`,
});

export default api;