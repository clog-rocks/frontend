<template>
  <transition
    appear
    mode="out-in"
    name="fade"
  >
    <LoadingOverlay
      v-if="!dataRetrieved"
      message="Fetching your climbing data, please wait…"
    />
    <div v-else>
      <LogbookCounters />
    </div>
  </transition>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import LogbookCounters from "@/components/logbook/LogbookCounters";

export default {
  name: "LogbookView",

  components: {
    LogbookCounters,
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
