<script setup lang="ts">
import { type CounterItemProps } from "@/types/generic";

const props = defineProps<CounterItemProps>();
</script>

<template>
  <div class="counter">
    <transition
      name="scale-fade"
      mode="out-in"
    >
      <div :key="props.value">
        <span class="counter value">
          {{ props.value }}
        </span>
        <span class="counter legend">
          {{ props.legend }}
        </span>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.counter {
  font-weight: 200;
  text-align: center;

  & .value {
    display: block;
    font-size: 2rem;
  }

  & .legend {
    position: relative;
    bottom: 0.6em;
    font-size: 0.75rem;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 4px;
  }
}
</style>
