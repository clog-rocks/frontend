<template>
  <v-simple-table>
    <template #default>
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
import { mapState } from "pinia";
import { useTrainingStore } from "@/stores/training";

export default {
  name: "TopGymsTable",

  computed: {
    ...mapState(useTrainingStore, ["TOP_GYMS"]),
  },
};
</script>
