<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { reactive, ref, unref, watch, watchEffect } from "vue";
import VueMultiselect from "vue-multiselect";
import { useRouter } from "vue-router";

import FormFieldError from "@/components/layout/FormFieldError.vue";
import AscentRepeatInfo from "@/components/logbook/forms/AscentRepeatInfo.vue";
import { useRepeats } from "@/composables/logbook/useRepeats";
import {
  useLogbookAscentStore,
  useLogbookGradeStore,
  useLogbookRouteStore,
} from "@/stores";
import type { RouteMultiselect } from "@/types/logbook";
import type {
  Ascent,
  CreateAscentRequest,
  PatchAscentRequest,
} from "@/types/logbook/ascent";

const props = defineProps<{
  ascentId?: number;
  routeId?: number;
}>();

function getRoute(routeId: number) {
  return stores.route.multiselect.find((route) => route.id == routeId);
}

const router = useRouter();
const stores = {
  ascent: useLogbookAscentStore(),
  route: useLogbookRouteStore(),
  grade: useLogbookGradeStore(),
};

type Form = Omit<PatchAscentRequest, "route"> & {
  route: RouteMultiselect | undefined;
  date: string; // FIXME: Although not required by API form always has date.
};

const form: Form = reactive({
  comment: undefined,
  date: new Date().toISOString().split("T")[0],
  first_ascent: undefined,
  personal_grade: undefined,
  personal_grade_flag: undefined,
  quality: undefined,
  recommended: undefined,
  route: props.routeId ? getRoute(props.routeId) : undefined,
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
    if (ascent) {
      editing.value = true;
      form.comment = ascent.comment || undefined;
      form.date = ascent.date;
      form.first_ascent = ascent.first_ascent;
      form.personal_grade = ascent.personal_grade || undefined;
      form.personal_grade_flag = ascent.personal_grade_flag || undefined;
      form.quality = ascent.quality || undefined;
      form.recommended = ascent.recommended;
      form.route = getRoute(ascent.route);
      form.second_go = ascent.second_go;
      form.style = ascent.style;
    }
  },
  { immediate: true },
);

const rules = {
  route: { required: helpers.withMessage("Route is required", required) },
  date: { required: helpers.withMessage("Date is required", required) },
};

const v$ = useVuelidate(rules, { route: form.route, date: form.date });

const submit = async function () {
  const formValid = await unref(v$).$validate();
  if (formValid) {
    try {
      const payload: CreateAscentRequest = {
        comment: form.comment,
        date: form.date,
        first_ascent: form.first_ascent,
        personal_grade: form.personal_grade,
        personal_grade_flag: form.personal_grade_flag,
        quality: form.quality,
        recommended: form.recommended,
        route: form.route!.id,
        second_go: form.second_go,
        style: form.style,
      };

      if (editing.value && props.ascentId) {
        await stores.ascent.update(props.ascentId, payload);
      } else {
        await stores.ascent.create(payload);
      }

      router.push({ name: "logbook" });
    } catch (error) {
      console.log("Something went wrong submitting logbook/ascent.", error);
    }
  }
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
    <label>
      Date
      <input
        v-model="form.date"
        type="date"
      />
    </label>
    <label for="id_personal_grade">Personal grade</label>
    <VueMultiselect
      id="id_personal_grade"
      v-model="form.personal_grade"
      :options="Object.values(stores.grade.grades)"
      placeholder=""
      label="fr_route"
      :allow-empty="false"
      :hide-selected="true"
      track-by="id"
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
    <button @click="submit()">
      {{ editing ? "Save changes" : "Add new ascent" }}
    </button>
  </form>
</template>
