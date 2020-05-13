import axios from "axios";

export const authService = {
  // Login user.
  login: (username, password) => {
    const axiosOptions = {
      headers: { "Content-Type": "application/json" },
    };

    const body = JSON.stringify({ username, password });

    return new Promise((resolve, reject) => {
      axios
        .post("http://127.0.0.1:8000/api/auth/login/", body, axiosOptions)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // Logout user.
  logout: () => {
    return new Promise((resolve, reject) => {
      axios
        .post("http://127.0.0.1:8000/api/auth/logout/", {})
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // Register new user.
  register: (username, email, password) => {
    const axiosOptions = {
      headers: { "Content-Type": "application/json" },
    };

    const body = JSON.stringify({ username, email, password });

    return new Promise((resolve, reject) => {
      axios
        .post("http://127.0.0.1:8000/api/auth/register/", body, axiosOptions)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
