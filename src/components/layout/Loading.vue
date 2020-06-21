<template>
  <div class="data-loading">
    <p>{{ message }}</p>
    <v-progress-circular size="50" width="2" color="primary" indeterminate />
  </div>
</template>

<script>
export default {
  name: "Loading",

  props: { message: { type: String, required: true } },
};
</script>
