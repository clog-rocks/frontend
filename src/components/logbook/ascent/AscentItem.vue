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
      <div class="location">
        {{ props.ascent.route.sector.crag.country.name }} /
        {{ props.ascent.route.sector.crag.name }} /
        {{ props.ascent.route.sector.name }}
      </div>
      <div class="route">
        <div>{{ props.ascent.route.name }}</div>
        <span
          v-if="props.ascent.personal_grade"
          class="grade"
        >
          {{ props.ascent.personal_grade.fr_route }}
        </span>
        <div :class="['grade', { striken: props.ascent.personal_grade }]">
          {{ props.ascent.route.grade.fr_route }}
        </div>
        <span v-if="props.ascent.quality">
          {{ "&#9734;".repeat(props.ascent.quality) }}
        </span>
        <span v-if="props.ascent.recommended"> &#9825; </span>
        <span v-if="props.ascent.first_ascent">First ascent</span>
      </div>
    </div>
    <div class="comment">{{ props.ascent.comment }}</div>
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
  display: grid;
  gap: 1ch;
  padding: 0.25em;

  .style {
    font-size: 1.15em;
    font-weight: 300;

    &.repeat {
      font-size: 0.85em;
    }
  }

  .route-section {
    letter-spacing: 1px;

    .location {
      font-size: 0.75em;
    }

    .route {
      display: flex;
      flex-wrap: wrap;
      gap: 0 0.75em;

      .grade {
        &.striken {
          text-decoration: line-through 1px;
        }
      }
    }
  }

  .actions {
    font-size: 0.75em;
  }

  @container ascents (width >=700px) {
    grid-template-columns: 5ch 40ch auto auto;
    align-items: center;

    .style {
      display: flex;
      justify-content: center;
    }

    .comment {
      text-wrap: pretty;
    }

    .actions {
      margin-inline: auto 0;
    }

    &:hover,
    &:active {
      background-color: var(--surface3);
    }
  }
}

.ascent ~ .ascent {
  margin-top: 1.5em;
}
</style>
