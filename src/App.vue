<script setup lang="ts">
import NProgress from "nprogress";
import { computed, watch } from "vue";

import {
  useLogbookAscentStore,
  useLogbookCragStore,
  useLogbookGradeStore,
  useLogbookRouteStore,
  useLogbookSectorStore,
  useLogbookStyleStore,
  useTrainingGymStore,
  useTrainingSessionStore,
  useTrainingTagStore,
  useUserStore,
} from "@/stores";

import { useCoreCityStore } from "./stores/core/city";
import { useCoreCountryStore } from "./stores/core/country";

const cityStore = useCoreCityStore();
const countryStore = useCoreCountryStore();
const logbookAscentStore = useLogbookAscentStore();
const logbookCragStore = useLogbookCragStore();
const logbookGradeStore = useLogbookGradeStore();
const logbookRouteStore = useLogbookRouteStore();
const logbookSectorStore = useLogbookSectorStore();
const logbookStyleStore = useLogbookStyleStore();
const trainingGymStore = useTrainingGymStore();
const trainingSessionStore = useTrainingSessionStore();
const trainingTagStore = useTrainingTagStore();
const userStore = useUserStore();

const isLoading = computed(
  () =>
    cityStore.status.fetching ||
    countryStore.status.fetching ||
    logbookAscentStore.status.fetching ||
    logbookCragStore.status.fetching ||
    logbookGradeStore.status.fetching ||
    logbookRouteStore.status.fetching ||
    logbookSectorStore.status.fetching ||
    logbookStyleStore.status.fetching ||
    trainingGymStore.status.fetching ||
    trainingSessionStore.status.fetching ||
    trainingTagStore.status.fetching ||
    userStore.status.fetching,
);

watch(isLoading, (newStatus) => {
  if (newStatus) {
    NProgress.start();
  } else {
    NProgress.done();
  }
});
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition
      appear
      mode="out-in"
      name="component-fade"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>
