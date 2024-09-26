<script setup lang="ts">
import { groupBy } from "lodash-es";

import AscentDateHeader from "@/components/logbook/ascent/AscentDateHeader.vue";
import AscentSectorGroup from "@/components/logbook/ascent/AscentSectorGroup.vue";
import type { AscentTree } from "@/types/logbook/ascent";

const props = defineProps<{ ascents: AscentTree[] }>();

const grouped_by_sector = groupBy(
  props.ascents,
  (ascent) => ascent.route.sector.id,
);
</script>

<template>
  <div class="ascent-date-group">
    <AscentDateHeader :date="props.ascents[0].date" />
    <div class="ascent-date-group-items">
      <AscentSectorGroup
        v-for="group in grouped_by_sector"
        :key="group[0].route.sector.id"
        :ascents="group"
      />
    </div>
  </div>
</template>

<style scoped>
.ascent-date-group + .ascent-date-group {
  margin-top: 0.5rem;
}

.ascent-date-group-items {
  padding-left: 1rem;
}
</style>
