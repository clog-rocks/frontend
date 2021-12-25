<template>
  <v-card flat>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="submit"
    >
      <h2 class="font-weight-thin text-center">
        Open new account
      </h2>
      <v-card-text>
        <v-alert
          class="px-5"
          dense
          elevation="3"
          outlined
          tile
          transition="fade"
          type="error"
          :value="nonFieldError"
        >
          {{ nonFieldError }}
        </v-alert>
        <v-text-field
          v-model="username"
          autocomplete="username"
          :error-messages="usernameError"
          label="Username"
          :loading="loadingUsername"
          required
          :rules="[(v) => !!v || 'Username is required.']"
        />
        <v-text-field
          v-model="email"
          label="E-mail"
          required
          :rules="emailRules"
        />
        <v-text-field
          v-model="password"
          autocomplete="new-password"
          :error-messages="passwordError"
          label="Password"
          required
          :rules="[
            (v) => !!v || 'Password is required.',
            (v) =>
              (v && v.length >= 8) ||
              'Password must be at least 8 characters long.',
          ]"
          type="password"
        />
        <v-text-field
          v-model="password2"
          autocomplete="new-password"
          label="Confirm password"
          required
          :rules="[
            (v) => !!v || 'Password must be confirmed',
            passwordMatchRule,
          ]"
          type="password"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          @click="SHOW_COMPONENT('Login')"
        >
          Login
        </v-btn>
        <v-spacer />
        <v-btn
          :loading="loading"
          type="submit"
        >
          Register
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import _ from "lodash";
import { authService } from "@/_services";
import { mapActions } from "vuex";

export default {
  name: "Register",

  data: () => {
    return {
      loading: false,
      loadingUsername: false,
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
    };
  },

  computed: {
    passwordMatchRule: (vm) => vm.password === vm.password2 || "Passwords must match.",
  },

  watch: {
    // Whenever username changes, this function will run.
    username: function() {
      this.debouncedCheckUsername();
    },
  },

  created: function() {
    this.debouncedCheckUsername = _.debounce(this.checkUsername, 500);
  },

  methods: {
    ...mapActions("auth", ["REGISTER", "SHOW_COMPONENT"]),

    submit: function() {
      if (
        this.$refs.form.validate() &&
        !this.usernameError &&
        !this.passwordError
      ) {
        this.loading = true;

        // Reset error fields.
        this.nonFieldError = null;
        this.usernameError = null;
        this.passwordError = null;

        // Call register Vuex action.
        const { username, email, password } = this;

        this.REGISTER({ username, email, password })
          .then(() => {
            this.$router.push({ name: "Logbook" });
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

    checkUsername: function() {
      if (this.username !== "") {
        this.loadingUsername = true;
        const vm = this;

        authService
          .userExists(this.username)
          .then((response) => {
            vm.usernameError = response.data.available ?
              null :
              ["A user with that username already exists."];

            vm.loadingUsername = false;
          })
          .catch(() => (vm.loadingUsername = false));
      }
    },
  },
};
</script>
