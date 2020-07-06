import "@/scss/transitions/bounce.scss";
import "@/scss/transitions/fade.scss";
import "@/scss/transitions/swing-in-bottom-fwd.scss";
import App from "@/App.vue";
import { Mutation as AuthMutation } from "@/store/auth/types";
import { Mutation as CoreMutation } from "@/store/core/types";
import Loading from "@/components/layout/Loading";
import Vue from "vue";
import api from "@/_services/api";
import router from "@/router";
import store from "@/store";
import vuetify from "@/plugins/vuetify";

Vue.config.productionTip = false;

// Axios.
// Expose axios instance in components (this.$http).
Vue.prototype.$http = api;

// Set up global header for Axios if user is authenticated when application starts.
const token = localStorage.getItem("token");

if (token) {
  api.defaults.headers.common.Authorization = "Token " + token;
}

// Set up request/response interceptors.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
      case 401:
      case 403:
        // Stop loading indicator and logout.
        store.commit(`core/${[CoreMutation.LOADING_STOP]}`);
        store.commit(`auth/${[AuthMutation.LOGOUT_SUCCESS]}`);

        router.replace({
          name: "Auth",
          query: { redirect: router.currentRoute.fullPath },
        });

        break;
      }

      return Promise.reject(error);
    }
  },
);

// Vue-router: route guard.
// Redirect unathenticated requests to Login page.
router.beforeEach((to, _from, next) => {
  const isAuthenticated = store.state.auth.isAuthenticated;

  if (to.name !== "Auth" && !isAuthenticated) {
    next({ name: "Auth" });
  } else if (to.name === "Auth" && isAuthenticated) {
    // Don't allow logged in users to see Auth View.
    next({ name: "Logbook" });
  } else {
    next();
  }
});

new Vue({
  name: "Clog",
  router,
  store,
  vuetify,
  render: (h) => h(App),
})
  .$mount("#app");

// Register commonly used components.
Vue.component("Loading", Loading);
