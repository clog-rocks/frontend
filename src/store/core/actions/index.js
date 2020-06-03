import { coreService } from "@/_services";

import { Action, Mutation } from "../types";

export default {
  [Action.TOGGLE_LOADING]: ({ commit }) => {
    commit(`${[Mutation.TOGGLE_LOADING]}`);
  },

  [Action.GET_COUNTRIES]: ({ commit }) => {
    console.log("in store.core.getCountries");
    return new Promise((resolve, reject) => {
      coreService.getCountries().then(
        (response) => {
          commit(`${[Mutation.SET_COUNTRIES]}`, response.data);
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

  [Action.GET_CITIES]: ({ commit }) => {
    console.log("in store.core.getCities");
    return new Promise((resolve, reject) => {
      coreService.getCities().then(
        (response) => {
          commit(`${[Mutation.SET_CITIES]}`, response.data);
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
