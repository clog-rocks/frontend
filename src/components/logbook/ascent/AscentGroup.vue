<script setup lang="ts">
import AscentHeader from "@/components/logbook/ascent/AscentHeader.vue";
import AscentItem from "@/components/logbook/ascent/AscentItem.vue";
import type { AscentTree } from "@/types/logbook/ascent";

const props = defineProps<{ ascents: AscentTree[] }>();
</script>

<template>
  <div class="ascent-group">
    <AscentHeader :date="props.ascents[0].date" />
    <AscentItem
      v-for="ascent in props.ascents"
      :key="ascent.id"
      :ascent="ascent"
    />
  </div>
</template>

<style scoped>
.ascent-group + .ascent-group {
  margin-top: 1rem;
}
</style>
