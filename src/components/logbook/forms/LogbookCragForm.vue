<script setup lang="ts">
import { ref } from "vue";
import VueMultiselect from "vue-multiselect";

import router from "@/router";
import { useCoreCountryStore, useLogbookCragStore } from "@/stores";
import { type CragMultiselect, type CragRequest } from "@/types/logbook";

const stores = {
  crag: useLogbookCragStore(),
  country: useCoreCountryStore(),
};

const country = ref<CragMultiselect>();
const name = ref<string>();

const submit = async function () {
  // TODO: validate
  if (!name.value || !country.value) return;

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
};
</script>

<template>
  <form @submit.prevent>
    <p class="thin-header">Add new crag</p>
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
    <pre>{{ country }}</pre>
    <label>
      Crag
      <input
        v-model="name"
        type="text"
        autocorrect="off"
        spellcheck="false"
        required
      />
    </label>
    <button @click="submit()">Add new crag</button>
  </form>
</template>
