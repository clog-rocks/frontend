<template>
  <transition
    appear
    mode="out-in"
    name="fade"
  >
    <div v-if="!dataRetrieved">
      <Loading message="Fetching your climbing data, please wait…" />
    </div>
    <div v-else>
      <Counters />
    </div>
  </transition>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import Counters from "@/components/logbook/Counters";
import Loading from "@/components/layout/Loading";

export default {
  name: "Logbook",

  components: {
    Counters,
    Loading,
  },

  computed: { ...mapState("logbook", ["dataRetrieved"]) },

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
    ...mapActions("logbook", ["GET_DATA"]),
    ...mapMutations("core", ["LOADING_START", "LOADING_STOP"]),
  },
};
</script>
