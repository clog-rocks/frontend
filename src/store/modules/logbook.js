import { logbookService } from "@/_services/logbook.service";
import { differenceInDays, parseISO } from "date-fns";

const state = {
  grades: [],
  styles: [],
  crags: [],
  sectors: [],
  routes: [],
  ascents: [],
  ascentsLastYear: [],

  dataRetrieved: false,
};

const getters = {
  DATA_RETRIEVED: (state) => state.dataRetrieved,

  ASCENT_COUNT: (state) => state.ascents.length,
  CRAG_VISIT_COUNT: (state) =>
    [...new Set(state.ascents.map((x) => x.date))].length,

  ASCENT_LAST_YEAR_COUNT: (state) => state.ascentsLastYear.length,
  CRAG_VISIT_LAST_YEAR_COUNT: (state) =>
    [...new Set(state.ascentsLastYear.map((x) => x.date))].length,

  // WIP
  // TOP_ONSIGHT: (state) =>
  //   Math.max(...state.ascents.filter((x) => x.style === 1).map((o) => o.y), 0),
  //
  // TOP_FLASH: (state) =>
  //   Math.max(...state.ascents.filter((x) => x.style === 2).map((o) => o.y), 0),
  //
  // TOP_REDPOINT: (state) =>
  //   Math.max(...state.ascents.filter((x) => x.style === 3).map((o) => o.y), 0),
};

const mutations = {
  SET_GRADES(state, payload) {
    state.grades = payload;
  },

  SET_STYLES(state, payload) {
    state.styles = payload;
  },

  SET_CRAGS(state, payload) {
    state.crags = payload;
  },

  SET_SECTORS(state, payload) {
    state.sectors = payload;
  },

  SET_ROUTES(state, payload) {
    state.routes = payload;
  },

  SET_ASCENTS(state, payload) {
    state.ascents = payload;

    state.ascentsLastYear = payload.filter(
      (ascent) =>
        differenceInDays(new Date(parseISO(ascent.date)), new Date()) >= -365
    );
  },

  SET_DATA_RETRIEVED(state) {
    state.dataRetrieved = true;
  },

  SET_DATA_NOT_RETRIEVED(state) {
    state.dataRetrieved = false;
  },
};

const actions = {
  dataRetrieved: ({ commit }) => {
    commit("SET_DATA_RETRIEVED");
  },

  dataNotRetrieved: ({ commit }) => {
    commit("SET_DATA_NOT_RETRIEVED");
  },

  getLogbookData: ({ dispatch }) => {
    const p = Promise.all([
      dispatch("getCountries"),
      dispatch("getCrags"),
      dispatch("getSectors"),
      dispatch("getRoutes"),
      dispatch("getAscents"),
      dispatch("getGrades"),
      dispatch("getStyles"),
    ]).then(() => {
      dispatch("dataRetrieved");
    });

    return p;
  },

  getGrades: async ({ commit }) => {
    try {
      let response = await logbookService.getGrades();
      commit("SET_GRADES", response.data);
    } catch (error) {
      console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  getStyles: async ({ commit }) => {
    try {
      let response = await logbookService.getStyles();
      commit("SET_STYLES", response.data);
    } catch (error) {
      console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  getCrags: async ({ commit }) => {
    try {
      let response = await logbookService.getCrags();
      commit("SET_CRAGS", response.data);
    } catch (error) {
      console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  getSectors: async ({ commit }) => {
    try {
      let response = await logbookService.getSectors();
      commit("SET_SECTORS", response.data);
    } catch (error) {
      console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  getRoutes: async ({ commit }) => {
    try {
      let response = await logbookService.getRoutes();
      commit("SET_ROUTES", response.data);
    } catch (error) {
      console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },

  getAscents: async ({ commit }) => {
    try {
      let response = await logbookService.getAscents();
      commit("SET_ASCENTS", response.data);
    } catch (error) {
      console.log(error);
      // commit("loginFailure", error);
      // dispatch("alert/error", error, { root: true });
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
