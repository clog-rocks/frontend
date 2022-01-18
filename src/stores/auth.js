import api from "@/_services/api";
import { authService } from "@/_services";
import { defineStore } from "pinia";
import router from "@/router";

// Helper action to set thingies.
const store = {
  set(store, payload) {
    api.defaults.headers.common.Authorization =
      "Bearer " + payload.token.access;

    store.user = payload.user;
    store.token = payload.token;
    store.isAuthenticated = true;
    localStorage.setItem("user", JSON.stringify(payload.user));
    localStorage.setItem("token", JSON.stringify(payload.token));
    localStorage.setItem("isAuthenticated", true);
  },

  unset(store) {
    api.defaults.headers.common.Authorization = null;

    store.user = {};
    store.token = null;
    store.isAuthenticated = false;
    store.activeComponent = "LoginForm";
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");

    // store.$reset();
  },
};

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      // Component which should be displayed on Auth view.
      // Login or Register.
      activeComponent: "LoginForm",
      isAuthenticated: localStorage.getItem("isAuthenticated") || false,
      user: JSON.parse(localStorage.getItem("user") || "{}"),
      token: JSON.parse(localStorage.getItem("token") || "{}"),
    };
  },

  actions: {
    async login(username, password) {
      try {
        const response = await authService.login(username, password);

        store.set(this, response.data);

      } catch (error) {
        return Promise.reject(error);
      }
    },

    logout() {
      store.unset(this);
      router.push({ name: "Auth" });
    },

    async register(username, email, password) {
      try {
        const response = await authService.register(username, email, password);

        store.set(this, response.data);
      } catch (error) {
        // console.log(error);
        // commit("loginFailure", error);
        // dispatch("alert/error", error, { root: true });
      }
    },
  },
});
