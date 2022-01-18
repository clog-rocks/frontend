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
import { mapActions, mapState } from "vuex";
import LogbookCounters from "@/components/logbook/LogbookCounters";
import { mapWritableState } from "pinia";
import { useCoreStore } from "@/stores/core";

export default {
  name: "LogbookView",

  components: {
    LogbookCounters,
  },

  computed: {
    ...mapState("logbook", ["dataRetrieved"]),
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
    ...mapActions("logbook", ["GET_DATA"]),
  },
};
</script>
