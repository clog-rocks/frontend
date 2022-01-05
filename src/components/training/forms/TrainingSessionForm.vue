<template>
  <v-form
    ref="form"
    v-model="valid"
    class="py-4"
    lazy-validation
    @submit.prevent="submit"
  >
    <v-container>
      <v-row>
        <!-- TODO: Create component for those errors. -->
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
        </v-card-text>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="4"
        >
          <v-autocomplete
            v-model="gym"
            autofocus
            hide-no-data
            hide-selected
            item-text="name"
            item-value="id"
            :items="gyms"
            label="Gym"
            :loading="gymIsLoading"
            required
            return-object
            :rules="[(v) => !!v || 'Gym is required.']"
            :search-input.sync="searchGym"
          />
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <v-menu
            v-model="dateMenu"
            :close-on-content-click="false"
            min-width="290px"
            :nudge-right="40"
            offset-y
            transition="scale-transition"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                v-bind="attrs"
                label="Date"
                readonly
                required
                :rules="[(v) => !!v || 'Date is required.']"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="date"
              @input="dateMenu = false"
            />
          </v-menu>
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <v-textarea
            v-model="comment"
            auto-grow
            label="Comment"
            rows="1"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-spacer class="d-none d-sm-block" />
        <v-col
          cols="12"
          sm="4"
        >
          <v-btn
            block
            :loading="formSubmitting"
            @click="submitSession"
          >
            Add new session
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import _ from "lodash";
import { mapActions } from "vuex";
import { trainingService } from "@/_services";

export default {
  name: "TrainingSessionForm",

  data: () => {
    return {
      // Form values.
      gym: null,
      date: new Date()
        .toISOString()
        .slice(0, 10),
      tags: [],
      comment: null,

      // Form helpers.
      gyms: [],
      searchGym: null,
      gymIsLoading: false,
      formSubmitting: false,
      dateMenu: false,
      valid: null,
      submitted: false,

      // Errors (will be populated by API).
      nonFieldError: null,
    };
  },

  watch: {
    searchGym: _.debounce(function(newVal) {
      // TODO: What's that for?
      if (!newVal) {
        return;
      }

      // Items have already been requested
      if (this.gymIsLoading) {
        return;
      }

      this.APIQueryGym(newVal);
    }, 500),
  },

  methods: {
    ...mapActions("training", ["_addSession"]),

    async APIQueryGym(val) {
      this.gymIsLoading = true;
      const retrievedGyms = await trainingService.getGyms(val);

      this.gyms = this.gyms.concat(retrievedGyms.data);
      this.gymIsLoading = false;
    },

    submitSession: function() {
      if (this.$refs.form.validate()) {
        this.formSubmitting = true;

        const { gym, date, comment, tags } = this;
        const payload = {
          // TODO: add tags to form
          // TODO: evaluate is user needs/should be passed with payload
          // User: this.$store.state.auth.user.id,
          gym: gym,
          date,
          comment,
          tags,
        };

        this._addSession(payload)
          .then(() => {
            this.$refs.form.reset();
            this.$refs.form.resetValidation();
          })
          .catch((error) => {
            this.loading = false;
            if (error.response.data.non_field_errors) {
              console.log(error.response);
              this.nonFieldError = error.response.data.non_field_errors[0];
            }
          });

        this.formSubmitting = false;
      }
    },
  },
};
</script>
