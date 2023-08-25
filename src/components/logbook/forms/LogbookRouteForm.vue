<script setup lang="ts">
import { ref, watchEffect } from "vue";
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
  id?: number;
}>();

const name = ref<string>();
const sector = ref<SectorMultiselect>();
const grade = ref<Grade>();

const stores = {
  grade: useLogbookGradeStore(),
  sector: useLogbookSectorStore(),
  route: useLogbookRouteStore(),
};

watchEffect(() => {
  if (!props.id) return;

  sector.value = stores.sector.multiselect.find(
    (sector) => sector.id == props.id,
  );
});

const submit = async function () {
  // TODO: validate
  if (!name.value || !sector.value || !grade.value) return;

  const payload: RouteRequest = {
    name: name.value,
    sector: sector.value.id,
    grade: grade.value.id,
  };

  try {
    await stores.route.create(payload);
    router.push({ name: "logbook-ascent-new" });
  } catch (error) {
    console.log("Something went wrong submitting logbook/route.", error);
  }
};
</script>

<template>
  <div>
    <p class="thin-header">Add new route</p>
    <form @submit.prevent>
      <label>Sector</label>
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
      <RouterLink :to="{ name: 'logbook-sector-new' }"
        >Add new sector</RouterLink
      >
      <label>Grade</label>
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
      <label>Route</label>
      <input
        id="route"
        v-model="name"
        type="text"
        autocorrect="off"
        spellcheck="false"
        required
      />
      <button @click="submit()">Add new route</button>
    </form>
  </div>
</template>
