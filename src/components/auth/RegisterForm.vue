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
    <form @submit.prevent>
      <label
        >Username
        <input
          id="username"
          v-model="username"
          autocomplete="username"
          type="text"
          autocorrect="off"
          spellcheck="false"
          required
        />
      </label>
      <label
        >E-Mail
        <input
          id="email"
          v-model="email"
          autocomplete="email"
          spellcheck="false"
          type="email"
          autocorrect="off"
          required
        />
      </label>
      <label
        >Password
        <input
          id="password"
          v-model="password"
          autocomplete="new-password"
          spellcheck="false"
          autocorrect="off"
          type="password"
          required
        />
      </label>
      <label
        >Confirm Password
        <input
          id="password2"
          v-model="password2"
          autocomplete="new-password"
          spellcheck="false"
          type="password"
          autocorrect="off"
          required
        />
      </label>
      <button @click="userStore.register({ username, email, password })">
        Create account
      </button>
    </form>

    <RouterLink :to="{ name: 'login' }">Login instead</RouterLink>
  </section>
</template>
