import { trainingService } from "@/_services";

import { Action, Mutation } from "../types";

export default {
  [Action.DATA_RETRIEVED]: ({ commit }) => {
    commit(`${[Mutation.SET_DATA_RETRIEVED]}`);
  },

  [Action.DATA_NOT_RETRIEVED]: ({ commit }) => {
    commit(`${[Mutation.SET_DATA_NOT_RETRIEVED]}`);
  },

  [Action.GET_DATA]: async ({ commit, dispatch }) => {
    try {
      let response = await trainingService.getData();
      commit(`${[Mutation.SET_DATA]}`, response.data);
      dispatch(`${[Action.DATA_RETRIEVED]}`);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  _getGyms: async ({ commit }) => {
    try {
      let response = await trainingService.getGyms();
      commit(`${[Mutation.SET_GYMS]}`, response.data);
    } catch (error) {
      // console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  _getSessions: async ({ commit }) => {
    try {
      let response = await trainingService.getSessions();
      commit(`${[Mutation.SET_SESSIONS]}`, response.data);
    } catch (error) {
      // console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },
};
