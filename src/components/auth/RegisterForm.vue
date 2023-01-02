<script setup lang="ts">
import { ref } from "vue";

import { useUserStore } from "@/stores";

const userStore = useUserStore();

const username = ref("");
const email = ref("");
const password = ref("");
const password2 = ref("");
</script>

<template>
  <section>
    <h1>Register</h1>
    <label for="username">Username</label>
    <form @submit.prevent>
      <input
        id="username"
        v-model="username"
        autocomplete="username"
        type="text"
        autocorrect="off"
        spellcheck="false"
        required
      />
      <label for="email">E-Mail</label>
      <input
        id="email"
        v-model="email"
        autocomplete="email"
        spellcheck="false"
        type="email"
        autocorrect="off"
        required
      />
      <label for="password">Password</label>
      <input
        id="password"
        v-model="password"
        autocomplete="new-password"
        spellcheck="false"
        autocorrect="off"
        type="password"
        required
      />
      <label for="password2">Confirm Password</label>
      <input
        id="password2"
        v-model="password2"
        autocomplete="new-password"
        spellcheck="false"
        type="password"
        autocorrect="off"
        required
      />
      <button @click="userStore.register({ username, email, password })">
        Create account
      </button>
    </form>

    <RouterLink :to="{ name: 'login' }">Login instead</RouterLink>
  </section>
</template>
