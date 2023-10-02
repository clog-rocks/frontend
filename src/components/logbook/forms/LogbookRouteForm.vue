<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { ref, unref } from "vue";
import VueMultiselect from "vue-multiselect";

import FormFieldError from "@/components/layout/FormFieldError.vue";
import FormInput from "@/components/layout/FormInput.vue";
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

const rules = {
  sector: { required: helpers.withMessage("Sector is required", required) },
  grade: { required: helpers.withMessage("Grade is required", required) },
  name: { required: helpers.withMessage("Sector is requried", required) },
};

const v$ = useVuelidate(rules, { sector, grade, name });

const submit = async function () {
  const formValid = await unref(v$).$validate();
  if (formValid && name.value && sector.value && grade.value) {
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
  }
};
</script>

<template>
  <form @submit.prevent>
    <h1>Add new route</h1>
    <label for="id_sector">Sector</label>
    <VueMultiselect
      id="id_sector"
      v-model="sector"
      :options="stores.sector.multiselect"
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
        {{ option.country }}
        /
        {{ option.crag }}
        /
        <strong>{{ option.name }}</strong>
      </template>
    </VueMultiselect>
    <FormFieldError :field="v$.sector" />
    <RouterLink :to="{ name: 'logbook-sector-new' }">Add new sector</RouterLink>
    <label for="id_grade">Grade</label>
    <VueMultiselect
      id="id_grade"
      v-model="grade"
      :options="Object.values(stores.grade.grades)"
      placeholder=""
      label="fr_route"
      :allow-empty="false"
      :hide-selected="true"
      track-by="id"
    />
    <FormFieldError :field="v$.grade" />
    <FormInput
      v-model="name"
      label="Route"
      :validator="v$.name"
    />
    <button @click="submit()">Add new route</button>
  </form>
</template>
