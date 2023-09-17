<script setup lang="ts">
const props = defineProps<{
  field: any;
}>();
</script>

<template>
  <div
    v-for="error of props.field.$errors"
    :key="error.$uid"
  >
    <small>{{ error.$message }}</small>
  </div>
</template>

<style scoped>
small {
  padding-bottom: 0.25rem;
  font-size: 0.75rem;
  color: red;
}
</style>
