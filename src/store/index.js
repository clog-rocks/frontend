import Vue from "vue";
import Vuex from "vuex";
import training from "./training";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    training,
  },
});
