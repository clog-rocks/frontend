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
        <tr v-for="(count, gym) in TOP_GYMS" :key="gym">
          <td>{{ gym }}</td>
          <td>{{ count }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Table",

  computed: {
    ...mapGetters("training", ["TOP_GYMS"]),
  },
};
</script>
