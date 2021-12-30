import { Mutation } from "../types";

export default {
  [Mutation.LOADING_START]: (state) => state.loading = true,
  [Mutation.LOADING_STOP]: (state) => state.loading = false,

  [Mutation.TOGGLE_EDIT_OVERLAY]:
    (state) => state.showEditOverlay = !state.showEditOverlay,

  [Mutation.SET_COUNTRIES]: (state, payload) => {
    state.countries = payload.reduce(
      (acc, cur) => Object.assign(acc, { [cur.id]: cur }),
      {},
    );
  },

  [Mutation.SET_CITIES]: (state, payload) => {
    state.cities = payload.reduce(
      (acc, cur) => Object.assign(acc, { [cur.id]: cur }),
      {},
    );
  },
};
