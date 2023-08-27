<script setup lang="ts">
import { type Ref, ref } from "vue";
import VueMultiselect from "vue-multiselect";

import router from "@/router";
import { useTrainingGymStore } from "@/stores";
import { useCoreCityStore } from "@/stores/core/city";
import { type CityMultiselect } from "@/types/core";

const props = defineProps<{ cityId?: number }>();

const stores = {
  gym: useTrainingGymStore(),
  city: useCoreCityStore(),
};

const city: Ref<CityMultiselect | undefined> = ref(
  props.cityId
    ? stores.city.multiselect.find((gym) => gym.id == props.cityId)
    : undefined,
);
const gym = ref<string>();

const submit = async function () {
  // TODO: validate
  if (!city.value || !gym.value) return;

  try {
    const newGym = await stores.gym.create({
      name: gym.value,
      city: city.value.id,
    });
    router.push({
      name: "training-session-new",
      params: { gymId: newGym.id },
    });
  } catch (error) {
    console.log("Something went wrong submitting training/gym.", error);
  }
};
</script>

<template>
  <form @submit.prevent>
    <h1>Add new climbing gym</h1>
    <label for="route">City</label>
    <VueMultiselect
      id="route"
      v-model="city"
      :options="stores.city.multiselect"
      placeholder=""
      label="route"
      :allow-empty="false"
      :hide-selected="true"
      track-by="id"
      :options-limit="20"
    >
      <template #singleLabel="{ option }">
        {{ option.country }} / <strong>{{ option.name }}</strong>
      </template>
      <template #option="{ option }">
        {{ option.country }} / <strong>{{ option.name }}</strong>
      </template>
    </VueMultiselect>
    <RouterLink :to="{ name: 'core-city-new' }">Add new city</RouterLink>
    <pre>{{ city }}</pre>
    <label>
      Gym
      <input
        v-model="gym"
        type="text"
        autocorrect="off"
        spellcheck="false"
        required
      />
    </label>
    <button @click="submit()">Add</button>
  </form>
</template>
