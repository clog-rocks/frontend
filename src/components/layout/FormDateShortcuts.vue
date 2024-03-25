<script setup lang="ts">
import { formatISO, previousSaturday, previousSunday, subDays } from "date-fns";

const iso = (date: Date) => formatISO(date, { representation: "date" });

const modelValue = defineModel<string>();
const date = new Date();
const today = date.toISOString().split("T")[0];
const yesterday = iso(subDays(date, 1));
const saturday = iso(previousSaturday(date));
const sunday = iso(previousSunday(date));
</script>

<template>
  <div>
    <span class="not-link">last:</span>
    <span @click="modelValue = saturday">Saturday,</span>
    <span @click="modelValue = sunday">Sunday</span>
    <span class="not-link">or</span>
    <span @click="modelValue = yesterday">yesterday,</span>
    <span @click="modelValue = today">today</span>
  </div>
</template>

<style scoped>
div {
  display: flex;
  gap: 0.75ch;
  font-size: 0.75rem;

  span:not(.not-link):hover {
    text-decoration: underline;
  }
}
</style>
