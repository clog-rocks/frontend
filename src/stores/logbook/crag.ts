import keyBy from "lodash-es/keyBy";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { useStoreStatus } from "@/composables/storeStatus";
import { logbookService } from "@/services";
import type { Crag, CragMultiselect, CragRequest } from "@/types/logbook";

import { useCoreCountryStore } from "../core/country";

export const useLogbookCragStore = defineStore("logbook/crag", () => {
  const { _status, status } = useStoreStatus();
  const countryStore = useCoreCountryStore();

  const crags = ref<{ [key: number]: Crag }>({});

  const multiselect = computed<CragMultiselect[]>(() => {
    return Object.values(crags.value).map((crag) => {
      return {
        id: crag.id,
        name: crag.name,
        country: countryStore.countries[crag.country].name,
      };
    });
  });

  async function fetch() {
    try {
      crags.value = keyBy(await logbookService.crag.fetch(), "id");
      _status.value = "FETCHED";
    } catch (error) {
      _status.value = "FAILED";
      console.log("Something went wrong fetching logbook/crag data.", error);
    }
  }

  async function create(crag: CragRequest) {
    try {
      const response = await logbookService.crag.create(crag);
      crags.value[response.id] = response;
      return Promise.resolve(response);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  return {
    // state
    _status,
    crags,

    // getters
    multiselect,
    status,

    // actions
    create,
    fetch,
  };
});
