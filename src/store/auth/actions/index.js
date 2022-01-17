import { Action, Mutation } from "../types";
import { authService } from "@/_services";
import router from "@/router";

export default {
  [Action.LOGIN]: async ({ commit }, { username, password }) => {
    try {
      const response = await authService.login(username, password);

      commit(`${[Mutation.LOGIN_SUCCESS]}`, response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  [Action.LOGOUT]: ({ commit }) => {
    commit(`${[Mutation.LOGOUT_SUCCESS]}`);
    router.push({ name: "Auth" });
  },

  [Action.REGISTER]: async ({ commit }, { username, email, password }) => {
    try {
      const response = await authService.register(username, email, password);

      commit(`${[Mutation.LOGIN_SUCCESS]}`, response.data);
    } catch (error) {
      // console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  [Action.SHOW_COMPONENT]: ({ commit }, component) => {
    commit(`${[Mutation.SHOW_COMPONENT]}`, component);
  },
};
