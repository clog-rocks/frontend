<template>
  <div class="data-loading">
    <p>{{ message }}</p>
    <v-progress-circular
      color="primary"
      indeterminate
      size="50"
      width="2"
    />
  </div>
</template>

<script>
export default {
  name: "LoadingOverlay",

  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.data-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 5;
  padding: 10px;
  font-size: 1.2rem;
  font-weight: 300;
  text-align: center;
  background: white;
  transform: translate(-50%, -50%);
}
</style>
