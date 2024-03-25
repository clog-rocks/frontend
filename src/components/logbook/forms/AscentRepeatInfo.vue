<script setup lang="ts">
import type { Ascent } from "@/types/logbook/ascent";

const props = defineProps<{ repeats: readonly Ascent[] }>();

const first = props.repeats[0];
const last =
  props.repeats.length > 2 ? props.repeats[props.repeats.length - 1] : null;
</script>

<template>
  <span>
    This is repeated ({{ repeats.length }}) ascent (original: {{ first.date
    }}{{ last ? `, latest: ${last.date}` : "" }}).
  </span>
</template>
