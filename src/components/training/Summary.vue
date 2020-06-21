<template>
  <div>
    <div class="counter-summary">
      <v-row>
        <v-col cols="12" sm="6" class="py-0">
          <v-row>
            <v-col class="py-1">
              <Counter legend="sessions" :delay="300" :value="SESSIONS_COUNT" />
            </v-col>
            <v-col class="py-1">
              <Counter legend="gyms" :delay="400" :value="GYMS_COUNT" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6" class="py-0">
          <v-row>
            <v-col class="py-1">
              <Counter legend="cities" :delay="500" :value="CITIES_COUNT" />
            </v-col>
            <v-col class="py-1">
              <Counter
                legend="countries"
                :delay="600"
                :value="COUNTRIES_COUNT"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Counter from "@/components/layout/Counter";

export default {
  name: "Summary",

  components: {
    Counter,
  },

  computed: {
    ...mapGetters("training", [
      "CITIES_COUNT",
      "COUNTRIES_COUNT",
      "GYMS_COUNT",
      "SESSIONS_COUNT",
    ]),
  },
};
</script>
