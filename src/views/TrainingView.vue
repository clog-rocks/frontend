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
      <TrainingSessionForm />
      <TrainingCounters />
      <SessionsTable />
      <TopGymsTable />
    </div>
  </transition>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import SessionsTable from "@/components/training/SessionsTable";
import TopGymsTable from "@/components/training/top-gyms/TopGymsTable";
import TrainingCounters from "@/components/training/TrainingCounters";
import TrainingSessionForm from "@/components/training/forms/TrainingSessionForm.vue";

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
  },

  mounted: function() {
    if (!this.dataRetrieved) {
      this.LOADING_START();

      this.GET_DATA()
        .then(() => {
          this.LOADING_STOP();
        });
    }
  },

  methods: {
    ...mapActions("training", ["GET_DATA"]),
    ...mapMutations("core", ["LOADING_START", "LOADING_STOP"]),
  },
};
</script>
