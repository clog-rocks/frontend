import "@/scss/thin-header.scss";
import "@/scss/transitions/bounce.scss";
import "@/scss/transitions/fade.scss";
import "@/scss/transitions/swing-in-bottom-fwd.scss";
import App from "@/App.vue";
import { Mutation as AuthMutation } from "@/store/auth/types";
import { Mutation as CoreMutation } from "@/store/core/types";
import LoadingOverlay from "@/components/layout/LoadingOverlay";
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
const token = JSON.parse(localStorage.getItem("token"));

if (token?.access) {
  api.defaults.headers.common.Authorization = "Bearer " + token.access;
}

// Set up request/response interceptors.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
        case 403:
          // Use `refresh` to refresh token?
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

// Register commonly used components.
Vue.component("LoadingOverlay", LoadingOverlay);

new Vue({
  name: "ClogApp",
  router,
  store,
  vuetify,
  render: (h) => h(App),
})
  .$mount("#app");
