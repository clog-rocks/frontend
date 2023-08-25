<script setup lang="ts">
import { useUserStore } from "@/stores";

const userStore = useUserStore();
</script>

<template>
  <section>
    <h2>Hello, {{ userStore.user?.username }}</h2>
    <pre>{{ userStore.user }}</pre>
  </section>
</template>
