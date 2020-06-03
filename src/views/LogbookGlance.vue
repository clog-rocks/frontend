<template>
  <div>
    <div v-if="!DATA_RETRIEVED" class="data-loading">
      Fetching your data, please wait…
    </div>
    <GlanceSummary />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import GlanceSummary from "@/components/logbook/GlanceSummary";

export default {
  name: "LogbookGlance",
  components: { GlanceSummary },

  methods: {
    ...mapActions("core", ["TOGGLE_LOADING"]),
    ...mapActions("logbook", ["GET_DATA"]),
  },

  computed: {
    ...mapGetters("logbook", ["DATA_RETRIEVED"]),
  },

  mounted() {
    if (!this.DATA_RETRIEVED) {
      this.TOGGLE_LOADING();

      this.GET_DATA().then(() => {
        this.TOGGLE_LOADING();
      });
    }
  },
};
</script>

<style scoped>
.data-loading {
  position: fixed;
  text-align: center;
  top: 50%;
  left: 50%;
  font-size: 1.5rem;
  transform: translate(-50%, -50%);
  font-family: "Roboto", sans-serif;
  font-weight: 300;
}
</style>
