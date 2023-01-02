import type { UserAvailable, UserRegister, UserResponse } from "@/types/auth";

import api from "./api";

export default {
  // Fetch CSRF cookie.
  fetchCsrf: async () => {
    const response = await api.get("/api/auth/csrf");
    return response.data;
  },

  // Login user.
  login: async (username: string, password: string): Promise<UserResponse> => {
    const response = await api.post("/api/auth/login", { username, password });
    return response.data;
  },

  // Logout user.
  logout: async () => {
    const response = await api.post("/api/auth/logout");
    return response.data;
  },

  // Register new user.
  register: async (user_data: UserRegister): Promise<UserResponse> => {
    const response = await api.post("/api/auth/register", user_data);
    return response.data;
  },

  // Get user's profile.
  profile: async (): Promise<UserResponse> => {
    const response = await api.get("/api/auth/profile");
    return response.data;
  },

  // Check if user exists.
  userExists: async (username: string): Promise<UserAvailable> => {
    const response = await api.post(
      "/api/auth/available/",
      JSON.stringify({ username }) // TODO: stringify needed?
    );
    return response.data;
  },
};
