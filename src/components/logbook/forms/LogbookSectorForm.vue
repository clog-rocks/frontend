<script setup lang="ts">
import { ref } from "vue";
import VueMultiselect from "vue-multiselect";

import router from "@/router";
import { useLogbookCragStore, useLogbookSectorStore } from "@/stores";
import { type CragMultiselect, type SectorRequest } from "@/types/logbook";

const props = defineProps<{
  cragId?: number;
}>();

const stores = {
  crag: useLogbookCragStore(),
  sector: useLogbookSectorStore(),
};

const name = ref<string>();
const crag = ref<CragMultiselect | undefined>(
  props.cragId
    ? stores.crag.multiselect.find((crag) => crag.id == props.cragId)
    : undefined,
);

const submit = async function () {
  // TODO: validate
  if (!name.value || !crag.value) return;

  const payload: SectorRequest = {
    name: name.value,
    crag: crag.value.id,
  };

  try {
    const newSector = await stores.sector.create(payload);
    router.push({
      name: "logbook-route-new",
      params: { sectorId: newSector.id },
    });
  } catch (error) {
    console.log("Something went wrong submitting logbook/route.", error);
  }
};
</script>

<template>
  <form @submit.prevent>
    <h1>Add new sector</h1>
    <label for="crag">Crag</label>
    <VueMultiselect
      id="crag"
      v-model="crag"
      :options="stores.crag.multiselect"
      placeholder=""
      label="id"
      :allow-empty="false"
      :hide-selected="true"
      track-by="id"
      :options-limit="20"
    >
      <template #singleLabel="{ option }">
        {{ option.country }} / <strong>{{ option.name }}</strong>
      </template>
      <template #option="{ option }">
        {{ option.country }} / <strong>{{ option.name }}</strong>
      </template>
    </VueMultiselect>
    <pre>{{ crag }}</pre>
    <RouterLink :to="{ name: 'logbook-crag-new' }">Add new crag</RouterLink>
    <label>
      Sector
      <input
        v-model="name"
        type="text"
        autocorrect="off"
        spellcheck="false"
        required
      />
    </label>
    <button @click="submit()">Add new sector</button>
  </form>
</template>
