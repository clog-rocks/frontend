import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import axios from "axios";

Vue.config.productionTip = false;

// Set up global header for Axios if user is authenticated
// when application starts.
if (localStorage.getItem("token")) {
  axios.defaults.headers.common["Authorization"] =
    "Token " + localStorage.getItem("token");
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
