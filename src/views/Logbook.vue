<template>
  <transition
    appear
    mode="out-in"
    name="fade"
  >
    <Loading
      v-if="!dataRetrieved"
      message="Fetching your climbing data, please wait…"
    />
    <div v-else>
      <Counters />
    </div>
  </transition>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import Ascent from "@/components/logbook/Ascent";
import Counters from "@/components/logbook/Counters";

export default {
  name: "Logbook",

  components: {
    Counters,
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
