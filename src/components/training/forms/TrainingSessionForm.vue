<script setup lang="ts">
import { onMounted, type Ref, ref, watchEffect } from "vue";
import VueMultiselect from "vue-multiselect";
import Multiselect from "vue-multiselect";
import { useRouter } from "vue-router";

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

let editing = false;
let session: TrainingSession;

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

const submit = async function () {
  // TODO: validate
  if (!gym.value) return;

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
};

const addTag = function (newTag: string) {
  const tag: Tag = { name: newTag };
  tags.value.push(tag);
  stores.tag.tags.push(tag);
};
</script>

<template>
  <form @submit.prevent>
    <h1>{{ editing ? "Edit " : "Add new" }} training session</h1>
    <label for="gym">Gym</label>
    <VueMultiselect
      id="gym"
      v-model="gym"
      :options="stores.gym.multiselect"
      placeholder=""
      label="gym"
      :allow-empty="false"
      :hide-selected="true"
      track-by="id"
      :options-limit="20"
    >
      <template #singleLabel="{ option }">
        {{ option.country }}
        /
        {{ option.city }}
        /
        <strong>{{ option.gym }}</strong>
      </template>
      <template #option="{ option }">
        {{ option.country }}
        /
        {{ option.city }}
        /
        <strong>{{ option.gym }}</strong>
      </template>
    </VueMultiselect>
    <RouterLink :to="{ name: 'training-gym-new' }">Add new gym</RouterLink>
    <pre>{{ gym }}</pre>
    <label>
      Date
      <input
        v-model="date"
        required
        type="date"
      />
    </label>
    <label for="comment">Comment</label>
    <input
      id="comment"
      v-model="comment"
      type="text"
    />
    <label for="tags">Tags</label>
    <multiselect
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
