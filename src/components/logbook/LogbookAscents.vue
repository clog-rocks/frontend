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
