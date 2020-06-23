import api from "./api";

export default {
  // Login user.
  login: async (username, password) => {
    return await api.post("/api/auth/login/", { username, password });
  },

  // Logout user.
  logout: async () => {
    return await api.post("/api/auth/logout/");
  },

  // Register new user.
  register: async (username, email, password) => {
    return await api.post("/api/auth/register/", { username, email, password });
  },

  // Check if user exists.
  userExists: async (username) => {
    return await api.post("/api/auth/user/", JSON.stringify({ username }));
  },
};
