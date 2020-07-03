<template>
  <div class="counter-summary">
    <v-row>
      <v-col
        class="py-0"
        cols="12"
        sm="6"
      >
        <v-row>
          <v-col class="py-0">
            <span class="header">all time</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-1">
            <Counter
              :delay="300"
              legend="ascents"
              :value="ASCENT_COUNT"
            />
          </v-col>
          <v-col class="py-1">
            <Counter
              :delay="400"
              legend="crag visits"
              :value="CRAG_VISIT_COUNT"
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
          <v-col class="py-0">
            <span class="header">last year</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-1">
            <Counter
              :delay="500"
              legend="ascents"
              :value="ASCENT_LAST_YEAR_COUNT"
            />
          </v-col>
          <v-col class="py-1">
            <Counter
              :delay="600"
              legend="crag visits"
              :value="CRAG_VISIT_LAST_YEAR_COUNT"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-row>
          <v-col class="py-0">
            <span class="header">top grades</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="id in [0, 1, 2]"
            :key="id"
            class="py-1"
          >
            <transition
              appear
              name="swing-in-bottom-fwd"
            >
              <Counter
                :legend="TOP_GRADES[id].style"
                :static-value="TOP_GRADES[id].fr_route"
              />
            </transition>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Counter from "@/components/layout/Counter";
import { mapGetters } from "vuex";

export default {
  name: "Counters",

  components: { Counter },

  computed: {
    ...mapGetters("logbook", [
      "ASCENT_COUNT",
      "ASCENT_LAST_YEAR_COUNT",
      "CRAG_VISIT_COUNT",
      "CRAG_VISIT_LAST_YEAR_COUNT",
      "TOP_GRADES",
    ]),
  },
};
</script>
