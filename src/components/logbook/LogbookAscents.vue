<script setup lang="ts">
import { map, orderBy } from "lodash-es";
import { computed, ref } from "vue";

import { useLogbookAscentStore } from "@/stores";
import type { Ascent } from "@/types/logbook";

const show = ref(true);

const ascentStore = useLogbookAscentStore();

const sorted = computed(() =>
  orderBy(
    map(ascentStore.ascents, (ascent: Ascent) => ascent),
    ["date", "date_added"],
    ["desc", "desc"],
  ).slice(0, 5),
);

const deleteAscent = async (id: number) => {
  try {
    await ascentStore.remove(id);
    return Promise.resolve();
  } catch (error) {
    console.log("Something went wrong deleting logbook/ascent.", error);
  }
};
</script>

<template>
  <section>
    <h1>Latest</h1>
    <span @click="show = !show"> click to {{ show ? "hide" : "show" }}</span>
    <transition name="fade">
      <transition-group
        v-if="show"
        tag="ul"
        name="list"
        appear
      >
        <li
          v-for="ascent in sorted"
          :key="ascent.id"
          @click.exact="
            $router.push({
              name: 'logbook-ascent-edit',
              params: { ascentId: ascent.id },
            })
          "
          @click.alt="deleteAscent(ascent.id)"
        >
          <pre>{{ ascent }}</pre>
        </li>
      </transition-group>
    </transition>
  </section>
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
