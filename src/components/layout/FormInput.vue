<script setup lang="ts">
import FormFieldError from "@/components/layout/FormFieldError.vue";

const modelValue = defineModel<string>();
const props = defineProps({
  autocomplete: { type: String, default: "off" },
  label: { type: String, required: true },
  type: { type: String, default: "text" },
  validator: { type: Object, required: true },
});
</script>

<template>
  <label>
    {{ props.label }}
    <input
      v-model="modelValue"
      :autocomplete="props.autocomplete"
      :class="{ 'has-errors': props.validator.$error }"
      :type="props.type"
    />
  </label>
  <FormFieldError :field="validator" />
</template>

<style scoped>
.has-errors {
  border-color: red;
}
</style>
