import "./assets/main.css";
import "vue-multiselect/dist/vue-multiselect.css";

import Cookies from "js-cookie";
import { createPinia } from "pinia";
import { createORM } from "pinia-orm";
import { createApp } from "vue";

import App from "@/App.vue";
import NavigationBar from "@/components/layout/NavigationBar.vue";
import router from "@/router";
import api from "@/services/api";
import { useUserStore } from "@/stores";

import resetStore from "./reset-store";

const pinia = createPinia();
pinia.use(resetStore);
pinia.use(createORM());

const app = createApp(App);
app.use(pinia);
app.use(router);
app.component("NavigationBar", NavigationBar);

const userStore = useUserStore();

// Don't allow authenticated users to access Auth View.
router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth && userStore.isAuthenticated) {
    return { name: "logbook" };
  }
});

// Make sure the user is authenticated &
router.beforeEach(async (to) => {
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return {
      name: "login",
      replace: true,
      query: { redirect: to.fullPath },
    };
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
  },
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
    config!.headers![config.xsrfHeaderName!] = csrftoken;
  }

  return config;
});

app.mount("#app");
