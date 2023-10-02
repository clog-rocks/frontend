<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { reactive, unref } from "vue";

import FormInput from "@/components/layout/FormInput.vue";
import { useUserStore } from "@/stores";

const userStore = useUserStore();

const state = reactive({
  username: "",
  password: "",
});

const rules = {
  username: { required: helpers.withMessage("Username is required", required) },
  password: {
    required: helpers.withMessage("Password is required", required),
  },
};

const v$ = useVuelidate(rules, state);

async function submit() {
  const formValid = await unref(v$).$validate();
  if (formValid) userStore.login(state.username, state.password);
}
</script>

<template>
  <form
    class="auth-form"
    @submit.prevent
  >
    <h1>Login</h1>
    <FormInput
      v-model="state.username"
      autocomplete="username"
      label="Username"
      :validator="v$.username"
    />
    <FormInput
      v-model="state.password"
      autocomplete="password"
      label="Password"
      type="password"
      :validator="v$.password"
    />
    <div class="button-link-group">
      <button @click="submit()">Login</button>
      <RouterLink :to="{ name: 'register' }">or register instead</RouterLink>
    </div>
  </form>
</template>
