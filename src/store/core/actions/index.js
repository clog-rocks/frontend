import { Action, Mutation } from "../types";
import { coreService } from "@/_services";

export default {
  [Action.GET_COUNTRIES]: async ({ commit }) => {
    try {
      const response = await coreService.getCountries();

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
      const response = await coreService.getCities();

      commit(`${[Mutation.SET_CITIES]}`, response.data);
    } catch (error) {
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },
};
