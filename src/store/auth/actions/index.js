import router from "@/router";

import { authService } from "@/_services";

import { Action, Mutation } from "../types";

export default {
  [Action.LOGIN]: async ({ commit }, { username, password }) => {
    try {
      let response = await authService.login(username, password);
      commit(`${[Mutation.LOGIN_SUCCESS]}`, response.data);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  [Action.LOGOUT]: async ({ commit }) => {
    try {
      await authService.logout();
      commit(`${[Mutation.LOGOUT_SUCCESS]}`);
      router.push({ name: "Auth" });
    } catch (error) {
      console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  [Action.REGISTER]: async ({ commit }, { username, email, password }) => {
    try {
      let response = await authService.register(username, email, password);
      commit(`${[Mutation.LOGIN_SUCCESS]}`, response.data);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  [Action.SHOW_COMPONENT]: ({ commit }, component) => {
    commit(`${[Mutation.SHOW_COMPONENT]}`, component);
  },
};
