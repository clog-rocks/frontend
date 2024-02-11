<script setup lang="ts">
import router from "@/router";
import { useTrainingSessionStore } from "@/stores";
import type { TrainingSessionTree } from "@/types/training";

const props = defineProps<{ session: TrainingSessionTree }>();

const trainingStore = useTrainingSessionStore();

const actions = {
  delete: async function () {
    try {
      await trainingStore.remove(props.session.id);
      return Promise.resolve();
    } catch (error) {
      console.log("Something went wrong deleting training/session.", error);
    }
  },
  edit: function () {
    router.push({
      name: "training-session-edit",
      params: { sessionId: props.session.id },
    });
  },
  repeat: function () {
    router.push({
      name: "training-session-repeat",
      params: { routeId: props.session.id },
    });
  },
};
</script>

<template>
  <div class="session">
    <div>{{ props.session.date }}</div>
    <div class="gym-section">
      <div class="location">
        {{ props.session.gym.city.country.name }} /
        {{ props.session.gym.city.name }}
      </div>
      <div>{{ props.session.gym.name }}</div>
    </div>
    <div class="info">
      <div
        v-if="props.session.comment"
        class="comment"
      >
        {{ props.session.comment }}
      </div>
      <div
        v-if="props.session.tags.length > 0"
        class="tags"
      >
        <span
          v-for="tag in props.session.tags"
          :key="tag"
          class="tag"
        >
          {{ tag }}
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
.session {
  display: grid;
  gap: 1ch;

  .gym-section {
    letter-spacing: 1px;

    .location {
      font-size: 0.75em;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 0.2em;

    .comment {
      font-size: 0.9em;
      font-style: italic;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25em;

      .tag {
        padding: 2px 4px;
        font-size: 0.75em;
        color: var(--text1);
        letter-spacing: 1px;
        background-color: var(--surface1);
      }
    }
  }

  .actions {
    font-size: 0.75rem;
  }

  @container trainingsessions (width >=700px) {
    grid-template-columns: 10ch 20ch auto;
    align-items: center;

    .actions {
      position: absolute;
      right: 0.5em;
      display: none;
    }

    &:hover,
    &:active {
      .actions {
        display: block;
      }
    }
  }
}

.session ~ .session {
  margin-top: 1.5em;
}
</style>
