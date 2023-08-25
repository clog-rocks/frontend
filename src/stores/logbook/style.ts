import keyBy from "lodash-es/keyBy";
import { defineStore } from "pinia";
import { ref } from "vue";

import { useStoreStatus } from "@/composables/storeStatus";
import { logbookService } from "@/services";
import type { Style } from "@/types/logbook";

export const useLogbookStyleStore = defineStore("logbook/style", () => {
  const { _status, status } = useStoreStatus();

  const styles = ref<{ [key: number]: Style }>({});

  async function fetch() {
    try {
      styles.value = keyBy(await logbookService.style.fetch(), "id");
      _status.value = "FETCHED";
    } catch (error) {
      _status.value = "FAILED";
      console.log("Something went wrong fetching logbook/style data.", error);
    }
  }

  return {
    // state
    _status,
    styles,

    // getters
    status,

    // actions
    fetch,
  };
});
