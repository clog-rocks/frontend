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
      <AscentItem
        v-for="ascent in lastFiveAscents"
        :key="ascent.id"
        :ascent="ascent"
      />
    </div>
  </transition>
</template>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import AscentItem from "@/components/logbook/AscentItem";
import LogbookCounters from "@/components/logbook/LogbookCounters";
import { useCoreStore } from "@/stores/core";
import { useLogbookStore } from "@/stores/logbook";

export default {
  name: "LogbookView",

  components: {
    AscentItem,
    LogbookCounters,
  },

  computed: {
    ...mapState(useLogbookStore, ["data", "dataRetrieved"]),
    ...mapWritableState(useCoreStore, ["loading"]),

    // Because data is an object we can't slice() it directly.
    lastFiveAscents: function() {
      return Object.values(this.data)
        .slice(-5);
    },
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
