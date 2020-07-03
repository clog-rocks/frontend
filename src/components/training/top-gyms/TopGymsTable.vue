<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Gym
          </th>
          <th class="text-left">
            Sessions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="entry in TOP_GYMS"
          :key="entry[0]"
        >
          <td>{{ entry[0] }}</td>
          <td>{{ entry[1] }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TopGymsTable",

  computed: {
    ...mapGetters("training", ["TOP_GYMS"]),
  },
};
</script>
