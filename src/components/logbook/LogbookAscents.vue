<script setup lang="ts">
import { groupBy, orderBy } from "lodash-es";
import { computed } from "vue";

import AscentDateGroup from "@/components/logbook/ascent/AscentDateGroup.vue";
import { useLogbookAscentStore } from "@/stores";

const ascentStore = useLogbookAscentStore();

const sorted = computed(() =>
  groupBy(
    orderBy(ascentStore.tree, ["date", "date_added"], ["desc", "desc"]).slice(
      0,
      5,
    ),
    "date",
  ),
);
</script>

<template>
  <section>
    <h1>Latest ascents</h1>
    <AscentDateGroup
      v-for="ascents in sorted"
      :key="ascents[0].date"
      :ascents="ascents"
    />
    <a
      class="link"
      href="#all"
    >
      show all ascents
    </a>
  </section>
</template>

<style scoped>
section {
  container: ascents / inline-size;
}

.link {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}
</style>
