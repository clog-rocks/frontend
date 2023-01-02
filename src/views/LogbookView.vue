<script setup lang="ts">
import { onMounted } from "vue";

import LogbookAscents from "@/components/logbook/LogbookAscents.vue";
import LogbookCounters from "@/components/logbook/LogbookCounters.vue";
import { useLogbookStore } from "@/stores";

const logbookStore = useLogbookStore();

onMounted(async () => {
  if (logbookStore.status.pending) {
    await logbookStore.fetch();
  }
});
</script>

<template>
  <section>
    <transition
      name="fade"
      mode="out-in"
    >
      <p v-if="logbookStore.status.fetching">
        Fetching your logbook, please wait…
      </p>
      <p v-else-if="logbookStore.hasAscents">
        <LogbookCounters />
        <button @click="logbookStore.addAscentDummy">add ascent</button>
        <LogbookAscents />
      </p>
      <h3 v-else-if="logbookStore.status.fetched && !logbookStore.hasAscents">
        No Ascents
        <button @click="logbookStore.addAscentDummy">add ascent</button>
      </h3>
    </transition>
  </section>
</template>
