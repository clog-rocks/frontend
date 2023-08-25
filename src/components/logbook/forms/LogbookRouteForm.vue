<script setup lang="ts">
import { ref } from "vue";
import VueMultiselect from "vue-multiselect";

import router from "@/router";
import { useLogbookRouteStore } from "@/stores";
import { useLogbookGradeStore } from "@/stores/logbook/grade";
import { useLogbookSectorStore } from "@/stores/logbook/sector";
import {
  type Grade,
  type RouteRequest,
  type SectorMultiselect,
} from "@/types/logbook";

const props = defineProps<{
  sectorId?: number;
}>();

const stores = {
  grade: useLogbookGradeStore(),
  sector: useLogbookSectorStore(),
  route: useLogbookRouteStore(),
};

const name = ref<string>();
const sector = ref<SectorMultiselect | undefined>(
  props.sectorId
    ? stores.sector.multiselect.find((sector) => sector.id == props.sectorId)
    : undefined,
);
const grade = ref<Grade>();

const submit = async function () {
  // TODO: validate
  if (!name.value || !sector.value || !grade.value) return;

  const payload: RouteRequest = {
    name: name.value,
    sector: sector.value.id,
    grade: grade.value.id,
  };

  try {
    const newRoute = await stores.route.create(payload);
    router.push({
      name: "logbook-ascent-new",
      params: { routeId: newRoute.id },
    });
  } catch (error) {
    console.log("Something went wrong submitting logbook/route.", error);
  }
};
</script>

<template>
  <form @submit.prevent>
    <p class="thin-header">Add new route</p>
    <label for="sector">Sector</label>
    <VueMultiselect
      id="sector"
      v-model="sector"
      :options="stores.sector.multiselect"
      placeholder=""
      label="id"
      :allow-empty="false"
      :hide-selected="true"
      track-by="id"
      :options-limit="20"
    >
      <template #singleLabel="{ option }">
        {{ option.country }}
        /
        {{ option.crag }}
        /
        <strong>{{ option.name }}</strong>
      </template>
      <template #option="{ option }">
        {{ option.country }}
        /
        {{ option.crag }}
        /
        <strong>{{ option.name }}</strong>
      </template>
    </VueMultiselect>
    <pre>{{ sector }}</pre>
    <RouterLink :to="{ name: 'logbook-sector-new' }">Add new sector</RouterLink>
    <label for="grade">Grade</label>
    <VueMultiselect
      id="grade"
      v-model="grade"
      :options="Object.values(stores.grade.grades)"
      placeholder=""
      label="fr_route"
      :allow-empty="false"
      :hide-selected="true"
      track-by="id"
    />
    <label>
      Route
      <input
        v-model="name"
        type="text"
        autocorrect="off"
        spellcheck="false"
        required
      />
    </label>
    <button @click="submit()">Add new route</button>
  </form>
</template>
