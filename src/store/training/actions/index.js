import { trainingService } from "@/_services";

import { Action, Mutation } from "../types";

export default {
  [Action.DATA_RETRIEVED]: ({ commit }) => {
    commit(`${[Mutation.SET_DATA_RETRIEVED]}`);
  },

  [Action.DATA_NOT_RETRIEVED]: ({ commit }) => {
    commit(`${[Mutation.SET_DATA_NOT_RETRIEVED]}`);
  },

  [Action.GET_DATA]: ({ dispatch }) => {
    const p = Promise.all([
      dispatch("_getGyms"),
      dispatch("_getSessions"),
    ]).then(() => {
      dispatch(`${[Action.DATA_RETRIEVED]}`);
    });

    return p;
  },

  _getGyms: async ({ commit }) => {
    try {
      let response = await trainingService.getGyms();
      commit(`${[Mutation.SET_GYMS]}`, response.data);
    } catch (error) {
      console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  _getSessions: async ({ commit }) => {
    try {
      let response = await trainingService.getSessions();
      commit(`${[Mutation.SET_SESSIONS]}`, response.data);
    } catch (error) {
      console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },
};
