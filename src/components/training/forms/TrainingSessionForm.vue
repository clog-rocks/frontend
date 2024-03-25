<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { onMounted, reactive, ref, unref, watch } from "vue";
import VueMultiselect from "vue-multiselect";
import Multiselect from "vue-multiselect";
import { useRouter } from "vue-router";

import FormDateShortcuts from "@/components/layout/FormDateShortcuts.vue";
import FormFieldError from "@/components/layout/FormFieldError.vue";
import FormInput from "@/components/layout/FormInput.vue";
import {
  useTrainingGymStore,
  useTrainingSessionStore,
  useTrainingTagStore,
} from "@/stores";
import type { Tag } from "@/types/generic";
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

type Form = Omit<TrainingSessionRequest, "gym" | "tags"> & {
  gym: GymMultiselect | undefined;
  tags: Tag[];
};

const form: Form = reactive({
  gym: props.gymId ? getGym(props.gymId) : undefined,
  date: new Date().toISOString().split("T")[0],
  comment: undefined,
  tags: [],
});

const rules = {
  gym: { required: helpers.withMessage("Gym is required", required) },
  date: { required: helpers.withMessage("Date is required", required) },
};

const editing = ref(false);
let session: TrainingSession;

const v$ = useVuelidate(rules, form);

onMounted(async () => {
  await stores.tag.fetch();
});

watch(
  () => props.sessionId,
  () => {
    if (!props.sessionId) return;
    session = stores.session.sessions[props.sessionId];
    if (!session) return;
    editing.value = true;
    form.gym = getGym(session.gym);
    form.date = session.date;
    form.tags = session.tags.map((tag) => ({ name: tag }));
    form.comment = session.comment || undefined;
  },
  { immediate: true },
);

async function submit() {
  const formValid = await unref(v$).$validate();
  if (formValid)
    try {
      // Need to check if editing or creating new one.
      const payload: TrainingSessionRequest = {
        gym: form.gym!.id,
        date: form.date,
        comment: form.comment,
        tags: form.tags.map((tag) => tag.name),
      };

      if (editing.value) {
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
  form.tags.push(tag);
  stores.tag.tags.push(tag);
}
</script>

<template>
  <form @submit.prevent>
    <h1>{{ editing ? "Edit " : "Add new" }} training session</h1>
    <label for="id_gym">Gym</label>
    <VueMultiselect
      id="id_gym"
      v-model="form.gym"
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
    <FormInput
      v-model="form.date"
      label="Date"
      type="date"
      :validator="v$.date"
    />
    <FormDateShortcuts v-model="form.date" />
    <label for="comment">Comment</label>
    <input
      id="comment"
      v-model="form.comment"
      type="text"
    />
    <label for="id_tags">Tags</label>
    <multiselect
      id="id_tags"
      v-model="form.tags"
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
    <button @click="submit()">
      {{ editing ? "Save changes" : "Add new session" }}
    </button>
  </form>
</template>
