import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import core from "./core";
import logbook from "./logbook";
import training from "./training";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    core,
    logbook,
    training,
  },
});
