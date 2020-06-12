<template>
  <div class="summary">
    <h1>Hello {{ user.username }},</h1>
    <p class="lead my-3">
      you have
      <span class="enlarged">{{ ASCENT_COUNT }}</span> ascents and
      <span class="enlarged">{{ CRAG_VISIT_COUNT }}</span> crag visits (<span
        class="enlarged"
        >{{ ASCENT_LAST_YEAR_COUNT }}</span
      >
      ascents and
      <span class="enlarged">{{ CRAG_VISIT_LAST_YEAR_COUNT }}</span> crag visits
      in last 12 months). Your most difficult route is
      <span class="enlarged">8a</span>. You also onsighted
      <span class="enlarged">7c+</span> and flashed
      <span class="enlarged">7b+</span>. It has been
      <span class="enlarged">7</span> years,
      <span class="enlarged">1</span> month and
      <span class="enlarged">4</span> days since you logged your first route.
      You've climbed on average <span class="enlarged">255.29</span> routes a
      year.
    </p>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "GlanceSummary",

  computed: {
    ...mapGetters("logbook", [
      "LOGBOOK",
      "ASCENT_COUNT",
      "ASCENT_LAST_YEAR_COUNT",
      "CRAG_VISIT_COUNT",
      "CRAG_VISIT_LAST_YEAR_COUNT",
      "TOP_ONSIGHT",
      "TOP_FLASH",
      "TOP_REDPOINT",
    ]),
    ...mapState("auth", ["user"]),

    bestGrades() {
      return 'Your most difficult route is <span class="enlarged">8a</span>. You also onsighted <span class="enlarged">7c+</span> and flashed <span class="enlarged">7b+</span>.';
    },
    averagePerYear() {
      return 'It has been <span class="enlarged">7</span> years, <span class="enlarged">1</span> month and <span class="enlarged">4</span> days since you logged your first route. You\'ve climbed on average <span class="enlarged">255.29</span> routes a year.';
    },
  },

  methods: {},
};
</script>

<style scoped>
.summary {
  max-width: 600px;
  justify-self: center;
  margin: auto;
  padding-top: 2rem;
  text-align: center;
}

.lead {
  line-height: 2;
  text-align: center;
}
</style>
