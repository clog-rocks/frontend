import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import vuetify from "@/plugins/vuetify";

import api from "@/_services/api";
import { Mutation } from "@/store/auth/types";

// Import common SCSS styles.
import "@/scss/transitions/swing-in-bottom-fwd.scss";
import "@/scss/counter-summary.scss";

Vue.config.productionTip = false;

// Axios.
// Expose axios instance in components (this.$http).
Vue.prototype.$http = api;

// Set up global header for Axios if user is authenticated
// when application starts.
const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers.common["Authorization"] = "Token " + token;
}

// Set up request/response interceptors.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
        case 403:
          store.commit(`auth/${[Mutation.LOGOUT_SUCCESS]}`, null, {
            root: true,
          });
          router.replace({
            name: "Auth",
            query: { redirect: router.currentRoute.fullPath },
          });
          break;
      }
      return Promise.reject(error);
    }
  }
);

// vue-router: route guard.
// Redirect unathenticated requests to Login page.
router.beforeEach((to, _from, next) => {
  // console.log("In router.beforeEach()");
  // console.log("Route from: " + from.name);
  // console.log("Route to: " + to.name);

  const isAuthenticated = store.state.auth.isAuthenticated;
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
