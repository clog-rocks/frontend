import { Action, Mutation } from "../types";
import { logbookService } from "@/_services";

export default {
  [Action.GET_DATA]: ({ commit, dispatch }) => {
    const p = Promise.all([
      dispatch("_getGrades"),
      dispatch("_getStyles"),
      dispatch("_getData"),
    ])
      .then(() => {
        commit(`${[Mutation.SET_DATA_RETRIEVED]}`);
      });

    return p;
  },

  _getGrades: async ({ commit }) => {
    try {
      const response = await logbookService.getGrades();

      commit(`${[Mutation.SET_GRADES]}`, response.data);
    } catch (error) {
      // console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  _getStyles: async ({ commit }) => {
    try {
      const response = await logbookService.getStyles();

      commit(`${[Mutation.SET_STYLES]}`, response.data);
    } catch (error) {
      // console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  _getCrags: async ({ commit }) => {
    try {
      const response = await logbookService.getCrags();

      commit(`${[Mutation.SET_CRAGS]}`, response.data);
    } catch (error) {
      // console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  _getSectors: async ({ commit }) => {
    try {
      const response = await logbookService.getSectors();

      commit(`${[Mutation.SET_SECTORS]}`, response.data);
    } catch (error) {
      // console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  _getRoutes: async ({ commit }) => {
    try {
      const response = await logbookService.getRoutes();

      commit(`${[Mutation.SET_ROUTES]}`, response.data);
    } catch (error) {
      // console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  _getAscents: async ({ commit }) => {
    try {
      const response = await logbookService.getAscents();

      commit(`${[Mutation.SET_ASCENTS]}`, response.data);
    } catch (error) {
      // console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  _getData: async ({ commit }) => {
    try {
      const response = await logbookService.getData();

      commit(`${[Mutation.SET_DATA]}`, response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
