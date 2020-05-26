import axios from "axios";

export const authService = {
  // Login user.
  login: async (username, password) => {
    const axiosOptions = {
      headers: { "Content-Type": "application/json" },
    };

    const body = JSON.stringify({ username, password });

    return await axios.post(
      "http://127.0.0.1:8000/api/auth/login/",
      body,
      axiosOptions
    );
  },

  // Logout user.
  logout: async () => {
    return await axios.post("http://127.0.0.1:8000/api/auth/logout/", {});
  },

  // Register new user.
  register: async (username, email, password) => {
    const axiosOptions = {
      headers: { "Content-Type": "application/json" },
    };

    const body = JSON.stringify({ username, email, password });

    return await axios.post(
      "http://127.0.0.1:8000/api/auth/register/",
      body,
      axiosOptions
    );
  },

  // Check if user exists.
  userExists: async (username) => {
    return await axios.post("http://127.0.0.1:8000/api/auth/user/", {
      username,
    });
  },
};
