<script lang="ts">
import TrainingCounters from "@/components/training/TrainingCounters.vue";
import TrainingSessions from "@/components/training/TrainingSessions.vue";
import { useTrainingSessionStore } from "@/stores";
import { useCoreCityStore } from "@/stores/core/city";

const stores = {
  session: useTrainingSessionStore(),
  city: useCoreCityStore(),
};
</script>

<script setup lang="ts">
defineOptions({
  beforeRouteEnter: async () => {
    if (stores.city.status.pending) await stores.city.fetch();
    if (stores.session.status.pending) await stores.session.fetch();
  },
});
</script>

<template>
  <div v-if="stores.session.status.fetched && stores.session.hasSessions">
    <TrainingCounters />
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
    <TrainingSessions />
    <h1>Top gyms</h1>
    <!-- <TopGymsTable /> -->
  </div>
  <RouterLink
    v-else-if="stores.session.status.fetched && !stores.session.hasSessions"
    :to="{ name: 'training-session-new' }"
  >
    <router-view></router-view>
  </RouterLink>
</template>
