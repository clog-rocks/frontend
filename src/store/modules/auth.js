import axios from "axios";

import router from "@/router";
import { authService } from "@/_services/auth.service";

const state = {
  // Component which should be displayed on Auth view.
  // Login or Register.
  activeComponent: "Login",
  isAuthenticated: localStorage.getItem("isAuthenticated") || false,
  user: JSON.parse(localStorage.getItem("user") || "{}"),
  token: localStorage.getItem("token"),
};

const getters = {
  IS_AUTHENTICATED: (state) =>
    state.user && state.token && state.isAuthenticated,

  AUTH_COMPONENT: (state) => state.activeComponent,

  TOKEN: (state) => state.token,
  USERNAME: (state) => state.user.username,
};

const mutations = {
  // Change component displayed on Auth view.
  ACTIVATE_COMPONENT: (state, component) => (state.activeComponent = component),

  // Set up user as logged in.
  LOGIN_SUCCESS: (state, payload) => {
    axios.defaults.headers.common["Authorization"] = "Token " + payload.token;
    state.user = payload.user;
    state.token = payload.token;
    localStorage.setItem("user", JSON.stringify(payload.user));
    localStorage.setItem("token", payload.token);
    localStorage.setItem("isAuthenticated", true);
    state.isAuthenticated = true;
  },

  LOGOUT_SUCCESS: (state) => {
    axios.defaults.headers.common["Authorization"] = null;
    state.user = {};
    state.token = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    state.isAuthenticated = false;
  },
};

const actions = {
  switchComponent: ({ commit }, component) => {
    commit("ACTIVATE_COMPONENT", component);
  },

  login: async ({ commit }, { username, password }) => {
    try {
      let response = await authService.login(username, password);
      commit("LOGIN_SUCCESS", response.data);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  logout: async ({ commit }) => {
    try {
      await authService.logout();
      router.push({ name: "Auth" });
      commit("LOGOUT_SUCCESS");
    } catch (error) {
      console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  register: async ({ commit }, { username, email, password }) => {
    try {
      let response = await authService.register(username, email, password);
      commit("loginSuccess", response.data);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
