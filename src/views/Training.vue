<template>
  <transition
    appear
    mode="out-in"
    name="fade"
  >
    <div v-if="!dataRetrieved">
      <Loading message="Fetching your training data, please wait…" />
    </div>
    <div v-else>
      <TrainingSessionForm />
      <Counters />
      <SessionsTable />
      <TopGymsTable />
    </div>
  </transition>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import Counters from "@/components/training/Counters";
import Loading from "@/components/layout/Loading";
import SessionsTable from "@/components/training/SessionsTable";
import TopGymsTable from "@/components/training/top-gyms/TopGymsTable";
import TrainingSessionForm from "@/components/training/forms/TrainingSessionForm.vue";

export default {
  name: "Training",

  components: {
    Counters,
    Loading,
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
