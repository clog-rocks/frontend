<script setup lang="ts">
import { computed } from "vue";
import VueMultiselect from "vue-multiselect";

import { useLogbookGradeStore } from "@/stores";
import type { Grade } from "@/types/logbook";

const props = defineProps<{ label: string }>();
const id = computed(() => `id_${props.label.toLowerCase().replace(" ", "_")}`);

const modelValue = defineModel<Grade | undefined>();
const gradeStore = useLogbookGradeStore();
</script>

<template>
  <label :for="id">{{ props.label }}</label>
  <VueMultiselect
    :id="id"
    v-model="modelValue"
    :options="Object.values(gradeStore.grades)"
    placeholder=""
    label="fr_route"
    :allow-empty="false"
    :hide-selected="true"
    track-by="id"
  />
</template>
