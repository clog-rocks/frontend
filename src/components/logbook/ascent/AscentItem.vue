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
    <div class="route-section">
      <div class="route">
        <div class="route-name">{{ props.ascent.route.name }}</div>
        <span
          v-if="props.ascent.personal_grade"
          class="grade"
        >
          {{ props.ascent.personal_grade.fr_route }}
        </span>
        <div :class="['grade', { striken: props.ascent.personal_grade }]">
          {{ props.ascent.route.grade.fr_route }}
        </div>
        <div>
          {{ props.ascent.repeat ? "R" : props.ascent.style.shorthand }}
        </div>
        <span v-if="props.ascent.quality">
          {{ "&#9734;".repeat(props.ascent.quality) }}
        </span>
        <span v-if="props.ascent.recommended">&#9825; </span>
        <span v-if="props.ascent.first_ascent">First ascent</span>
      </div>
      <div
        v-if="props.ascent.comment"
        class="comment"
      >
        {{ props.ascent.comment }}
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
  gap: 1ch;

  .route-section {
    letter-spacing: 1px;

    .location {
      font-size: 0.75em;
    }

    .route {
      display: flex;
      flex-wrap: wrap;
      gap: 0 0.75em;

      .route-name {
        font-weight: 400;
      }

      .grade {
        &.striken {
          text-decoration: line-through 1px;
        }
      }
    }

    .comment {
      text-wrap: pretty;
      font-size: 0.75rem;
      font-style: italic;
      font-weight: 300;
      text-wrap: pretty;

      &::before {
        content: "\203A  ";
      }
    }
  }

  @container ascents (width >= 700px) {
    display: flex;

    .actions {
      display: none;
    }

    &:hover,
    &:active {
      .actions {
        display: flex;
      }
    }
  }
}
</style>
