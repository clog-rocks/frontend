<script setup lang="ts">
import { isToday } from "date-fns/isToday";
import { isYesterday } from "date-fns/isYesterday";

const props = defineProps<{ date: string }>();

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const date = new Date(props.date);
let display = props.date;
if (isYesterday(date)) display = "Yesterday";
if (isToday(date)) display = "Today";
const showDay = !["Yesterday", "Today"].includes(display);
</script>

<template>
  <div class="ascent-date-group-header">
    <p>{{ display }}</p>
    <p v-if="showDay">{{ weekday[date.getDay()] }}</p>
  </div>
</template>

<style scoped>
.ascent-date-group-header {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  letter-spacing: 1px;

  p:nth-of-type(2) {
    font-size: 0.75rem;
  }
}
</style>
