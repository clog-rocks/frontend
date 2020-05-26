import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import core from "./modules/core";
import logbook from "./modules/logbook";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    core,
    logbook,
  },
});
