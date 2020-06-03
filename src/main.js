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

// Route guard. Redirect unathenticated requests to Login page.
router.beforeEach((to, from, next) => {
  // console.log("In router.beforeEach()");
  // console.log("Route from: " + from.name);
  // console.log("Route to: " + to.name);

  const isAuthenticated = store.getters["auth/IS_AUTHENTICATED"];
  if (to.name !== "Auth" && !isAuthenticated) next({ name: "Auth" });
  // Don't allow logged in users to see Auth View.
  else if (to.name === "Auth" && isAuthenticated)
    next({ name: "LogbookGlance" });
  else next();
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
