<script setup lang="ts">
import CounterItem from "@/components/layout/CounterItem.vue";
import { useTrainingSessionStore } from "@/stores";

const sessionStore = useTrainingSessionStore();
</script>

<template>
  <section class="counters">
    <div class="items">
      <CounterItem
        :legend="sessionStore.session_count == 1 ? 'session' : 'sessions'"
        :value="sessionStore.session_count"
      />
      <CounterItem
        :legend="sessionStore.uniq_gyms_count == 1 ? 'gym' : 'gyms'"
        :value="sessionStore.uniq_gyms_count"
      />
      <CounterItem
        :legend="sessionStore.uniq_cities_count == 1 ? 'city' : 'cities'"
        :value="sessionStore.uniq_cities_count"
      />
      <CounterItem
        :legend="
          sessionStore.uniq_countries_count == 1 ? 'country' : 'countries'
        "
        :value="sessionStore.uniq_countries_count"
      />
    </div>
  </section>
</template>
