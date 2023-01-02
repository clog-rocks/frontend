<script setup lang="ts">
import NProgress from "nprogress";
import { computed, watch } from "vue";
import { RouterView } from "vue-router";

import NavigationBar from "@/components/layout/NavigationBar.vue";
import {
  useCoreStore,
  useLogbookStore,
  useTrainingStore,
  useUserStore,
} from "@/stores";

const coreStore = useCoreStore();
const logbookStore = useLogbookStore();
const trainingStore = useTrainingStore();
const userStore = useUserStore();

const isLoading = computed(
  () =>
    coreStore.status.fetching ||
    logbookStore.status.fetching ||
    trainingStore.status.fetching ||
    userStore.status.fetching
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
  <main>
    <NavigationBar />
    <router-view v-slot="{ Component }">
      <transition
        appear
        mode="out-in"
        name="component-fade"
      >
        <keep-alive include="LoginForm,RegisterForm">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </main>
</template>
