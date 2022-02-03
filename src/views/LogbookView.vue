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
import { mapActions, mapState, mapWritableState } from "pinia";
import LogbookCounters from "@/components/logbook/LogbookCounters";
import { useCoreStore } from "@/stores/core";
import { useLogbookStore } from "@/stores/logbook";

export default {
  name: "LogbookView",

  components: {
    LogbookCounters,
  },

  computed: {
    ...mapState(useLogbookStore, ["dataRetrieved"]),
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
    ...mapActions(useLogbookStore, ["GET_DATA"]),
  },
};
</script>
