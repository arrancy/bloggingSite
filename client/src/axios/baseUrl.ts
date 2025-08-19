import axios from "axios";

const api = axios.create({
  baseURL: "https://api.writeintelligent.blog/api/v1",
  withCredentials: true,
});
export default api;
