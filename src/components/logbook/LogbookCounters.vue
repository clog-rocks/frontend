<template>
  <div>
    <section class="counters history-sums">
      <div class="counters__header history-sums__item">
        all time
      </div>
      <CounterItem
        class="history-sums__item"
        :delay="300"
        legend="ascents"
        :value="ASCENT_COUNT"
      />
      <CounterItem
        class="history-sums__item"
        :delay="400"
        legend="crag visits"
        :value="CRAG_VISIT_COUNT"
      />
      <div class="counters__header history-sums__item">
        last year
      </div>
      <CounterItem
        class="history-sums__item"
        :delay="500"
        legend="ascents"
        :value="ASCENT_LAST_YEAR_COUNT"
      />
      <CounterItem
        class="history-sums__item"
        :delay="600"
        legend="crag visits"
        :value="CRAG_VISIT_LAST_YEAR_COUNT"
      />
    </section>

    <section class="counters top-grades">
      <div class="counters__header top-grades__item">
        top grades
      </div>
      <div
        v-for="id in [0, 1, 2]"
        :key="id"
        class="top-grades__item"
      >
        <transition
          appear
          name="swing-in-bottom-fwd"
        >
          <CounterItem
            :legend="TOP_GRADES[id].style"
            :static-value="TOP_GRADES[id].fr_route"
          />
        </transition>
      </div>
    </section>
  </div>
</template>

<script>
import CounterItem from "@/components/layout/CounterItem";
import { mapGetters } from "vuex";

export default {
  name: "LogbookCounters",

  components: { CounterItem },

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

<style lang="scss" scoped>
@import "~vuetify/src/styles/styles";
@import "@/scss/grids/counters";

.history-sums {
  &__item {
    &:nth-of-type(1) { grid-area: header_all; }
    &:nth-of-type(2) { grid-area: val_all_asc; }
    &:nth-of-type(3) { grid-area: val_all_vis; }
    &:nth-of-type(4) { grid-area: header_last; }
    &:nth-of-type(5) { grid-area: val_last_asc; }
    &:nth-of-type(6) { grid-area: val_last_vis; }
  }

  grid-template-areas:
    "header_all header_all"
    "val_all_asc val_all_vis"
    "header_last header_last"
    "val_last_asc val_last_vis";

  @media #{map-get($display-breakpoints, "sm-and-up")} {
    grid-template-areas:
      "header_all header_all header_last header_last"
      "val_all_asc val_all_vis val_last_asc val_last_vis";
    grid-template-columns: repeat(4, minmax(145px, 215px));
  }
}

.top-grades {
  &__item {
    &:nth-of-type(1) { grid-area: header; }
    &:nth-of-type(2) { grid-area: val1; }
    &:nth-of-type(3) { grid-area: val2; }
    &:nth-of-type(4) { grid-area: val3; }
  }

  grid-template-areas:
    "header header header"
    "val1 val2 val3";
  grid-template-columns: repeat(3, minmax(100px, 215px));
}
</style>
