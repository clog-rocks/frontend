import "./assets/main.css";

import Cookies from "js-cookie";
import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "@/App.vue";
import router from "@/router";
import api from "@/services/api";
import { useUserStore } from "@/stores";

import resetStore from "./reset-store";

const pinia = createPinia();
pinia.use(resetStore);

const app = createApp(App);
app.use(pinia);
app.use(router);

const userStore = useUserStore();

// vue-router: route guard
router.beforeEach(async (to) => {
  // Don't allow authenticated users to access Auth View.
  if (!to.meta.requiresAuth && userStore.isAuthenticated) {
    return { name: "logbook" };
  }

  // Make sure the user is authenticated &
  // Avoid an infinite redirects.
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return {
      name: "login",
      replace: true,
      query: { redirect: to.fullPath },
    };
  }

  const isLogoutRoute = to.matched.some((record) => record.name === "logout");

  if (isLogoutRoute) {
    userStore.logout();
    return;
  }
});

// Set up Axios' interceptors.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
        case 403:
          userStore.logout(false);
          break;
      }
    }
  }
);

api.interceptors.request.use((config) => {
  const csrftoken = Cookies.get(config.xsrfCookieName!);

  function csrfSafeMethod(method: string) {
    // These HTTP methods do not require CSRF protection.
    return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method.toUpperCase());
  }

  if (
    !csrfSafeMethod(config.method!) &&
    csrftoken !== undefined &&
    config.url !== "/api/auth/login/"
  ) {
    console.log("not safe, setting header");
    config!.headers![config.xsrfHeaderName!] = csrftoken;
  }

  return config;
});

app.mount("#app");
