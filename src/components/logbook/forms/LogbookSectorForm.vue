<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { ref, unref } from "vue";
import VueMultiselect from "vue-multiselect";

import FormFieldError from "@/components/layout/FormFieldError.vue";
import FormInput from "@/components/layout/FormInput.vue";
import router from "@/router";
import { useLogbookCragStore, useLogbookSectorStore } from "@/stores";
import type { CragMultiselect, SectorRequest } from "@/types/logbook";

const props = defineProps<{
  cragId?: number;
}>();

const stores = {
  crag: useLogbookCragStore(),
  sector: useLogbookSectorStore(),
};

const name = ref<string>("");
const crag = ref<CragMultiselect | undefined>(
  props.cragId
    ? stores.crag.multiselect.find((crag) => crag.id == props.cragId)
    : undefined,
);

const rules = {
  crag: { required: helpers.withMessage("Crag is required", required) },
  name: { required: helpers.withMessage("Sector is requried", required) },
};

const v$ = useVuelidate(rules, { crag, name });

async function submit() {
  const formValid = await unref(v$).$validate();
  if (formValid && crag.value) {
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
  }
}
</script>

<template>
  <form @submit.prevent>
    <h1>Add new sector</h1>
    <label for="id_crag">Crag</label>
    <VueMultiselect
      id="id_crag"
      v-model="crag"
      :options="stores.crag.multiselect"
      placeholder=""
      label="name"
      :allow-empty="false"
      :hide-selected="true"
      track-by="id"
      :options-limit="20"
    >
      <template
        v-for="slotName in ['option', 'singleLabel']"
        #[slotName]="{ option }"
        :key="slotName"
      >
        {{ option.country }} / <strong>{{ option.name }}</strong>
      </template>
    </VueMultiselect>
    <FormFieldError :field="v$.crag" />
    <RouterLink :to="{ name: 'logbook-crag-new' }">Add new crag</RouterLink>
    <FormInput
      v-model="name"
      label="Sector"
      :validator="v$.name"
    />
    <button @click="submit()">Add new sector</button>
  </form>
</template>
