import { logbookService } from "@/_services";

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
      dispatch("_getGrades"),
      dispatch("_getStyles"),
      dispatch("_getData"),
    ]).then(() => {
      dispatch(`${[Action.DATA_RETRIEVED]}`);
    });

    return p;
  },

  _getGrades: async ({ commit }) => {
    try {
      let response = await logbookService.getGrades();
      commit(`${[Mutation.SET_GRADES]}`, response.data);
    } catch (error) {
      // console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  _getStyles: async ({ commit }) => {
    try {
      let response = await logbookService.getStyles();
      commit(`${[Mutation.SET_STYLES]}`, response.data);
    } catch (error) {
      // console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  _getCrags: async ({ commit }) => {
    try {
      let response = await logbookService.getCrags();
      commit(`${[Mutation.SET_CRAGS]}`, response.data);
    } catch (error) {
      // console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  _getSectors: async ({ commit }) => {
    try {
      let response = await logbookService.getSectors();
      commit(`${[Mutation.SET_SECTORS]}`, response.data);
    } catch (error) {
      // console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  _getRoutes: async ({ commit }) => {
    try {
      let response = await logbookService.getRoutes();
      commit(`${[Mutation.SET_ROUTES]}`, response.data);
    } catch (error) {
      // console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  _getAscents: async ({ commit }) => {
    try {
      let response = await logbookService.getAscents();
      commit(`${[Mutation.SET_ASCENTS]}`, response.data);
    } catch (error) {
      // console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  _getData: async ({ commit }) => {
    try {
      let response = await logbookService.getData();
      commit(`${[Mutation.SET_DATA]}`, response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
