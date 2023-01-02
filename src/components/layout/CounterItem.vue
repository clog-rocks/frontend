<script setup lang="ts">
const props = defineProps<{
  value: number | string;
  legend: string;
}>();
</script>

<template>
  <div class="counter">
    <transition
      name="scale-fade"
      mode="out-in"
    >
      <div :key="props.value">
        <span class="counter__value">
          {{ props.value }}
        </span>
        <span class="counter__legend">
          {{ props.legend }}
        </span>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.counter {
  font-weight: 200;
  text-align: center;

  &__value {
    display: block;
    font-size: 2rem;
  }

  &__legend {
    position: relative;
    bottom: 0.6em;
    font-size: 0.75rem;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 4px;
  }
}
</style>
