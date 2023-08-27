<script lang="ts">
import LogbookAscents from "@/components/logbook/LogbookAscents.vue";
import LogbookCounters from "@/components/logbook/LogbookCounters.vue";
import { useLogbookAscentStore } from "@/stores";
import { useCoreCountryStore } from "@/stores/core/country";

const stores = {
  country: useCoreCountryStore(),
  ascent: useLogbookAscentStore(),
};
</script>

<script setup lang="ts">
defineOptions({
  beforeRouteEnter: async () => {
    if (stores.country.status.pending) await stores.country.fetch();
    if (stores.ascent.status.pending) await stores.ascent.fetch();
  },
});
</script>

<template>
  <div v-if="stores.ascent.status.fetched && stores.ascent.hasAscents">
    <LogbookCounters />
    <section>
      <router-view v-slot="{ Component }">
        <transition
          name="fast-fade"
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
</template>
