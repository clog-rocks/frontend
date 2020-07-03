import api from "./api";

export default {
  // Login user.
  login: async (username, password) => await api.post(
    "/api/auth/login/",
    { username, password },
  ),

  // Logout user.
  logout: async () => await api.post("/api/auth/logout/"),

  // Register new user.
  register: async (username, email, password) => await api.post(
    "/api/auth/register/",
    { username, email, password },
  ),

  // Check if user exists.
  userExists: async (username) => await api.post(
    "/api/auth/user/",
    JSON.stringify({ username }),
  ),
};
