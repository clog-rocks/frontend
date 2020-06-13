<template>
  <v-card flat>
    <v-form @submit.prevent="submit" ref="form" v-model="valid" lazy-validation>
      <h5 class="headline text-center font-weight-thin">
        Register
      </h5>
      <v-card-text>
        <v-alert
          outlined
          dismissible
          :value="nonFieldError ? true : false"
          color="error"
          border="left"
          icon="mdi-alert-circle-outline"
          >{{ nonFieldError }}</v-alert
        >
        <v-text-field
          v-model="username"
          autocomplete="username"
          label="Username"
          :rules="[(v) => !!v || 'Username is required.']"
          :error-messages="usernameError"
          :loading="loadingUsername"
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
          :rules="[
            (v) => !!v || 'Password must be confirmed',
            passwordMatchRule,
          ]"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          required
        />
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="SHOW_COMPONENT('Login')">Login</v-btn>
        <v-spacer></v-spacer>
        <v-btn :loading="loading" type="submit">Register</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import _ from "lodash";
import { authService } from "@/_services";

export default {
  name: "Register",

  data: () => ({
    loading: false,
    loadingUsername: false,
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

  watch: {
    // Whenever username changes, this function will run.
    username: function () {
      this.debouncedCheckUsername();
    },
  },

  created: function () {
    // _.debounce is a function provided by lodash to limit how
    // often a particularly expensive operation can be run.
    // In this case, we want to limit how often we access
    // yesno.wtf/api, waiting until the user has completely
    // finished typing before making the ajax request. To learn
    // more about the _.debounce function (and its cousin
    // _.throttle), visit: https://lodash.com/docs#debounce
    this.debouncedCheckUsername = _.debounce(this.checkUsername, 500);
  },

  methods: {
    ...mapActions("auth", ["REGISTER", "SHOW_COMPONENT"]),

    submit() {
      console.log(this.$refs.form.validate());
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
        this.register({ username, email, password })
          .then(() => {
            this.$router.push("/");
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

    checkUsername: function () {
      console.log("in checkUsername()");

      if (this.username !== "") {
        this.loadingUsername = true;
        const vm = this;
        authService
          .userExists(this.username)
          .then(function (response) {
            vm.usernameError = response.data.available
              ? null
              : ["A user with that username already exists."];
            vm.loadingUsername = false;
          })
          .catch(function (error) {
            console.log("Error! Could not reach the API. " + error);
            vm.loadingUsername = false;
          });
      }
    },
  },
};
</script>
