import keyBy from "lodash-es/keyBy";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { useStoreStatus } from "@/composables/storeStatus";
import { logbookService } from "@/services";
import type { Sector, SectorMultiselect, SectorRequest } from "@/types/logbook";

import { useCoreCountryStore } from "../core/country";
import { useLogbookCragStore } from "./crag";

export const useLogbookSectorStore = defineStore("logbook/sector", () => {
  const { _status, status } = useStoreStatus();
  const countryStore = useCoreCountryStore();
  const cragStore = useLogbookCragStore();

  const sectors = ref<{ [key: number]: Sector }>({});

  const multiselect = computed<SectorMultiselect[]>(() => {
    return Object.values(sectors.value).map((sector) => {
      const crag = cragStore.crags[sector.crag];
      return {
        id: sector.id,
        name: sector.name,
        sector: sector.name,
        crag: crag.name,
        country: countryStore.countries[crag.country].name,
      };
    });
  });

  async function create(sector: SectorRequest) {
    try {
      const response = await logbookService.sector.create(sector);

      sectors.value[response.id] = response;

      return Promise.resolve(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetch() {
    try {
      sectors.value = keyBy(await logbookService.sector.fetch(), "id");
      _status.value = "FETCHED";
    } catch (error) {
      _status.value = "FAILED";
      console.log("Something went wrong fetching logbook/sector data.", error);
    }
  }

  return {
    // state
    _status,
    sectors,

    // getters
    multiselect,
    status,

    // actions
    create,
    fetch,
  };
});
