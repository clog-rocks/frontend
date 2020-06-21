<template>
  <div>
    <v-row align="center" justify="center" class="py-5 px-2">
      <v-col class="text-center">
        <h3 class="font-weight-light">Training sessions</h3>
      </v-col>
      <v-col>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          hide-details
          clearable
        ></v-text-field>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="sessions"
      :items-per-page="5"
      :search="search"
      sort-by="date"
      sort-desc
      calculate-widths
    >
      <template v-slot:item.tags="{ item }">
        <v-chip
          v-for="(tag, id) in item.tags"
          :key="id"
          :search="search"
          color="primary"
          outlined
          small
          >{{ tag }}</v-chip
        >
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SessionsTable",

  data() {
    return {
      search: "",
      headers: [
        { text: "Date", value: "date", width: "20%" },
        { text: "Gym", value: "gym", width: "30%" },
        { text: "Tags", value: "tags", width: "25%" },
        { text: "Comment", value: "comment" },
      ],
    };
  },

  computed: {
    ...mapState("training", ["data"]),

    sessions: function () {
      return Object.values(this.data).map((session) => {
        return {
          ...session,
          gym: `${session.gym.city.name} / ${session.gym.name}`,
        };
      });
    },
  },
};
</script>
