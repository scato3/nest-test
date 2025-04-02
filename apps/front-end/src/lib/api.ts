import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },
  register: async (email: string, password: string, name: string) => {
    const response = await api.post("/auth/register", {
      email,
      password,
      name,
    });
    return response.data;
  },
};

export const posts = {
  getAll: async () => {
    const response = await api.get("/posts");
    return response.data;
  },
  getOne: async (id: number) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },
  create: async (title: string, content: string) => {
    const response = await api.post("/posts", { title, content });
    return response.data;
  },
  update: async (id: number, title: string, content: string) => {
    const response = await api.patch(`/posts/${id}`, { title, content });
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },
};

export default api;
