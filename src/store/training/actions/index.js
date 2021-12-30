import { Action, Mutation } from "../types";
import { trainingService } from "@/_services";

export default {
  [Action.GET_DATA]: async ({ commit }) => {
    try {
      const response = await trainingService.getData();

      commit(`${[Mutation.SET_DATA]}`, response.data);
      commit(`${[Mutation.SET_DATA_RETRIEVED]}`);

      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  _getGyms: async ({ commit }) => {
    try {
      const response = await trainingService.getGyms();

      commit(`${[Mutation.SET_GYMS]}`, response.data);
    } catch (error) {
      // console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  _addSession: async ({ commit }, payload) => {
    try {
      const response = await trainingService.addSession(payload);

      commit(`${[Mutation.ADD_SESSION]}`, response.data);

      return Promise.resolve(response);
    } catch (error) {
      console.log(error);

      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },
};
