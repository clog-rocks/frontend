<script setup lang="ts">
import CounterItem from "@/components/layout/CounterItem.vue";
import { useTrainingSessionStore } from "@/stores";

const sessionStore = useTrainingSessionStore();
</script>

<template>
  <section class="counters training-stats">
    <CounterItem
      class="training-stats__item"
      legend="sessions"
      :value="sessionStore.session_count"
    />
    <CounterItem
      class="training-stats__item"
      legend="gyms"
      :value="sessionStore.uniq_gyms_count"
    />
    <CounterItem
      class="training-stats__item"
      legend="cities"
      :value="sessionStore.uniq_cities_count"
    />
    <CounterItem
      class="training-stats__item"
      legend="countries"
      :value="sessionStore.uniq_countries_count"
    />
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/counters.module";

.counters {
  display: flex;
  align-items: center;
}
</style>
