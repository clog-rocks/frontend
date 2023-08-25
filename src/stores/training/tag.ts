import { defineStore } from "pinia";
import { ref } from "vue";

import { useStoreStatus } from "@/composables/storeStatus";
import { trainingService } from "@/services";
import { type Tag } from "@/types/generic";

export const useTrainingTagStore = defineStore("training/tag", () => {
  const { _status, status } = useStoreStatus();

  const tags = ref<Tag[]>([]);

  async function fetch() {
    try {
      tags.value = await trainingService.tag.fetch();
      _status.value = "FETCHED";
    } catch (error) {
      _status.value = "FAILED";
      console.log("Something went wrong fetching training/tag data.", error);
    }
  }

  return {
    // state
    _status,
    tags,

    // getters
    status,

    // actions
    fetch,
  };
});
