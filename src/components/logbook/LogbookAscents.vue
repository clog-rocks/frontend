<script setup lang="ts">
import { map, orderBy } from "lodash";
import { computed, ref } from "vue";

import { useLogbookStore } from "@/stores";
import type { Ascent } from "@/types/logbook";

const logbookStore = useLogbookStore();
const show = ref(true);

const sorted = computed(() =>
  orderBy(
    map(logbookStore.ascents, (ascent: Ascent) => ascent),
    ["date", "date_added"],
    ["desc", "desc"]
  ).slice(0, 5)
);

const deleteAscent = async (id: number) => {
  try {
    await logbookStore.deleteAscent(id);
    return Promise.resolve();
  } catch (error) {
    console.log("somethoing went wrogn");
  }
};
</script>

<template>
  <div
    class="thin-header"
    @click="show = !show"
  >
    Latest ascents
  </div>
  <transition name="fade">
    <div v-if="show">
      <transition-group
        tag="ul"
        name="list"
        appear
      >
        <li
          v-for="ascent in sorted"
          :key="ascent.id"
          @click="deleteAscent(ascent.id)"
        >
          <p>{{ ascent }}</p>
        </li>
      </transition-group>
    </div>
  </transition>
</template>

<style scoped>
ul {
  position: relative;
  list-style-type: none;
}

li {
  display: flex;
  gap: 1em;
  max-width: 500px;
  padding: 0.5rem;
  margin: 15px auto;
  background-color: var(--color-background-mute);
  border-radius: 10px;
  box-shadow: 1px 3px 5px rgb(0 0 0 / 10%);
}

ul li:first-of-type {
  margin-top: 0;
}

ul li:last-of-type {
  margin-bottom: 0;
}
</style>
