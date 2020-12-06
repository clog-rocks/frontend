<template>
  <v-form
    ref="form"
    lazy-validation
    @submit.prevent="submit"
  >
    <v-autocomplete
      v-model="gym"
      autofocus
      cache-items
      hide-no-data
      hide-selected
      item-text="name"
      item-value="id"
      :items="gyms"
      label="Climbing Gym"
      :loading="gymIsLoading"
      placeholder="Start typing to Search"
      required
      return-object
      :search-input.sync="searchGym"
    />
    <v-menu
      v-model="dateMenu"
      :close-on-content-click="false"
      min-width="290px"
      :nudge-right="40"
      offset-y
      transition="scale-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          v-bind="attrs"
          label="Date"
          readonly
          v-on="on"
        />
      </template>
      <v-date-picker
        v-model="date"
        @input="dateMenu = false"
      />
    </v-menu>
    <v-textarea
      v-model="comment"
      auto-grow
      label="Comment"
      rows="1"
    />

    <v-btn
      color="warning"
      :loading="formSubmitting"
      @click="submitSession"
    >
      Add session
    </v-btn>
  </v-form>
</template>

<script>
import _ from "lodash";

export default {
  name: "TrainingSessionForm",

  data: () => {
    return {
      // Form values.
      gym: null,
      date: null,
      tags: {},
      comment: null,

      // Form helpers.
      gyms: [],
      searchGym: null,
      gymIsLoading: false,
      formSubmitting: false,
      dateMenu: false,

    };
  },

  computed: {
    dateToday: () => new Date()
      .toISOString()
      .substr(0, 10),
  },

  watch: {
    searchGym: _.debounce(function(newVal) {
      // Items have already been loaded
      if (this.gyms.length > 0) return;

      // What's that for?
      // If (!newVal) return;

      // Items have already been requested
      if (this.gymIsLoading) return;

      this.APIQueryGym(newVal);
    }, 1000),
  },

  methods: {
    async APIQueryGym(val) {
      console.log(val);
      this.gymIsLoading = true;

      const retrievedGyms = await this.$http.get(`api/training/gym?name=${val}`);

      console.log(retrievedGyms.data);
      this.gyms = retrievedGyms.data;

      this.gymIsLoading = false;
    },

    submitSession: function() {
      if (this.$refs.form.validate()) {
        this.formSubmitting = true;

        // Call login Vuex action.
        const { gym, date, comment } = this;

        console.log({ gym: gym.id, date, comment });
      }
    },
  },
};
</script>
