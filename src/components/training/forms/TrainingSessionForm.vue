<template>
  <v-form
    ref="form"
    v-model="valid"
    class="py-4"
    lazy-validation
    @submit.prevent="submit"
  >
    <v-container>
      <!-- TODO: Create component for those errors. -->
      <v-row v-if="nonFieldError">
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
          sm="3"
        >
          <!-- TODO: are item-text and item-id needed? -->
          <v-autocomplete
            v-model="gym"
            autofocus
            hide-no-data
            hide-selected
            item-text="name"
            item-value="id"
            :items="gymsRetrieved"
            label="Gym"
            :loading="gymLoading"
            required
            return-object
            :rules="[(v) => !!v || 'Gym is required.']"
            :search-input.sync="gymInput"
          />
        </v-col>
        <v-col
          cols="12"
          sm="2"
        >
          <v-menu
            v-model="dateMenu"
            :close-on-content-click="false"
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
          sm="3"
        >
          <v-textarea
            v-model="comment"
            auto-grow
            label="Comment"
            rows="1"
          />
        </v-col>
        <v-col
          cols="12"
          sm="3"
        >
          <v-combobox
            v-model="tags"
            deletable-chips
            hide-selected
            :items="tagsRetrieved"
            label="Tags"
            :loading="tagLoading"
            multiple
            :search-input.sync="tagInput"
            @input="tagInput = null"
          >
            <template #selection="{ attrs, item, parent, selected }">
              <v-chip
                v-bind="attrs"
                :color="`blue lighten-3`"
                :input-value="selected"
                label
                small
              >
                <span class="pr-2">{{ item }}</span>
                <v-icon
                  small
                  @click="parent.selectItem(item)"
                >
                  $delete
                </v-icon>
              </v-chip>
            </template>
            <template #no-data>
              <v-list-item v-if="tagInput !== null">
                <span class="subheading">Create&nbsp;</span>
                <v-chip
                  :color="`blue lighten-3`"
                  label
                  small
                >
                  {{ tagInput }}
                </v-chip>
                <v-spacer />
                <kbd>enter</kbd>
              </v-list-item>
              <v-list-item
                v-else
                class="subheading"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    Type to search or press <kbd>enter</kbd> to create a new one
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template #item="{ item }">
              <v-chip
                :color="`blue lighten-3`"
                label
                small
              >
                {{ item }}
              </v-chip>
            </template>
          </v-combobox>
        </v-col>
        <v-col
          align-self="center"
          cols="12"
          sm="1"
        >
          <v-btn
            :block="$vuetify.breakpoint.mobile"
            color="primary"
            :disabled="formSubmitting"
            :loading="formSubmitting"
            @click="submitSession"
          >
            <span v-if="$vuetify.breakpoint.xsOnly">
              add new session
            </span>
            <v-icon
              v-else
              dark
            >
              mdi-plus-circle
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { coreService, trainingService } from "@/_services";
import _ from "lodash";
import { mapActions } from "vuex";

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
      formSubmitting: false,
      dateMenu: false,
      valid: null,

      // gym widget
      gymInput: null,
      gymsRetrieved: [],
      gymLoading: false,

      // tags widget
      tagInput: null,
      tagsRetrieved: [],
      tagLoading: false,

      // Errors (will be populated by API).
      nonFieldError: null,
    };
  },

  watch: {
    gymInput: _.debounce(function(newVal) {
      // TODO: What's that for?
      if (!newVal) {
        return;
      }

      // Items have already been requested
      if (this.gymLoading) {
        return;
      }

      this.fetchGyms(newVal);
    }, 500),

    tagInput: _.debounce(function(newVal) {
      // TODO: What's that for?
      if (!newVal) {
        return;
      }

      // Items have already been requested
      if (this.tagLoading) {
        return;
      }

      this.fetchTags(newVal);
    }, 500),
  },

  methods: {
    ...mapActions("training", ["_addSession"]),

    async fetchGyms(val) {
      this.gymLoading = true;
      const result = await trainingService.getGyms(val);

      this.gymsRetrieved = this.gymsRetrieved.concat(result.data);
      this.gymLoading = false;
    },

    async fetchTags(val) {
      this.tagLoading = true;
      const result = await coreService.getTags(val);

      this.tagsRetrieved = this.tagsRetrieved.concat(
        result.data.map((item) => item.name),
      );

      this.tagLoading = false;
    },

    submitSession: function() {
      if (this.$refs.form.validate()) {
        this.formSubmitting = true;

        const { gym, date, comment, tags } = this;
        const payload = {
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
