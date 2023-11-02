<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { reactive, unref } from "vue";
import VueMultiselect from "vue-multiselect";

import FormFieldError from "@/components/layout/FormFieldError.vue";
import FormInput from "@/components/layout/FormInput.vue";
import router from "@/router";
import { useCoreCountryStore, useLogbookCragStore } from "@/stores";
import type { Country } from "@/types/core";
import type { CragRequest } from "@/types/logbook";

const stores = {
  crag: useLogbookCragStore(),
  country: useCoreCountryStore(),
};

type Form = Omit<CragRequest, "country"> & { country: Country | undefined };

const form: Form = reactive({
  country: undefined,
  name: "",
});

const rules = {
  country: { required: helpers.withMessage("Country is required", required) },
  name: { required: helpers.withMessage("Crag is requried", required) },
};

const v$ = useVuelidate(rules, form);

async function submit() {
  const formValid = await unref(v$).$validate();
  if (formValid) {
    const payload: CragRequest = {
      name: form.name,
      country: form.country!.id,
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
      v-model="form.country"
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
      v-model="form.name"
      label="Crag"
      :validator="v$.name"
    />
    <button @click="submit()">Add new crag</button>
  </form>
</template>
