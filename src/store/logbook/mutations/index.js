import { Mutation } from "../types";

export default {
  [Mutation.SET_GRADES]: (state, payload) => {
    state.grades = payload.reduce((acc, cur) => ((acc[cur.id] = cur), acc), {});
  },

  [Mutation.SET_STYLES]: (state, payload) => {
    state.styles = payload.reduce((acc, cur) => ((acc[cur.id] = cur), acc), {});
  },

  [Mutation.SET_CRAGS]: (state, payload) => {
    state.crags = payload.reduce((acc, cur) => ((acc[cur.id] = cur), acc), {});
  },

  [Mutation.SET_SECTORS]: (state, payload) => {
    state.sectors = payload.reduce(
      (acc, cur) => ((acc[cur.id] = cur), acc),
      {}
    );
  },

  [Mutation.SET_ROUTES]: (state, payload) => {
    state.routes = payload.reduce((acc, cur) => ((acc[cur.id] = cur), acc), {});
  },

  [Mutation.SET_ASCENTS]: (state, payload) => {
    state.ascents = payload.reduce(
      (acc, cur) => ((acc[cur.id] = cur), acc),
      {}
    );
  },

  [Mutation.SET_DATA_RETRIEVED]: (state) => {
    state.dataRetrieved = true;
  },

  [Mutation.SET_DATA_NOT_RETRIEVED]: (state) => {
    state.dataRetrieved = false;
  },
};
