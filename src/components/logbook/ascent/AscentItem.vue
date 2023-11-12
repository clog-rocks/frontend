<script setup lang="ts">
import router from "@/router";
import { useLogbookAscentStore } from "@/stores";
import type { AscentTree } from "@/types/logbook/ascent";

const props = defineProps<{ ascent: AscentTree }>();

const ascentStore = useLogbookAscentStore();

const actions = {
  delete: async function () {
    try {
      await ascentStore.remove(props.ascent.id);
      return Promise.resolve();
    } catch (error) {
      console.log("Something went wrong deleting logbook/ascent.", error);
    }
  },
  edit: function () {
    router.push({
      name: "logbook-ascent-edit",
      params: { ascentId: props.ascent.id },
    });
  },
  repeat: function () {
    router.push({
      name: "logbook-ascent-repeat",
      params: { routeId: props.ascent.route.id },
    });
  },
};
</script>

<template>
  <div class="ascent">
    <div :class="['style', { repeat: props.ascent.repeat }]">
      {{ props.ascent.repeat ? "repeat" : props.ascent.style.shorthand }}
    </div>
    <div class="route-section">
      <span class="location">
        {{ props.ascent.route.sector.crag.country.name }} /
        {{ props.ascent.route.sector.crag.name }} /
        {{ props.ascent.route.sector.name }}
      </span>
      <div class="route">
        <span class="name">{{ props.ascent.route.name }}</span>
        <span class="grade">{{ props.ascent.route.grade.fr_route }}</span>
        <span
          v-if="props.ascent.quality"
          class="quality"
        >
          {{ "&#9734;".repeat(props.ascent.quality) }}
        </span>
        <span
          v-if="props.ascent.recommended"
          class="recommended"
        >
          &#9825;
        </span>
      </div>
    </div>
    <div class="actions">
      <button
        class="button-small"
        @click.exact="actions.repeat()"
      >
        repeat
      </button>
      <button
        class="button-small"
        @click.exact="actions.edit()"
      >
        edit
      </button>
      <button
        class="button-small"
        @click.alt="actions.delete()"
      >
        delete
      </button>
    </div>
  </div>
</template>

<style scoped>
.ascent {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  padding: 6px 0;

  .style {
    display: flex;
    justify-content: center;
    min-width: 3rem;
    font-size: 1.15rem;
    font-weight: 300;

    &.repeat {
      font-size: 0.6rem;
    }
  }

  .route-section {
    display: flex;
    flex-direction: column;
    letter-spacing: 1px;

    .location {
      font-size: 0.6rem;
    }

    .route {
      display: flex;
      gap: 0.75rem;
    }
  }

  .actions {
    display: flex;
    margin-left: auto;
    font-size: 0.75rem;
    opacity: 0;
  }

  &:hover,
  &:active {
    .actions {
      opacity: 1;
    }
  }
}
</style>
