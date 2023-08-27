<script setup lang="ts">
import { onMounted } from "vue";

import LogbookAscents from "@/components/logbook/LogbookAscents.vue";
import LogbookCounters from "@/components/logbook/LogbookCounters.vue";
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
</script>

<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <div
      v-if="stores.ascent.status.fetching"
      class="centered loading"
    >
      Fetching your logbook, please wait…
    </div>
    <div v-else-if="stores.ascent.hasAscents">
      <LogbookCounters />
      <section>
        <router-view v-slot="{ Component }">
          <transition
            name="very-fast-fade"
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </section>
      <LogbookAscents />
    </div>
    <RouterLink
      v-else-if="stores.ascent.status.fetched && !stores.ascent.hasAscents"
      :to="{ name: 'logbook-ascent-new' }"
    >
      <button>Add your first ascent!</button>
    </RouterLink>
  </transition>
</template>
