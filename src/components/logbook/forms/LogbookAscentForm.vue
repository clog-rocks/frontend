<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { reactive, ref, unref, watch, watchEffect } from "vue";
import VueMultiselect from "vue-multiselect";
import { useRouter } from "vue-router";

import FormDateShortcuts from "@/components/layout/FormDateShortcuts.vue";
import FormFieldError from "@/components/layout/FormFieldError.vue";
import FormInput from "@/components/layout/FormInput.vue";
import AscentRepeatInfo from "@/components/logbook/forms/AscentRepeatInfo.vue";
import GradeMultiselect from "@/components/logbook/forms/GradeMultiselect.vue";
import { useRepeats } from "@/composables/logbook/useRepeats";
import {
  useLogbookAscentStore,
  useLogbookGradeStore,
  useLogbookRouteStore,
} from "@/stores";
import type {
  Ascent,
  AscentForm,
  CreateAscentRequest,
} from "@/types/logbook/ascent";

const props = defineProps<{
  ascentId?: number;
  routeId?: number;
}>();

const getRouteById = (id: number) =>
  stores.route.multiselect.find((route) => route.id == id);

const router = useRouter();
const stores = {
  ascent: useLogbookAscentStore(),
  route: useLogbookRouteStore(),
  grade: useLogbookGradeStore(),
};

const form: AscentForm = reactive({
  comment: undefined,
  date: new Date().toISOString().split("T")[0],
  first_ascent: undefined,
  personal_grade: undefined,
  personal_grade_flag: undefined,
  quality: undefined,
  recommended: undefined,
  route: props.routeId ? getRouteById(props.routeId) : undefined,
  second_go: undefined,
  style: 3,
});

const editing = ref(false);
let ascent: Ascent;

watch(
  () => props.ascentId,
  () => {
    if (!props.ascentId) return;
    ascent = stores.ascent.ascents[props.ascentId];
    if (!ascent) return;
    editing.value = true;
    form.comment = ascent.comment || undefined;
    form.date = ascent.date;
    form.first_ascent = ascent.first_ascent;
    form.personal_grade = ascent.personal_grade
      ? stores.grade.grades[ascent.personal_grade]
      : undefined;
    form.personal_grade_flag = ascent.personal_grade_flag || undefined;
    form.quality = ascent.quality || undefined;
    form.recommended = ascent.recommended;
    form.route = getRouteById(ascent.route);
    form.second_go = ascent.second_go;
    form.style = ascent.style;
  },
  { immediate: true },
);

const rules = {
  route: { required: helpers.withMessage("Route is required", required) },
  date: { required: helpers.withMessage("Date is required", required) },
};

const v$ = useVuelidate(rules, { route: form.route, date: form.date });

const actions = {
  submit: async () => {
    const formValid = await unref(v$).$validate();
    if (!formValid) return;
    const payload: CreateAscentRequest = {
      comment: form.comment,
      date: form.date,
      first_ascent: form.first_ascent,
      personal_grade: form.personal_grade?.id || undefined,
      personal_grade_flag: form.personal_grade_flag,
      quality: form.quality,
      recommended: form.recommended,
      route: form.route!.id,
      second_go: form.second_go,
      style: form.style,
    };
    try {
      if (editing.value && props.ascentId) {
        await stores.ascent.update(props.ascentId, payload);
      } else {
        await stores.ascent.create(payload);
      }
      router.push({ name: "logbook" });
    } catch (error) {
      console.log("Something went wrong submitting logbook/ascent.", error);
    }
  },
  delete: async (id: number) => {
    try {
      await stores.ascent.remove(id);
      router.push({ name: "logbook" });
    } catch (error) {
      console.log("Something went wrong deleting logbook/ascent.", error);
    }
  },
};

const { repeats, isRepeat } = useRepeats(() => form.route?.id, props.ascentId);
watchEffect(() => {
  if (isRepeat) form.style = 3;
});
</script>

<template>
  <form @submit.prevent>
    <h1>{{ editing ? "Edit " : "Add new " }} ascent</h1>
    <AscentRepeatInfo
      v-if="isRepeat"
      :key="form.route?.id"
      :repeats="repeats"
    />
    <label for="id_route">Route</label>
    <VueMultiselect
      id="id_route"
      v-model="form.route"
      :disabled="editing"
      :options="stores.route.multiselect"
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
        {{ option.crag }} / {{ option.sector }} /
        <strong>{{ option.name }}</strong> {{ option.grade }}
      </template>
    </VueMultiselect>
    <FormFieldError :field="v$.route" />
    <RouterLink
      v-if="!editing"
      :to="{ name: 'logbook-route-new' }"
      >Add new route</RouterLink
    >
    <FormInput
      v-model="form.date"
      label="Date"
      type="date"
      :validator="v$.date"
    />
    <FormDateShortcuts v-model="form.date" />
    <GradeMultiselect
      v-model="form.personal_grade"
      label="Personal grade"
    />
    <fieldset v-if="!isRepeat">
      <legend>Choose ascent style</legend>
      <label>
        OS
        <input
          v-model="form.style"
          type="radio"
          name="style"
          value="1"
        />
      </label>
      <label>
        Flash
        <input
          v-model="form.style"
          type="radio"
          name="style"
          value="2"
        />
      </label>
      <label>
        Red Point
        <input
          v-model="form.style"
          type="radio"
          name="style"
          value="3"
        />
      </label>
    </fieldset>
    <fieldset>
      <legend>Choose style attributes</legend>
      <div>
        <label>
          Second GO
          <input
            v-model="form.second_go"
            type="checkbox"
            :disabled="isRepeat"
            name="scales"
          />
        </label>
      </div>
      <div>
        <label>
          First Ascent
          <input
            v-model="form.first_ascent"
            :disabled="isRepeat"
            type="checkbox"
            name="horns"
          />
        </label>
      </div>
    </fieldset>
    <label for="comment">Comment</label>
    <textarea
      id="comment"
      v-model="form.comment"
    />
    <div class="buttons-group">
      <button @click="actions.submit()">
        {{ editing ? "Save changes" : "Add new ascent" }}
      </button>
      <button
        v-if="editing"
        @click="actions.delete(ascent.id)"
      >
        Delete ascent
      </button>
    </div>
  </form>
</template>
