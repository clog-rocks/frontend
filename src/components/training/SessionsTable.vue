<template>
  <div>
    <v-row
      align="center"
      class="px-2 py-5"
      justify="center"
    >
      <v-col class="text-center">
        <h3 class="font-weight-light">
          Training sessions
        </h3>
      </v-col>
      <v-col>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          clearable
          hide-details
          label="Search"
        />
      </v-col>
    </v-row>
    <v-data-table
      calculate-widths
      :headers="headers"
      :items="sessions"
      :items-per-page="5"
      :search="search"
      sort-by="date"
      sort-desc
    >
      <template v-slot:item.tags="{ item }">
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
import { mapState } from "vuex";

export default {
  name: "SessionsTable",

  data: () => {
    return {
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
    ...mapState("training", ["data"]),

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
};
</script>
