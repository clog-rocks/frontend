<script setup lang="ts">
import { orderBy } from "lodash-es";
import { computed } from "vue";

import { useTrainingSessionStore } from "@/stores";

import TrainingSessionItem from "./session/TrainingSessionItem.vue";

const sessionStore = useTrainingSessionStore();

const sorted = computed(() =>
  orderBy(sessionStore.tree, ["date", "date_added"], ["desc", "desc"]).slice(
    0,
    5,
  ),
);
</script>

<template>
  <section>
    <h1>Latest</h1>
    <transition-group name="list">
      <TrainingSessionItem
        v-for="session in sorted"
        :key="session.id"
        :session="session"
      />
    </transition-group>
  </section>
</template>
