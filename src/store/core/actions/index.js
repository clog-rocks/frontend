import { coreService } from "@/_services";

import { Action, Mutation } from "../types";

export default {
  [Action.TOGGLE_LOADING]: ({ commit }) => {
    commit(`${[Mutation.TOGGLE_LOADING]}`);
  },

  [Action.GET_COUNTRIES]: async ({ commit }) => {
    console.log("getting countries");
    try {
      let response = await coreService.getCountries();
      commit(`${[Mutation.SET_COUNTRIES]}`, response.data);
    } catch (error) {
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
      // reject(error);
    }
  },

  [Action.GET_CITIES]: async ({ commit }) => {
    console.log("getting cities");
    try {
      let response = await coreService.getCities();
      commit(`${[Mutation.SET_CITIES]}`, response.data);
    } catch (error) {
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },
};
