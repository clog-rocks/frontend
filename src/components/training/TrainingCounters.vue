<script setup lang="ts">
import CounterItem from "@/components/layout/CounterItem.vue";
import { useTrainingSessionStore } from "@/stores";

const sessionStore = useTrainingSessionStore();
</script>

<template>
  <section class="counters">
    <div class="items">
      <CounterItem
        legend="sessions"
        :value="sessionStore.session_count"
      />
      <CounterItem
        legend="gyms"
        :value="sessionStore.uniq_gyms_count"
      />
      <CounterItem
        legend="cities"
        :value="sessionStore.uniq_cities_count"
      />
      <CounterItem
        legend="countries"
        :value="sessionStore.uniq_countries_count"
      />
    </div>
  </section>
</template>
