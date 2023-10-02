<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { email, helpers, required, sameAs } from "@vuelidate/validators";
import { reactive, unref } from "vue";

import FormInput from "@/components/layout/FormInput.vue";
import { useUserStore } from "@/stores";

const userStore = useUserStore();

const state = reactive({
  username: "",
  email: "",
  password: {
    password: "",
    confirm: "",
  },
});

const rules = {
  username: { required: helpers.withMessage("Username is required", required) },
  email: {
    required: helpers.withMessage("E-mail is required", required),
    email,
  },
  password: {
    password: {
      required: helpers.withMessage("Password is required", required),
    },
    confirm: {
      required: helpers.withMessage("Confirm your password", required),
      sameAs: helpers.withMessage(
        "Passwords must match",
        sameAs(state.password.password),
      ),
    },
  },
};

const v$ = useVuelidate(rules, state);

async function submit() {
  const formValid = await unref(v$).$validate();
  if (formValid)
    await userStore.register({
      username: state.username,
      email: state.email,
      password: state.password.password,
    });
}
</script>

<template>
  <form
    class="auth-form"
    @submit.prevent
  >
    <h1>Register</h1>
    <FormInput
      v-model="state.username"
      autocomplete="username"
      label="Username"
      :validator="v$.username"
    />
    <FormInput
      v-model="state.email"
      autocomplete="email"
      label="E-Mail"
      type="email"
      :validator="v$.email"
    />
    <FormInput
      v-model="state.password.password"
      autocomplete="new-password"
      type="password"
      label="Password"
      :validator="v$.password.password"
    />
    <FormInput
      v-model="state.password.confirm"
      autocomplete="new-password"
      type="password"
      label="Confirm password"
      :validator="v$.password.confirm"
    />
    <div class="button-link-group">
      <button @click="submit()">Create account</button>
      <RouterLink :to="{ name: 'login' }">or login instead</RouterLink>
    </div>
  </form>
</template>
