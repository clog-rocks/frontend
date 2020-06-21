<template>
  <transition name="fade" mode="out-in" appear>
    <div v-if="!dataRetrieved" class="data-loading">
      <Loading message="Fetching your climbing data, please wait…" />
    </div>
    <div v-else>
      <Summary />
    </div>
  </transition>
</template>

<script>
import { mapActions, mapState } from "vuex";

import Loading from "@/components/layout/Loading";
import Summary from "@/components/logbook/Summary";

export default {
  name: "LogbookGlance",
  components: { Summary, Loading },

  methods: {
    ...mapActions("core", ["TOGGLE_LOADING"]),
    ...mapActions("logbook", ["GET_DATA"]),
  },

  computed: {
    ...mapState("logbook", ["dataRetrieved"]),
  },

  mounted() {
    if (!this.dataRetrieved) {
      this.TOGGLE_LOADING();

      this.GET_DATA().then(() => {
        this.TOGGLE_LOADING();
      });
    }
  },
};
</script>
