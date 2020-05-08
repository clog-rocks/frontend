import { authService } from "../../_services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");
const state = {
  activeComponent: "Login",
  status: { loggedIn: false },
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
    state.status = { loggedIn: true };
    state.user = data.user;
    state.token = data.token;
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
