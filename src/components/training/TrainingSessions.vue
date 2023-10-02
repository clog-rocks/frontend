<script setup lang="ts">
import { map, orderBy } from "lodash-es";
import { computed, ref } from "vue";

import { useTrainingSessionStore } from "@/stores";
import type { TrainingSession } from "@/types/training";

const sessionStore = useTrainingSessionStore();

const show = ref(true);

const sorted = computed(() =>
  orderBy(
    map(sessionStore.sessions, (session: TrainingSession) => session),
    ["date", "date_added"],
    ["desc", "desc"],
  ).slice(0, 5),
);

const deleteSession = async (id: number) => {
  try {
    await sessionStore.remove(id);
    return Promise.resolve();
  } catch (error) {
    console.log("Something went wrong deleting session.", error);
  }
};
</script>

<template>
  <section>
    <h1>Latest</h1>
    <span @click="show = !show">click to {{ show ? "hide" : "show" }}</span>
    <transition name="fade">
      <transition-group
        v-if="show"
        tag="ul"
        name="list"
        appear
      >
        <li
          v-for="session in sorted"
          :key="session.id"
          @click.exact="
            $router.push({
              name: 'training-session-edit',
              params: { sessionId: session.id },
            })
          "
          @click.alt="deleteSession(session.id)"
        >
          <pre>{{ session }}</pre>
        </li>
      </transition-group>
    </transition>
  </section>
</template>
