<script setup lang="ts">
import CounterItem from "@/components/layout/CounterItem.vue";
import { useLogbookStore } from "@/stores";

const logbookStore = useLogbookStore();
</script>

<template>
  <div>
    <section class="counters history-sums">
      <div class="counters__header history-sums__item">all time</div>
      <CounterItem
        class="history-sums__item"
        legend="ascents"
        :value="logbookStore.ascent_count"
      />
      <CounterItem
        class="history-sums__item"
        legend="crag visits"
        :value="logbookStore.crag_visit_count"
      />
      <div class="counters__header history-sums__item">last year</div>
      <CounterItem
        class="history-sums__item"
        legend="ascents"
        :value="logbookStore.ascent_last_year_count"
      />
      <CounterItem
        class="history-sums__item"
        legend="crag visits"
        :value="logbookStore.crag_visit_last_year_count"
      />
    </section>

    <section class="counters top-grades">
      <div class="counters__header top-grades__item">top grades</div>
      <transition-group
        v-for="i in logbookStore.top_grades"
        :key="i.style.id"
        name="list"
        tag="div"
        class="top-grades__item"
      >
        <CounterItem
          v-if="i.grade !== undefined"
          :legend="i.style.name"
          :value="i.grade.fr_route"
        />
      </transition-group>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/counters.module";

.history-sums {
  &__item {
    &:nth-of-type(1) {
      grid-area: header_all;
    }

    &:nth-of-type(2) {
      grid-area: val_all_asc;
    }

    &:nth-of-type(3) {
      grid-area: val_all_vis;
    }

    &:nth-of-type(4) {
      grid-area: header_last;
    }

    &:nth-of-type(5) {
      grid-area: val_last_asc;
    }

    &:nth-of-type(6) {
      grid-area: val_last_vis;
    }
  }

  grid-template-areas:
    "header_all header_all"
    "val_all_asc val_all_vis"
    "header_last header_last"
    "val_last_asc val_last_vis";
}

.top-grades {
  &__item {
    &:nth-of-type(1) {
      grid-area: header;
    }

    &:nth-of-type(2) {
      grid-area: val1;
    }

    &:nth-of-type(3) {
      grid-area: val2;
    }

    &:nth-of-type(4) {
      grid-area: val3;
    }
  }

  grid-template-areas:
    "header header header"
    "val1 val2 val3";
  grid-template-columns: repeat(3, minmax(100px, 215px));
}
</style>
