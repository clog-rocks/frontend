<script setup lang="ts">
import CounterItem from "@/components/layout/CounterItem.vue";
import { useTrainingStore } from "@/stores";

const trainingStore = useTrainingStore();
</script>

<template>
  <section class="counters training-stats">
    <CounterItem
      class="training-stats__item"
      legend="sessions"
      :value="trainingStore.session_count"
    />
    <CounterItem
      class="training-stats__item"
      legend="gyms"
      :value="trainingStore.gym_count"
    />
    <CounterItem
      class="training-stats__item"
      legend="cities"
      :value="trainingStore.city_count"
    />
    <CounterItem
      class="training-stats__item"
      legend="countries"
      :value="trainingStore.country_count"
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
