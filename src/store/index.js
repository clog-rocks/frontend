import Vue from "vue";
import Vuex from "vuex";
import logbook from "./logbook";
import training from "./training";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    logbook,
    training,
  },
});
