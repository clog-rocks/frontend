<script setup lang="ts">
import { computed, onMounted } from "vue";

import LogbookAscents from "@/components/logbook/LogbookAscents.vue";
import { useLogbookAscentStore } from "@/stores";
import { useCoreCountryStore } from "@/stores/core/country";

const stores = {
  country: useCoreCountryStore(),
  ascent: useLogbookAscentStore(),
};

onMounted(async () => {
  if (stores.country.status.pending) await stores.country.fetch();
  if (stores.ascent.status.pending) await stores.ascent.fetch();
});

const fetching = computed(
  () => stores.country.status.fetching || stores.ascent.status.pending,
);
</script>

<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <div
      v-if="fetching"
      class="centered loading"
    >
      Fetching your logbook, please wait…
    </div>
    <div v-else>
      <LogbookAscents :recent="false" />
    </div>
  </transition>
</template>
