import { keyBy } from "lodash-es";
import { defineStore } from "pinia";
import { ref } from "vue";

import { useStoreStatus } from "@/composables/storeStatus";
import { coreService } from "@/services";
import type { Country } from "@/types/core";

export const useCoreCountryStore = defineStore("core/country", () => {
  const { _status, status } = useStoreStatus();

  const countries = ref<{ [key: number]: Country }>({});

  async function fetch() {
    try {
      countries.value = keyBy(await coreService.country.fetch(), "id");
      _status.value = "FETCHED";
    } catch (error) {
      _status.value = "FAILED";
      console.log("Something went wrong fetching core/country data.", error);
    }
  }

  return {
    // state
    _status,
    countries,

    // getters
    status,

    // actions
    fetch,
  };
});
