<template>
  <v-container>
    <span class="headline font-weight-thin">Login</span>
    <v-alert
      outlined
      dismissible
      :value="nonFieldError ? true : false"
      color="error"
      border="left"
      icon="mdi-alert-circle-outline"
      >{{ nonFieldError }}</v-alert
    >
    <v-form @submit.prevent="submit" ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="username"
        label="Username"
        autocomplete="username"
        :rules="[(v) => !!v || 'Username is required.']"
        prepend-icon="mdi-account"
        required
      />
      <v-text-field
        v-model="password"
        autocomplete="current-password"
        :type="showPassword ? 'text' : 'password'"
        :rules="[(v) => !!v || 'Password is required.']"
        label="Password"
        prepend-icon="mdi-lock"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        required
      />
      <v-row class="pt-5">
        <v-btn text @click="SHOW_COMPONENT('Register')">Register</v-btn>
        <v-spacer></v-spacer>
        <v-btn :loading="loading" type="submit">Login</v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",

  data: () => ({
    loading: false,
    showPassword: false,
    valid: true,

    // Form fields.
    username: null,
    password: null,

    // Errors (will be populated by API).
    nonFieldError: null,
  }),

  methods: {
    ...mapActions("auth", ["LOGIN", "SHOW_COMPONENT"]),

    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;

        // Call login Vuex action.
        const { username, password } = this;
        this.LOGIN({ username, password })
          .then(() => {
            this.$router.push("/logbook");
          })
          .catch((error) => {
            this.loading = false;
            if (error.response.data.non_field_errors) {
              this.nonFieldError = error.response.data.non_field_errors[0];
            }
          });
      }
    },
  },
};
</script>

<style scoped>
.logo {
  font-size: 8rem;
}
</style>
