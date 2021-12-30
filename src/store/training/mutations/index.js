import { Mutation } from "../types";

export default {
  [Mutation.SET_GYMS]: (state, payload) => {
    state.gyms = payload.reduce(
      (acc, cur) => Object.assign(acc, { [cur.id]: cur }),
      {},
    );
  },

  [Mutation.SET_SESSIONS]: (state, payload) => {
    state.sessions = payload.reduce(
      (acc, cur) => Object.assign(acc, { [cur.id]: cur }),
      {},
    );
  },

  [Mutation.SET_DATA]: (state, payload) => {
    state.data = payload.reduce(
      (acc, cur) => Object.assign(acc, { [cur.id]: cur }),
      {},
    );
  },

  [Mutation.SET_DATA_RETRIEVED]: (state) => state.dataRetrieved = true,
  [Mutation.SET_DATA_MISSING]: (state) => state.dataRetrieved = false,
  [Mutation.ADD_SESSION]: (state, session) => (
    state.data = { ...state.data, [session.id]: session }
  ),
};
