<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { reactive, unref } from "vue";
import VueMultiselect from "vue-multiselect";

import FormFieldError from "@/components/layout/FormFieldError.vue";
import FormInput from "@/components/layout/FormInput.vue";
import router from "@/router";
import { useTrainingGymStore } from "@/stores";
import { useCoreCityStore } from "@/stores/core/city";
import type { CityMultiselect } from "@/types/core";
import type { GymRequest } from "@/types/training";

const props = defineProps<{ cityId?: number }>();

const stores = {
  gym: useTrainingGymStore(),
  city: useCoreCityStore(),
};

type Form = Omit<GymRequest, "city"> & { city: CityMultiselect | undefined };

const form: Form = reactive({
  city: props.cityId
    ? stores.city.multiselect.find((gym) => gym.id == props.cityId)
    : undefined,
  name: "",
});

const rules = {
  city: { required: helpers.withMessage("City is required", required) },
  name: { required: helpers.withMessage("Gym is required", required) },
};

const v$ = useVuelidate(rules, form);

const submit = async function () {
  const formValid = await unref(v$).$validate();
  if (!formValid) return;
  try {
    const newGym = await stores.gym.create({
      name: form.name,
      city: form.city!.id,
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
    <label for="id_city">City</label>
    <VueMultiselect
      id="id_city"
      v-model="form.city"
      :options="stores.city.multiselect"
      placeholder=""
      label="route"
      :allow-empty="false"
      :hide-selected="true"
      track-by="id"
      :required="true"
      :options-limit="20"
    >
      <template
        v-for="slotName in ['option', 'singleLabel']"
        #[slotName]="{ option }"
        :key="slotName"
      >
        {{ option.country }} / <strong>{{ option.name }}</strong>
      </template>
    </VueMultiselect>
    <FormFieldError :field="v$.city" />
    <RouterLink :to="{ name: 'core-city-new' }">Add new city</RouterLink>
    <FormInput
      v-model="form.name"
      label="Gym"
      :validator="v$.name"
    />
    <button @click="submit()">Add new gym</button>
  </form>
</template>
