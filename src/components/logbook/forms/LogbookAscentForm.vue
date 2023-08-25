<script setup lang="ts">
import { ref, watchEffect } from "vue";
import VueMultiselect from "vue-multiselect";
import { useRouter } from "vue-router";

import { useLogbookAscentStore, useLogbookRouteStore } from "@/stores";
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

const submit = async function () {
  // TODO: validate
  if (!route.value) return;
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
};
</script>

<template>
  <div>
    <p class="thin-header">{{ editing ? "Edit " : "Add new " }} ascent</p>
    <form @submit.prevent>
      <label>Route</label>
      <VueMultiselect
        id="route"
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
        <template #singleLabel="{ option }">
          {{ option.crag }}
          /
          {{ option.sector }}
          /
          <strong>{{ option.name }}</strong>
          {{ option.grade }}
        </template>
        <template #option="{ option }">
          {{ option.crag }}
          /
          {{ option.sector }}
          /
          <strong>{{ option.name }}</strong>
          {{ option.grade }}
        </template>
      </VueMultiselect>
      <pre>{{ route }}</pre>
      <RouterLink
        v-if="!editing"
        :to="{ name: 'logbook-route-new' }"
        >Add new route</RouterLink
      >
      <label>
        Date
        <input
          id="date"
          v-model="date"
          type="date"
        />
      </label>
      <fieldset>
        <legend>Choose ascent style</legend>
        <label>
          OS
          <input
            id="OS"
            v-model="style"
            type="radio"
            name="style"
            value="1"
          />
        </label>
        <label>
          Flash
          <input
            id="FL"
            v-model="style"
            type="radio"
            name="style"
            value="2"
          />
        </label>
        <label>
          Red Point
          <input
            id="RP"
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
              id="second_go"
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
              id="first_ascent"
              v-model="first_ascent"
              type="checkbox"
              name="horns"
            />
          </label>
        </div>
      </fieldset>
      <label>Comment</label>
      <textarea v-model="comment"></textarea>
      <button @click="submit()">
        {{ editing ? "Save changes" : "Add new ascent" }}
      </button>
    </form>
  </div>
</template>
