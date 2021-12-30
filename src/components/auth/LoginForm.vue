<template>
  <v-card flat>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="submit"
    >
      <h2 class="font-weight-thin text-center">
        Login
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
          label="Username"
          required
          :rules="[(v) => !!v || 'Username is required.']"
        />
        <v-text-field
          v-model="password"
          autocomplete="current-password"
          label="Password"
          required
          :rules="[(v) => !!v || 'Password is required.']"
          type="password"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          @click="SHOW_COMPONENT('RegisterForm')"
        >
          Register
        </v-btn>
        <v-spacer />
        <v-btn
          :loading="loading"
          type="submit"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginForm",

  data: () => {
    return {
      loading: false,
      valid: true,

      // Form fields.
      username: null,
      password: null,

      // Errors (will be populated by API).
      nonFieldError: null,
    };
  },

  methods: {
    ...mapActions("auth", ["LOGIN", "SHOW_COMPONENT"]),

    submit: function() {
      if (this.$refs.form.validate()) {
        this.loading = true;

        // Call login Vuex action.
        const { username, password } = this;

        this.LOGIN({ username, password })
          .then(() => {
            this.$router.push({ name: "Logbook" });
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
