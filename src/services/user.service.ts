import type { UserAvailable, UserRegister, UserResponse } from "@/types/auth";

import api from "./api";

export default {
  login: async (username: string, password: string): Promise<UserResponse> => {
    const response = await api.post("/api/auth/login", { username, password });
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/api/auth/logout");
    return response.data;
  },

  register: async (user_data: UserRegister): Promise<UserResponse> => {
    const response = await api.post("/api/auth/register", user_data);
    return response.data;
  },

  profile: async (): Promise<UserResponse> => {
    const response = await api.get("/api/auth/profile");
    return response.data;
  },

  // Check if user exists.
  userExists: async (username: string): Promise<UserAvailable> => {
    const response = await api.post(
      "/api/auth/available/",
      JSON.stringify({ username }), // TODO: stringify needed?
    );
    return response.data;
  },
};
