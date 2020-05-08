<template>
  <v-container>
    <span class="headline font-weight-thin">Register</span>
    <v-alert
      outlined
      dismissible
      :value="nonFieldError ? true : false"
      color="error"
      border="left"
      icon="mdi-alert-circle-outline"
      >{{ nonFieldError }}</v-alert
    >
    <v-form @submit="submit" ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="username"
        autocomplete="username"
        label="Username"
        :rules="[(v) => !!v || 'Username is required.']"
        :error-messages="usernameError"
        prepend-icon="mdi-account"
        required
      />
      <v-text-field
        v-model="email"
        label="E-mail"
        :rules="emailRules"
        prepend-icon="mdi-email-outline"
        required
      />
      <v-text-field
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        label="Password"
        autocomplete="new-password"
        :rules="[
          (v) => !!v || 'Password is required.',
          (v) =>
            (v && v.length >= 8) ||
            'Password must be at least 8 characters long.',
        ]"
        :error-messages="passwordError"
        prepend-icon="mdi-lock"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        required
      />
      <v-text-field
        v-model="password2"
        :type="showPassword ? 'text' : 'password'"
        label="Confirm password"
        autocomplete="new-password"
        :rules="[(v) => !!v || 'Password must be confirmed', passwordMatchRule]"
        prepend-icon="mdi-lock"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        required
      />
      <v-row class="pt-5">
        <v-btn text @click="activateComponent('Login')">Login</v-btn>
        <v-spacer></v-spacer>
        <v-btn :loading="loading ? true : false" type="submit">Register</v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import router from "../../router";

export default {
  name: "Register",

  data: () => ({
    loading: false,
    showPassword: false,
    valid: true,

    // Form fields.
    username: null,
    email: null,
    password: null,
    password2: null,

    // Validation rules.
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid.",
    ],

    // Errors (will be pupulated by API).
    nonFieldError: null,
    usernameError: null,
    passwordError: null,
  }),

  computed: {
    passwordMatchRule() {
      return () => this.password === this.password2 || "Passwords must match.";
    },
  },

  methods: {
    ...mapActions(["register"]),
    ...mapMutations(["activateComponent"]),

    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;

        // Reset error fields.
        this.nonFieldError = null;
        this.usernameError = null;
        this.passwordError = null;

        // Call register Vuex action.
        const { username, email, password } = this;
        this.register({ username, email, password })
          .then(() => {
            router.push("/");
          })
          .catch((error) => {
            this.loading = false;

            // Set field errors if returned from server.
            const data = error.response.data;

            if (data.non_field_errors) {
              this.nonFieldError = data.non_field_errors;
            }
            if (data.username) {
              this.usernameError = data.username;
            }
            if (data.password) {
              this.passwordError = data.password.password;
            }
          });
      }
    },
  },
};
</script>
