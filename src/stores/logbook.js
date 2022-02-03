import { differenceInDays, parseISO } from "date-fns";
import { defineStore } from "pinia";
import { logbookService } from "@/_services";

// TODO: rename actions and getters.

export const useLogbookStore = defineStore({
  id: "logbook",
  state: () => {
    return {
      grades: {},
      styles: {},
      crags: {},
      sectors: {},
      routes: {},

      ascents: {},
      data: {},

      dataRetrieved: false,
    };
  },

  actions: {
    GET_DATA() {
      const p = Promise.all([
        this._getGrades(),
        this._getStyles(),
        this._getData(),
      ])
        .then(() => {
          this.dataRetrieved = true;
        });

      return p;
    },

    async _getGrades() {
      try {
        const response = await logbookService.getGrades();

        this.grades = response.data.reduce(
          (acc, cur) => Object.assign(acc, { [cur.id]: cur }),
          {},
        );
      } catch (error) {
        // console.log(error);
        // commit("loginFailure", error);
        // dispatch("alert/error", error, { root: true });
      }
    },

    async _getStyles() {
      try {
        const response = await logbookService.getStyles();

        this.styles = response.data.reduce(
          (acc, cur) => Object.assign(acc, { [cur.id]: cur }),
          {},
        );
      } catch (error) {
        // console.log(error);
        // commit("loginFailure", error);
        // dispatch("alert/error", error, { root: true });
      }
    },

    async _getCrags() {
      try {
        const response = await logbookService.getCrags();

        this.crags = response.data.reduce(
          (acc, cur) => Object.assign(acc, { [cur.id]: cur }),
          {},
        );
      } catch (error) {
        // console.log(error);
        // commit("loginFailure", error);
        // dispatch("alert/error", error, { root: true });
      }
    },

    async _getSectors() {
      try {
        const response = await logbookService.getSectors();

        this.sectors = response.data.reduce(
          (acc, cur) => Object.assign(acc, { [cur.id]: cur }),
          {},
        );
      } catch (error) {
        // console.log(error);
        // commit("loginFailure", error);
        // dispatch("alert/error", error, { root: true });
      }
    },

    async _getRoutes() {
      try {
        const response = await logbookService.getRoutes();

        this.routes = response.data.reduce(
          (acc, cur) => Object.assign(acc, { [cur.id]: cur }),
          {},
        );
      } catch (error) {
        // console.log(error);
        // commit("loginFailure", error);
        // dispatch("alert/error", error, { root: true });
      }
    },

    async _getAscents() {
      try {
        const response = await logbookService.getAscents();

        this.ascents = response.data.reduce(
          (acc, cur) => Object.assign(acc, { [cur.id]: cur }),
          {},
        );
      } catch (error) {
        // console.log(error);
        // commit("loginFailure", error);
        // dispatch("alert/error", error, { root: true });
      }
    },

    async _getData() {
      try {
        const response = await logbookService.getData();

        this.data = response.data.reduce(
          (acc, cur) => Object.assign(acc, { [cur.id]: cur }),
          {},
        );
      } catch (error) {
        return Promise.reject(error);
      }
    },

    getData() { },
  },

  getters: {
    ASCENT_COUNT: (state) => Object.keys(state.data).length,

    ASCENT_LAST_YEAR: (state) => Object.values(state.data)
      .filter((ascent) => differenceInDays(
        new Date(parseISO(ascent.date)),
        new Date(),
      ) >= -365),

    ASCENT_LAST_YEAR_COUNT() { return this.ASCENT_LAST_YEAR.length; },

    CRAG_VISIT_COUNT: (state) => [
      ...new Set(Object.values(state.data)
        .map((x) => x.date)),
    ].length,

    CRAG_VISIT_LAST_YEAR_COUNT() {
      return [
        ...new Set(Object.values(this.ASCENT_LAST_YEAR)
          .map((x) => x.date)),
      ].length;
    },

    TOP_GRADES: (state) => {
      const get_max_grade_for_style = (style) => state.grades[
        Math.max(
          ...Object.values(state.data)
            .filter((x) => x.style.id === style)
            .map((x) => x.route.grade.id),
        )
      ];

      return Object.values(state.styles)
        .reduce((acc, style) => {
          acc.push({
            ...get_max_grade_for_style(style.id),
            style: state.styles[style.id].name.toLowerCase(),
          });

          return acc;
        }, [])
        .sort((a, b) => (a.weight < b.weight ? 1 : -1));
    },
  },
});
