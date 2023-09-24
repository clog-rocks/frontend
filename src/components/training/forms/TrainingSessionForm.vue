<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { onMounted, type Ref, ref, unref, watchEffect } from "vue";
import VueMultiselect from "vue-multiselect";
import Multiselect from "vue-multiselect";
import { useRouter } from "vue-router";

import FormFieldError from "@/components/layout/FormFieldError.vue";
import FormInput from "@/components/layout/FormInput.vue";
import {
  useTrainingGymStore,
  useTrainingSessionStore,
  useTrainingTagStore,
} from "@/stores";
import { type Tag } from "@/types/generic";
import type {
  GymMultiselect,
  TrainingSession,
  TrainingSessionRequest,
} from "@/types/training";

const props = defineProps<{
  sessionId?: number;
  gymId?: number;
}>();

function getGym(sessionId: number) {
  return stores.gym.multiselect.find((gym) => gym.id == sessionId);
}

const router = useRouter();
const stores = {
  gym: useTrainingGymStore(),
  session: useTrainingSessionStore(),
  tag: useTrainingTagStore(),
};

const gym = ref<GymMultiselect | undefined>(
  props.gymId ? getGym(props.gymId) : undefined,
);
const date = ref(new Date().toISOString().split("T")[0]);
const comment = ref<string>();
const tags: Ref<Tag[]> = ref([]);

const rules = {
  gym: { required: helpers.withMessage("You must select a gym", required) },
  date: { required: helpers.withMessage("Date is required", required) },
};

let editing = false;
let session: TrainingSession;

const v$ = useVuelidate(rules, { gym, date, comment, tags });

onMounted(async () => {
  await stores.tag.fetch();
});

// Watch route.params.sessionId in case user selects/changes session to edit.
watchEffect(() => {
  const sessionId = props.sessionId;
  if (!sessionId) return;

  session = stores.session.sessions[sessionId];
  editing = true;
  gym.value = getGym(session.gym);
  date.value = session.date;
  tags.value = session.tags.map((tag) => ({ name: tag }));
  if (session.comment) comment.value = session.comment;
});

async function submit() {
  const formValid = await unref(v$).$validate();
  if (formValid && gym.value)
    try {
      // Need to check if editing or creating new one.
      const payload: TrainingSessionRequest = {
        gym: gym.value.id,
        date: date.value,
        comment: comment.value,
        tags: tags.value.map((tag) => tag.name),
      };

      if (editing) {
        await stores.session.update(session.id, payload);
      } else {
        await stores.session.create(payload);
      }

      router.push({ name: "training" });
    } catch (error) {
      console.log("something went wrong adding session: ", error);
    }
}

function addTag(newTag: string) {
  const tag: Tag = { name: newTag };
  tags.value.push(tag);
  stores.tag.tags.push(tag);
}
</script>

<template>
  <form @submit.prevent>
    <h1>{{ editing ? "Edit " : "Add new" }} training session</h1>
    <label for="id_gym">Gym</label>
    <VueMultiselect
      id="id_gym"
      v-model="gym"
      :options="stores.gym.multiselect"
      placeholder=""
      label="gym"
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
        {{ option.city }}
        /
        <strong>{{ option.gym }}</strong>
      </template>
    </VueMultiselect>
    <FormFieldError :field="v$.gym" />
    <RouterLink :to="{ name: 'training-gym-new' }">Add new gym</RouterLink>
    <pre>{{ gym }}</pre>
    <FormInput
      v-model="date"
      label="Date"
      type="date"
      :validator="v$.date"
    />
    <label for="comment">Comment</label>
    <input
      id="comment"
      v-model="comment"
      type="text"
    />
    <label for="id_tags">Tags</label>
    <multiselect
      id="id_tags"
      v-model="tags"
      tag-placeholder="Add this as new tag"
      placeholder="Search or add a tag"
      label="name"
      track-by="name"
      :options="Object.values(stores.tag.tags)"
      tag-position="bottom"
      :multiple="true"
      :taggable="true"
      :clear-on-select="false"
      :close-on-select="true"
      :max-height="200"
      :hide-selected="true"
      @tag="addTag"
    />
    <pre>{{ tags }}</pre>
    <button @click="submit()">Add</button>
  </form>
</template>
