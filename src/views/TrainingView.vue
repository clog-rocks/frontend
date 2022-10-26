<script setup lang="ts">
import { onMounted } from "vue";

// import TrainingSessionForm from "@/components/training/forms/TrainingSessionForm.vue";
// import TopGymsTable from "@/components/training/top-gyms/TopGymsTable.vue";
import TrainingCounters from "@/components/training/TrainingCounters.vue";
import TrainingSessions from "@/components/training/TrainingSessions.vue";
import { useCoreStore, useTrainingStore } from "@/stores";

const trainingStore = useTrainingStore();
const coreStore = useCoreStore();

onMounted(async () => {
  if (!trainingStore.status.fetched) {
    await trainingStore.fetch();
  }
  if (!coreStore.status.fetched) {
    await coreStore.fetch();
  }
});
</script>

<template>
  <section>
    <transition
      name="fade"
      mode="out-in"
    >
      <p v-if="trainingStore.status.fetching">
        Fetching your training sessions, please wait…
      </p>
      <div
        v-else-if="trainingStore.status.fetched && trainingStore.hasSessions"
      >
        <TrainingCounters />
        <!-- <TrainingSessionForm /> -->
        <button @click="trainingStore.addSessionDummy">add session</button>
        <TrainingSessions />
        <div class="thin-header">Top gyms</div>
        <!-- <TopGymsTable /> -->
      </div>
      <h3
        v-else-if="trainingStore.status.fetched && !trainingStore.hasSessions"
      >
        Add your first session!
        <button @click="trainingStore.addSessionDummy">add session</button>
      </h3>
    </transition>
  </section>
</template>
