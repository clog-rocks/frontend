<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { ref, unref } from "vue";
import VueMultiselect from "vue-multiselect";

import FormFieldError from "@/components/layout/FormFieldError.vue";
import FormInput from "@/components/layout/FormInput.vue";
import router from "@/router";
import { useCoreCountryStore, useLogbookCragStore } from "@/stores";
import type { CragMultiselect, CragRequest } from "@/types/logbook";

const stores = {
  crag: useLogbookCragStore(),
  country: useCoreCountryStore(),
};

const country = ref<CragMultiselect>();
const name = ref<string>("");

const rules = {
  country: { required: helpers.withMessage("Country is required", required) },
  name: { required: helpers.withMessage("Crag is requried", required) },
};

const v$ = useVuelidate(rules, { country, name });

async function submit() {
  const formValid = await unref(v$).$validate();
  if (formValid && country.value) {
    const payload: CragRequest = {
      name: name.value,
      country: country.value.id,
    };

    try {
      const newCrag = await stores.crag.create(payload);
      router.push({
        name: "logbook-sector-new",
        params: { cragId: newCrag.id },
      });
    } catch (error) {
      console.log("Something went wrong submitting logbook/route.", error);
    }
  }
}
</script>

<template>
  <form @submit.prevent>
    <h1>Add new crag</h1>
    <label for="country">Country</label>
    <VueMultiselect
      id="country"
      v-model="country"
      :options="Object.values(stores.country.countries)"
      placeholder=""
      label="name"
      :allow-empty="false"
      :hide-selected="true"
      track-by="id"
      :options-limit="20"
    />
    <FormFieldError :field="v$.country" />
    <FormInput
      v-model="name"
      label="Crag"
      :validator="v$.name"
    />
    <button @click="submit()">Add new crag</button>
  </form>
</template>
