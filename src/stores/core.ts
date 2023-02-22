import { keyBy } from "lodash-es";
import { defineStore } from "pinia";
import { ref } from "vue";

import { useStoreStatus } from "@/composables/storeStatus";
import { coreService } from "@/services";
import type { City, Country } from "@/types/core";

export const useCoreStore = defineStore("core", () => {
  const { _status, status } = useStoreStatus();

  const countries = ref<{ [key: number]: Country }>({});
  const cities = ref<{ [key: number]: City }>({});

  function fetch() {
    _status.value = "FETCHING";

    return Promise.all([_fetchCities(), _fetchCountries()]).then(
      () => {
        _status.value = "FETCHED";
      },
      (error) => {
        _status.value = "FAILED";
        console.log("Somethongwent fedsfjdfaskd", error);
      }
    );
  }

  const _fetchCountries = async () =>
    (countries.value = keyBy(await coreService.fetchCountries(), "id"));

  const _fetchCities = async () =>
    (cities.value = keyBy(await coreService.fetchCities(), "id"));

  return {
    // state
    _status,
    countries,
    cities,

    // Getters
    status,

    // actions
    fetch,
  };
});
