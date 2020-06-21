import { Mutation } from "../types";

export default {
  [Mutation.SET_GYMS]: (state, payload) => {
    state.gyms = payload.reduce((acc, cur) => ((acc[cur.id] = cur), acc), {});
  },

  [Mutation.SET_SESSIONS]: (state, payload) => {
    state.sessions = payload.reduce(
      (acc, cur) => ((acc[cur.id] = cur), acc),
      {}
    );
  },

  [Mutation.SET_DATA]: (state, payload) => {
    state.data = payload.reduce((acc, cur) => ((acc[cur.id] = cur), acc), {});
  },

  [Mutation.SET_DATA_RETRIEVED]: (state) => {
    state.dataRetrieved = true;
  },

  [Mutation.SET_DATA_NOT_RETRIEVED]: (state) => {
    state.dataRetrieved = false;
  },
};
