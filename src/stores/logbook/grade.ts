import keyBy from "lodash-es/keyBy";
import { defineStore } from "pinia";
import { ref } from "vue";

import { useStoreStatus } from "@/composables/storeStatus";
import { logbookService } from "@/services";
import type { Grade } from "@/types/logbook";

export const useLogbookGradeStore = defineStore("logbook/grade", () => {
  const { _status, status } = useStoreStatus();

  const grades = ref<{ [key: number]: Grade }>({});

  async function fetch() {
    try {
      grades.value = keyBy(await logbookService.grade.fetch(), "id");
      _status.value = "FETCHED";
    } catch (error) {
      _status.value = "FAILED";
      console.log("Something went wrong fetching logbook/grade data.", error);
    }
  }

  return {
    // state
    _status,
    grades,

    // getters
    status,

    // actions
    fetch,
  };
});
