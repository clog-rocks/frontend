<template>
  <div>
    <div class="counter-summary">
      <v-row>
        <v-col
          class="py-0"
          cols="12"
          sm="6"
        >
          <v-row>
            <v-col class="py-1">
              <Counter
                :delay="300"
                legend="sessions"
                :value="SESSIONS_COUNT"
              />
            </v-col>
            <v-col class="py-1">
              <Counter
                :delay="400"
                legend="gyms"
                :value="GYMS_COUNT"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col
          class="py-0"
          cols="12"
          sm="6"
        >
          <v-row>
            <v-col class="py-1">
              <Counter
                :delay="500"
                legend="cities"
                :value="CITIES_COUNT"
              />
            </v-col>
            <v-col class="py-1">
              <Counter
                :delay="600"
                legend="countries"
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
import Counter from "@/components/layout/Counter";
import { mapGetters } from "vuex";

export default {
  name: "Counters",

  components: { Counter },

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
