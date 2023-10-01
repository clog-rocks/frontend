<script setup lang="ts">
import { type CounterItemProps } from "@/types/generic";

const props = defineProps<CounterItemProps>();
</script>

<template>
  <transition
    name="scale-fade"
    mode="out-in"
  >
    <div
      :key="props.value"
      class="counter"
    >
      <span class="value">{{ props.value }}</span>
      <span class="legend">{{ props.legend }}</span>
    </div>
  </transition>
</template>
