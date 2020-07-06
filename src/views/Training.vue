<template>
  <transition
    appear
    mode="out-in"
    name="fade"
  >
    <Loading
      v-if="!dataRetrieved"
      message="Fetching your training data, please wait…"
    />
    <div v-else>
      <Counters />
      <SessionsTable />
      <TopGymsTable />
    </div>
  </transition>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import Counters from "@/components/training/Counters";
import SessionsTable from "@/components/training/SessionsTable";
import TopGymsTable from "@/components/training/top-gyms/TopGymsTable";

export default {
  name: "Training",

  components: {
    SessionsTable,
    TopGymsTable,
    Counters,
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
