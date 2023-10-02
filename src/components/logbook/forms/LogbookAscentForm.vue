<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { ref, unref, watchEffect } from "vue";
import VueMultiselect from "vue-multiselect";
import { useRouter } from "vue-router";

import FormFieldError from "@/components/layout/FormFieldError.vue";
import {
  useLogbookAscentStore,
  useLogbookGradeStore,
  useLogbookRouteStore,
} from "@/stores";
import {
  type Ascent,
  type AscentRequest,
  type PersonalGradeFlag,
  type RouteMultiselect,
} from "@/types/logbook";

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

const comment = ref<string>();
const date = ref(new Date().toISOString().split("T")[0]);
const first_ascent = ref(false);
const personal_grade = ref<number>();
const personal_grade_flag = ref<PersonalGradeFlag>();
const quality = ref<number | null>(null);
const recommended = ref(false);
const route = ref<RouteMultiselect | undefined>(
  props.routeId ? getRoute(props.routeId) : undefined,
);
const second_go = ref(false);
const style = ref(3);

let editing = false;
let ascent: Ascent;

watchEffect(() => {
  if (!props.ascentId) return;
  ascent = stores.ascent.ascents[props.ascentId];
  if (ascent) {
    editing = true;
    comment.value = ascent.comment;
    date.value = ascent.date;
    first_ascent.value = ascent.first_ascent;
    personal_grade.value = ascent.personal_grade;
    personal_grade_flag.value = ascent.personal_grade_flag;
    quality.value = ascent.quality;
    recommended.value = ascent.recommended;
    route.value = getRoute(ascent.route);
    second_go.value = ascent.second_go;
    style.value = ascent.style;
  }
});

const rules = {
  route: { required: helpers.withMessage("Route is required", required) },
  date: { required: helpers.withMessage("Date is required", required) },
};

const v$ = useVuelidate(rules, { route, date });

const submit = async function () {
  const formValid = await unref(v$).$validate();
  if (formValid && route.value) {
    try {
      const payload: AscentRequest = {
        comment: comment.value,
        date: date.value,
        first_ascent: first_ascent.value,
        personal_grade: personal_grade.value,
        personal_grade_flag: personal_grade_flag.value,
        quality: quality.value,
        recommended: recommended.value,
        route: route.value.id,
        second_go: second_go.value,
        style: style.value,
      };

      if (editing && props.ascentId) {
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
</script>

<template>
  <form @submit.prevent>
    <h1>{{ editing ? "Edit " : "Add new " }} ascent</h1>
    <label for="id_route">Route</label>
    <VueMultiselect
      id="id_route"
      v-model="route"
      :disabled="editing"
      :options="stores.route.multiselect"
      placeholder=""
      label="id"
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
        {{ option.crag }}
        /
        {{ option.sector }}
        /
        <strong>{{ option.name }}</strong>
        {{ option.grade }}
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
        v-model="date"
        type="date"
      />
    </label>
    <label for="id_personal_grade">Personal grade</label>
    <VueMultiselect
      id="id_personal_grade"
      v-model="personal_grade"
      :options="Object.values(stores.grade.grades)"
      placeholder=""
      label="fr_route"
      :allow-empty="false"
      :hide-selected="true"
      track-by="id"
    />
    <fieldset>
      <legend>Choose ascent style</legend>
      <label>
        OS
        <input
          v-model="style"
          type="radio"
          name="style"
          value="1"
        />
      </label>
      <label>
        Flash
        <input
          v-model="style"
          type="radio"
          name="style"
          value="2"
        />
      </label>
      <label>
        Red Point
        <input
          v-model="style"
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
            v-model="second_go"
            type="checkbox"
            name="scales"
          />
        </label>
      </div>
      <div>
        <label>
          First Ascent
          <input
            v-model="first_ascent"
            type="checkbox"
            name="horns"
          />
        </label>
      </div>
    </fieldset>
    <label for="comment">Comment</label>
    <textarea
      id="comment"
      v-model="comment"
    />
    <button @click="submit()">
      {{ editing ? "Save changes" : "Add new ascent" }}
    </button>
  </form>
</template>
