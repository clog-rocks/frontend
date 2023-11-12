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
    <div class="date">
      {{ props.session.date }}
    </div>
    <div class="gym-section">
      <span class="location">
        {{ props.session.gym.city.country.name }} /
        {{ props.session.gym.city.name }}
      </span>
      <span class="gym">
        {{ props.session.gym.name }}
      </span>
    </div>
    <div class="info">
      <span
        v-if="props.session.comment"
        class="comment"
      >
        {{ props.session.comment }}
      </span>
      <div class="tags">
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
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    font-family: "Courier New", Courier, monospace;
    font-size: 1.1em;
    text-wrap: nowrap;
  }

  .gym-section {
    display: flex;
    flex-direction: inherit;
    align-items: center;
    align-items: flex-start;
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
      gap: 0.1em;
      align-content: center;

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

  @media (width > 700px) {
    position: relative;
    flex-direction: row;
    gap: 1.5em;
    align-items: center;
    padding-left: 0.25em;

    .gym-section {
      flex-direction: column;
      align-items: flex-start;
      min-width: 10em;
    }

    .actions {
      position: absolute;
      right: 0.5em;
      display: none;
      margin: 0 auto;
    }

    &:hover,
    &:active {
      .actions {
        display: inline;
      }
    }
  }
}

.session ~ .session {
  margin-top: 1.5em;
}
</style>
