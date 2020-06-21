<template>
  <div class="counter-summary">
    <v-row>
      <v-col cols="12" sm="6" class="py-0">
        <v-row>
          <v-col class="py-0">
            <span class="header">all time</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-1">
            <Counter legend="ascents" :delay="300" :value="ASCENT_COUNT" />
          </v-col>
          <v-col class="py-1">
            <Counter
              legend="crag visits"
              :delay="400"
              :value="CRAG_VISIT_COUNT"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="6" class="py-0">
        <v-row>
          <v-col class="py-0">
            <span class="header">last year</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-1">
            <Counter
              legend="ascents"
              :delay="500"
              :value="ASCENT_LAST_YEAR_COUNT"
            />
          </v-col>
          <v-col class="py-1">
            <Counter
              legend="crag visits"
              :delay="600"
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
          <v-col v-for="id in [0, 1, 2]" :key="id" class="py-1">
            <transition name="swing-in-bottom-fwd" appear>
              <Counter
                :staticValue="TOP_GRADES[id].fr_route"
                :legend="TOP_GRADES[id].style"
              />
            </transition>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
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
