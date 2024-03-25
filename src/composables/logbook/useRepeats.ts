import { orderBy } from "lodash-es";
import type { MaybeRefOrGetter, Ref } from "vue";
import { computed, readonly, ref, toValue, watchEffect } from "vue";

import { useLogbookAscentStore } from "@/stores";
import type { Ascent } from "@/types/logbook/ascent";

const repeats: Ref<Ascent[]> = ref([]);
const isRepeat = computed(() => repeats.value.length > 0);
const ascentStore = useLogbookAscentStore();
const getRepeats = (routeId: MaybeRefOrGetter, ascentId?: number) =>
  Object.values(ascentStore.ascents).filter(
    (ascent) => ascent.route == toValue(routeId) && ascent.id !== ascentId,
  );

export function useRepeats(routeId: MaybeRefOrGetter, ascentId?: number) {
  watchEffect(() => {
    if (!routeId) return;
    repeats.value = orderBy(getRepeats(routeId, ascentId), "date");
  });
  return { repeats: readonly(repeats), isRepeat: readonly(isRepeat) };
}
