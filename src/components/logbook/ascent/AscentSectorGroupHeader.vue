<script setup lang="ts">
import type { SectorTree } from "@/types/logbook";

const props = defineProps<{ sector: SectorTree }>();
</script>

<template>
  <div class="ascent-sector-group-header">
    {{ props.sector.crag.country.name }} / {{ props.sector.crag.name }} /
    {{ props.sector.name }}
  </div>
</template>

<style scoped>
.ascent-sector-group-header {
  letter-spacing: 1px;
}
</style>
