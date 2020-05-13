import { authService } from "../../_services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");
const state = {
  activeComponent: "Login",
  iaAuthenticated: false,
  user: user,
  token: token,
};

const mutations = {
  // Change component disaplyed on Auth view.
  activateComponent(state, component) {
    state.activeComponent = component;
  },

  // Set up user as logged in.
  loginSuccess(state, data) {
    state.isAuthenticated = true;
    state.user = data.user;
    state.token = data.token;
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
  },

  logoutSuccess(state) {
    state.isAuthenticated = false;
    state.user = {};
    state.token = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    state.isAuthenticated = false;
  },
};

const actions = {
  // login: ({ dispatch, commit }, { username, password }) => {
  login: ({ commit }, { username, password }) => {
    return new Promise((resolve, reject) => {
      authService.login(username, password).then(
        (response) => {
          commit("loginSuccess", response);
          return resolve(response);
        },
        (error) => {
          // commit("loginFailure", error);
          // dispatch("alert/error", error, { root: true });
          reject(error);
        }
      );
    });
  },

  logout: ({ commit }) => {
    return new Promise((resolve, reject) => {
      authService.logout().then(
        (response) => {
          commit("logoutSuccess");
          console.log(response);
          return resolve(response);
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });
  },

  register: ({ commit }, { username, email, password }) => {
    return new Promise((resolve, reject) => {
      authService.register(username, email, password).then(
        (response) => {
          commit("loginSuccess", response.data);
          return resolve(response);
        },
        (error) => {
          // commit("loginFailure", error);
          // dispatch("alert/error", error, { root: true });
          reject(error);
        }
      );
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
