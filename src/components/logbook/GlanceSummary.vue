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

    <div class="">
      <table class="table-summary">
        <thead>
          <tr>
            <th></th>
            <th>Ascents</th>
            <th>sessions</th>
            <th>OS</th>
            <th>FL</th>
            <th>RP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="category">all time</td>
            <td class="enlarged-big">{{ ASCENT_COUNT }}</td>
            <td class="enlarged-big">{{ CRAG_VISIT_COUNT }}</td>
            <td class="enlarged-big">8a</td>
            <td class="enlarged-big">7c</td>
            <td class="enlarged-big">7b+</td>
          </tr>
          <tr>
            <td class="category">last year</td>
            <td class="enlarged">{{ ASCENT_LAST_YEAR_COUNT }}</td>
            <td class="enlarged">{{ CRAG_VISIT_LAST_YEAR_COUNT }}</td>
            <td class="enlarged">8a</td>
            <td class="enlarged">7c</td>
            <td class="enlarged">7b+</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "GlanceSummary",

  computed: {
    ...mapGetters("logbook", [
      "ASCENT_COUNT",
      "ASCENT_LAST_YEAR_COUNT",
      "CRAG_VISIT_COUNT",
      "CRAG_VISIT_LAST_YEAR_COUNT",
    ]),
    ...mapState("auth", ["user"]),
  },
};
</script>

<style scoped>
/* Tabular summary. */
.category {
  text-transform: uppercase;
  text-align: center;
  font-weight: 300;
  font-size: 0.8em;
}

td,
th {
  padding-right: 30px;
  padding-left: 30px;
}

th {
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  text-transform: uppercase;
  font-weight: 300;
}

/* Textual summary. */
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
