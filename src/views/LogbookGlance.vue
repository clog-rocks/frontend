<template>
  <div>
    <Navbar />
    <div v-if="!DATA_RETRIEVED" class="data-loading">
      Fetching your data, please wait…
    </div>
    <GlanceSummary />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Navbar from "@/components/layout/Navbar";
import GlanceSummary from "@/components/logbook/GlanceSummary";

export default {
  name: "LogbookGlance",
  components: { Navbar, GlanceSummary },

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
