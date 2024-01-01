import { StorageSerializers, useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import type { Ref } from "vue";

import { useStoreStatus } from "@/composables/storeStatus";
import router from "@/router";
import { userService } from "@/services";
import type { User, UserRegister } from "@/types/auth";

import { useCoreCityStore, useTrainingSessionStore } from ".";
import { useLogbookAscentStore } from "./logbook/ascent";

export const useUserStore = defineStore("user", () => {
  const { _status, status } = useStoreStatus();

  const isAuthenticated = useLocalStorage("pinia/isAuthenticated", false);
  const user: Ref<User | null> = useLocalStorage("pinia/user", null, {
    serializer: StorageSerializers.object,
  });

  async function login(username: string, password: string) {
    try {
      _status.value = "FETCHING";
      const response = await userService.login(username, password);
      user.value = response;
      isAuthenticated.value = true;
      _status.value = "FETCHED";

      router.push(
        (router.currentRoute.value.query.redirect as string) || {
          name: "logbook",
        },
      );
      return Promise.resolve(response);
    } catch (error) {
      _status.value = "FAILED";
      return Promise.reject(error);
    }
  }

  async function logout(with_api_call = true) {
    if (with_api_call) {
      await userService.logout();
    }

    user.value = null;
    isAuthenticated.value = false;

    const coreCityStore = useCoreCityStore();
    const logbookAscentStore = useLogbookAscentStore();
    const trainingSessionStore = useTrainingSessionStore();

    coreCityStore.$reset();
    logbookAscentStore.$reset();
    trainingSessionStore.$reset();

    if (with_api_call) {
      // Regular logout, so no redirecting back.
      router.push({ name: "login" });
    } else {
      // Logging out on error, so set up redirection.
      router.replace({
        name: "login",
        query: { redirect: router.currentRoute.value.fullPath },
      });
    }
  }

  async function register(user_data: UserRegister) {
    try {
      const response = await userService.register(user_data);
      user.value = response;
      isAuthenticated.value = true;

      router.push({ name: "logbook" });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return {
    // State
    _status,
    status,
    user,

    // Getters
    isAuthenticated,

    // Actions
    login,
    logout,
    register,
  };
});
