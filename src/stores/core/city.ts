import { keyBy } from "lodash-es";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { useStoreStatus } from "@/composables/storeStatus";
import { coreService } from "@/services";
import type { City, CityMultiselect, CityRequest } from "@/types/core";

import { useCoreCountryStore } from "./country";

export const useCoreCityStore = defineStore("core/city", () => {
  const { _status, status } = useStoreStatus();
  const countryStore = useCoreCountryStore();

  const cities = ref<{ [key: number]: City }>({});

  const multiselect = computed<CityMultiselect[]>(() => {
    return Object.values(cities.value).map((city) => ({
      id: city.id,
      name: city.name,
      country: countryStore.countries[city.country].name,
    }));
  });

  function fetch() {
    async function fetch() {
      return (cities.value = keyBy(await coreService.city.fetch(), "id"));
    }

    _status.value = "FETCHING";

    return Promise.all([countryStore.fetch(), fetch()]).then(
      () => {
        _status.value = "FETCHED";
      },
      (error) => {
        _status.value = "FAILED";
        console.log("Something went wrong fetching core/city.", error);
      },
    );
  }

  async function create(city: CityRequest) {
    try {
      const response = await coreService.city.create(city);

      cities.value[response.id] = response;

      return Promise.resolve(response);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  return {
    // state
    _status,
    cities,

    // getters
    multiselect,
    status,

    // actions
    create,
    fetch,
  };
});
