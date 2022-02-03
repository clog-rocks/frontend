<template>
  <div>
    <div class="d-flex flex-row-reverse">
      <v-btn
        class="align-self-center"
        color="primary"
        dark
        fab
        outlined
        x-small
        @click="toggleSearch"
      >
        <v-icon dark>
          mdi-magnify
        </v-icon>
      </v-btn>
      <transition name="fade">
        <v-text-field
          v-show="showSearch"
          v-model="search"
          autofocus
          class="align-self-center mt-0 pr-2 pt-0"
          hide-details
          label="Search"
          style="max-width: 300px;"
        />
      </transition>
    </div>
    <v-data-table
      calculate-widths
      :headers="headers"
      :items="sessions"
      :items-per-page="5"
      :search="search"
      sort-by="date"
      sort-desc
    >
      <template #item.tags="{ item }">
        <v-chip
          v-for="(tag, id) in item.tags"
          :key="id"
          color="primary"
          outlined
          :search="search"
          small
        >
          {{ tag }}
        </v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useTrainingStore } from "@/stores/training";

export default {
  name: "SessionsTable",

  data: () => {
    return {
      showSearch: false,
      search: null,

      headers: [
        {
          text: "Date",
          value: "date",
          width: "20%",
        },
        {
          text: "Gym",
          value: "gym",
          width: "30%",
        },
        {
          text: "Tags",
          value: "tags",
          width: "25%",
        },
        {
          text: "Comment",
          value: "comment",
        },
      ],
    };
  },

  computed: {
    ...mapState(useTrainingStore, ["data"]),

    sessions: function() {
      // This functions overrides `gym` property so it also contains city.
      return Object.values(this.data)
        .map((session) => {
          return {
            ...session,
            gym: `${session.gym.city.name} / ${session.gym.name}`,
          };
        });
    },
  },

  methods: {
    toggleSearch: function() {
      this.showSearch = !this.showSearch;
      this.search = null;
    },
  },
};
</script>
