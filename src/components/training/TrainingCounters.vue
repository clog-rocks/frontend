<template>
  <section class="counters training-stats">
    <CounterItem
      class="training-stats__item"
      :delay="300"
      legend="sessions"
      :value="SESSIONS_COUNT"
    />
    <CounterItem
      class="training-stats__item"
      :delay="400"
      legend="gyms"
      :value="GYMS_COUNT"
    />
    <CounterItem
      class="training-stats__item"
      :delay="500"
      legend="cities"
      :value="CITIES_COUNT"
    />
    <CounterItem
      class="training-stats__item"
      :delay="600"
      legend="countries"
      :value="COUNTRIES_COUNT"
    />
  </section>
</template>

<script>
import CounterItem from "@/components/layout/CounterItem";
import { mapGetters } from "vuex";

export default {
  name: "TrainingCounters",

  components: { CounterItem },

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

<style lang="scss" scoped>
@import "@/scss/grids/counters";

.training-stats {
  &__item {
    &:nth-of-type(1) { grid-area: sessions; }
    &:nth-of-type(2) { grid-area: gyms; }
    &:nth-of-type(3) { grid-area: cities; }
    &:nth-of-type(4) { grid-area: countries; }
  }

  grid-template-areas:
    "sessions gyms"
    "cities countries";

  @media #{map-get($display-breakpoints, "sm-and-up")} {
    grid-template-areas: "sessions gyms cities countries";
    grid-template-columns: repeat(4, minmax(145px, 215px));
  }
}
</style>
