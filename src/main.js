import "@/scss/thin-header.scss";
import "@/scss/transitions/bounce.scss";
import "@/scss/transitions/fade.scss";
import "@/scss/transitions/swing-in-bottom-fwd.scss";
import { PiniaVuePlugin, createPinia } from "pinia";
import App from "@/App.vue";
import LoadingOverlay from "@/components/layout/LoadingOverlay";
import Vue from "vue";
import api from "@/_services/api";
import router from "@/router";
import store from "@/store";
import { useAuthStore } from "@/stores/auth";
import { useCoreStore } from "@/stores/core";
import vuetify from "@/plugins/vuetify";

Vue.config.productionTip = false;

// Create store
const pinia = createPinia();

Vue.use(PiniaVuePlugin);

// Axios.
// Expose axios instance in components (this.$http).
Vue.prototype.$http = api;

// Register commonly used components.
Vue.component("LoadingOverlay", LoadingOverlay);

new Vue({
  name: "ClogApp",
  router,
  store,
  vuetify,
  pinia,
  render: (h) => h(App),
})
  .$mount("#app");

// Set up global header for Axios if user is authenticated when application starts.
const token = JSON.parse(localStorage.getItem("token"));

if (token?.access) {
  api.defaults.headers.common.Authorization = "Bearer " + token.access;
}

// Set up request/response interceptors.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore();
    const coreStore = useCoreStore();

    if (error.response.status) {
      switch (error.response.status) {
        case 401:
        case 403:
          // Use `refresh` to refresh token?
          // Stop loading indicator and logout.
          coreStore.loading = false;
          authStore.logout();

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
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

  if (to.name !== "Auth" && !isAuthenticated) {
    next({ name: "Auth" });
  } else if (to.name === "Auth" && isAuthenticated) {
    // Don't allow logged in users to see Auth View.
    next({ name: "Logbook" });
  } else {
    next();
  }
});
