<script setup lang="ts">
import AscentItem from "@/components/logbook/ascent/AscentItem.vue";
import AscentSectorGroupHeader from "@/components/logbook/ascent/AscentSectorGroupHeader.vue";
import type { AscentTree } from "@/types/logbook/ascent";

const props = defineProps<{ ascents: AscentTree[] }>();
</script>

<template>
  <div class="ascent-sector-group">
    <AscentSectorGroupHeader :sector="props.ascents[0].route.sector" />
    <div class="ascent-sector-group-items">
      <AscentItem
        v-for="ascent in props.ascents"
        :key="ascent.id"
        :ascent="ascent"
      />
    </div>
  </div>
</template>

<style scoped>
.ascent-sector-group-items {
  padding-left: 1rem;
}

.ascdent-sector-group + .ascdent-sector-group {
  margin-top: 0.5rem;
}
</style>
