import type { Ref } from "vue";
import { computed, ref } from "vue";

import type { StoreStatus } from "@/types/generic";

export function useStoreStatus() {
  const _status: Ref<StoreStatus> = ref("PENDING");
  const status = computed(() => {
    return {
      pending: _status.value === "PENDING",
      fetching: _status.value === "FETCHING",
      fetched: _status.value === "FETCHED",
      failed: _status.value === "FAILED",
    };
  });

  return { _status, status };
}
