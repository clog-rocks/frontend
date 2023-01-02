<script setup lang="ts">
import { map, orderBy } from "lodash";
import { computed, ref } from "vue";

import { useTrainingStore } from "@/stores";
import type { TrainingSession } from "@/types/training";

const trainingStore = useTrainingStore();

const show = ref(true);

const sorted = computed(() =>
  orderBy(
    map(trainingStore.sessions, (session: TrainingSession) => session),
    ["date", "date_added"],
    ["desc", "desc"]
  ).slice(0, 5)
);

const deleteSession = async (id: number) => {
  try {
    await trainingStore.deleteSession(id);
    return Promise.resolve();
  } catch (error) {
    console.log("somethoing went wrogn");
  }
};
</script>

<template>
  <div
    class="thin-header"
    @click="show = !show"
  >
    Training sessions
  </div>
  <transition name="fade">
    <div v-if="show">
      <transition-group
        tag="ul"
        name="list"
        appear
      >
        <li
          v-for="session in sorted"
          :key="session.id"
          @click="deleteSession(session.id)"
        >
          <p>{{ session }}</p>
        </li>
      </transition-group>
    </div>
  </transition>
</template>

<style scoped>
ul {
  position: relative;
  list-style-type: none;
}

li {
  display: flex;
  gap: 1em;
  max-width: 500px;
  padding: 0.5rem;
  margin: 15px auto;
  background-color: var(--color-background-mute);
  border-radius: 10px;
  box-shadow: 1px 3px 5px rgb(0 0 0 / 10%);
}

ul li:first-of-type {
  margin-top: 0;
}

ul li:last-of-type {
  margin-bottom: 0;
}
</style>
