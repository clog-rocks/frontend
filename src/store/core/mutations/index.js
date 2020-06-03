import { Mutation } from "../types";

export default {
  [Mutation.TOGGLE_LOADING]: (state) => {
    state.loading = !state.loading;
  },

  [Mutation.SET_COUNTRIES]: (state, payload) => {
    state.countries = payload.reduce(
      (acc, cur) => ((acc[cur.id] = cur), acc),
      {}
    );
  },

  [Mutation.SET_CITIES]: (state, payload) => {
    state.cities = payload.reduce((acc, cur) => ((acc[cur.id] = cur), acc), {});
  },
};
