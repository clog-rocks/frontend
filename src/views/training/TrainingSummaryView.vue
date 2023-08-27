<script setup lang="ts">
import { onMounted } from "vue";

import TrainingCounters from "@/components/training/TrainingCounters.vue";
import TrainingSessions from "@/components/training/TrainingSessions.vue";
import { useTrainingSessionStore } from "@/stores";
import { useCoreCityStore } from "@/stores/core/city";

const stores = {
  session: useTrainingSessionStore(),
  city: useCoreCityStore(),
};

onMounted(async () => {
  if (stores.city.status.pending) await stores.city.fetch();
  if (stores.session.status.pending) await stores.session.fetch();
});
</script>

<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <div
      v-if="stores.session.status.fetching"
      class="centered loading"
    >
      Fetching your training sessions, please wait…
    </div>
    <div
      v-else-if="stores.session.status.fetched && stores.session.hasSessions"
    >
      <TrainingCounters />
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
  </transition>
</template>
