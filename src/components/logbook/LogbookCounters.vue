<script setup lang="ts">
import { computed } from "vue";

import CounterItem from "@/components/layout/CounterItem.vue";
import { useLogbookAscentStore } from "@/stores";

const ascentStore = useLogbookAscentStore();
const existing_grades = computed(() =>
  ascentStore.top_grades.filter((i) => i.grade),
);
</script>

<template>
  <section class="counters">
    <div class="group">
      <span class="header">all time</span>
      <div class="items">
        <CounterItem
          legend="ascents"
          :value="ascentStore.ascent_count"
        />
        <CounterItem
          legend="crag visits"
          :value="ascentStore.crag_visit_count"
        />
      </div>
    </div>
    <div class="group">
      <span class="header">last year</span>
      <div class="items">
        <CounterItem
          legend="ascents"
          :value="ascentStore.ascent_last_year_count"
        />
        <CounterItem
          legend="crag visits"
          :value="ascentStore.crag_visit_last_year_count"
        />
      </div>
    </div>
    <div
      v-if="existing_grades.length"
      class="group"
    >
      <span class="header">top grades</span>
      <div class="items">
        <transition-group name="list">
          <CounterItem
            v-for="i in existing_grades"
            :key="i.style.id"
            :legend="i.style.name"
            :value="i.grade.fr_route"
          />
        </transition-group>
      </div>
    </div>
  </section>
</template>
