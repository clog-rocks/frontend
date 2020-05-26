import { coreService } from "@/_services/core.service";

const state = {
  loading: false,
  countries: [],
};

const getters = {
  LOADING: (state) => state.loading,
};

const mutations = {
  TOGGLE_LOADING: (state) => {
    state.loading = !state.loading;
  },

  SET_COUNTRIES(state, payload) {
    state.countries = payload;
  },
};
const actions = {
  toggleLoading: ({ commit }) => {
    commit("TOGGLE_LOADING");
  },

  getCountries: ({ commit }) => {
    console.log("in store.core.getCountries");
    return new Promise((resolve, reject) => {
      coreService.getCountries().then(
        (response) => {
          commit("SET_COUNTRIES", response.data);
          return resolve(response);
        },
        (error) => {
          // commit("loginFailure", error);
          // dispatch("alert/error", error, { root: true });
          reject(error);
        }
      );
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
