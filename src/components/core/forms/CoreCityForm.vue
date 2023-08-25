<script setup lang="ts">
import { ref } from "vue";
import VueMultiselect from "vue-multiselect";

import router from "@/router";
import { useCoreCityStore } from "@/stores/core/city";
import { useCoreCountryStore } from "@/stores/core/country";
import { type Country } from "@/types/core";

const city = ref<string>();
const country = ref<Country>();

const stores = {
  city: useCoreCityStore(),
  country: useCoreCountryStore(),
};

const submit = async function () {
  // TODO: validate
  if (!city.value || !country.value) return;

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
};
</script>

<template>
  <div>
    <p class="thin-header">New city</p>
    <label>Country</label>
    <VueMultiselect
      id="route"
      v-model="country"
      :options="Object.values(stores.country.countries)"
      placeholder=""
      label="name"
      :allow-empty="false"
      :hide-selected="true"
      track-by="id"
    />
    <pre>{{ country }}</pre>
    <label>City</label>
    <input
      id="city"
      v-model="city"
      type="text"
      autocorrect="off"
      spellcheck="false"
      required
    />
    <button @click="submit()">Add</button>
  </div>
</template>
