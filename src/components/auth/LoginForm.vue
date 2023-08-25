<script setup lang="ts">
import { ref } from "vue";

import { useUserStore } from "@/stores";

const userStore = useUserStore();
const username = ref("");
const password = ref("");
</script>

<template>
  <form @submit.prevent>
    <h1>Login</h1>
    <label>
      Username
      <input
        v-model="username"
        autocomplete="username"
        type="text"
        autocorrect="off"
        spellcheck="false"
        required
      />
    </label>
    <label>
      Password
      <input
        v-model="password"
        autocomplete="current-password"
        spellcheck="false"
        autocorrect="off"
        type="password"
        required
      />
    </label>
    <button @click="userStore.login(username, password)">Login</button>
    <RouterLink :to="{ name: 'register' }">Register instead</RouterLink>
  </form>
</template>
