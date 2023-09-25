<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { ref, unref } from "vue";
import VueMultiselect from "vue-multiselect";

import FormFieldError from "@/components/layout/FormFieldError.vue";
import FormInput from "@/components/layout/FormInput.vue";
import router from "@/router";
import { useCoreCityStore } from "@/stores/core/city";
import { useCoreCountryStore } from "@/stores/core/country";
import type { Country } from "@/types/core";

const city = ref<string>("");
const country = ref<Country>();

const stores = {
  city: useCoreCityStore(),
  country: useCoreCountryStore(),
};

const rules = {
  country: { required: helpers.withMessage("Country is required", required) },
  city: { required: helpers.withMessage("City is required", required) },
};

const v$ = useVuelidate(rules, { city, country });

async function submit() {
  const formValid = await unref(v$).$validate();
  if (formValid && country.value)
    try {
      const newCity = await stores.city.create({
        name: city.value,
        country: country.value.id,
      });

      router.push({
        name: "training-gym-new",
        params: { cityId: newCity.id },
      });
    } catch (error) {
      console.log("Something went wrong submitting core/city: ", error);
    }
}
</script>

<template>
  <form @submit.prevent>
    <h1>Add new city</h1>
    <label for="id_country">Country</label>
    <VueMultiselect
      id="id_country"
      v-model="country"
      :options="Object.values(stores.country.countries)"
      placeholder=""
      label="name"
      :allow-empty="false"
      :hide-selected="true"
      track-by="id"
    />
    <FormFieldError :field="v$.country" />
    <FormInput
      v-model="city"
      label="City"
      :validator="v$.city"
    />
    <button @click="submit()">Add</button>
  </form>
</template>
