<template>
  <transition
    appear
    mode="out-in"
    name="fade"
  >
    <LoadingOverlay
      v-if="!dataRetrieved"
      message="Fetching your training data, please wait…"
    />
    <div v-else>
      <TrainingCounters />
      <div class="thin-header">
        Training sessions
      </div>
      <TrainingSessionForm />
      <SessionsTable />
      <div class="thin-header">
        Top gyms
      </div>
      <TopGymsTable />
    </div>
  </transition>
</template>

<script>
import { mapActions, mapState } from "vuex";
import SessionsTable from "@/components/training/SessionsTable";
import TopGymsTable from "@/components/training/top-gyms/TopGymsTable";
import TrainingCounters from "@/components/training/TrainingCounters";
import TrainingSessionForm from "@/components/training/forms/TrainingSessionForm.vue";
import { mapWritableState } from "pinia";
import { useCoreStore } from "@/stores/core";

export default {
  name: "TrainingView",

  components: {
    TrainingCounters,
    SessionsTable,
    TopGymsTable,
    TrainingSessionForm,
  },

  computed: {
    ...mapState("training", ["dataRetrieved"]),
    ...mapWritableState(useCoreStore, ["loading"]),
  },

  mounted: function() {
    if (!this.dataRetrieved) {
      this.loading = true;

      this.GET_DATA()
        .then(() => {
          this.loading = false;
        });
    }
  },

  methods: {
    ...mapActions("training", ["GET_DATA"]),
  },
};
</script>
