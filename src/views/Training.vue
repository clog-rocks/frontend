<template>
  <transition name="fade" mode="out-in" appear>
    <div v-if="!dataRetrieved">
      <Loading message="Fetching your training data, please wait…" />
    </div>
    <div v-else>
      <Summary />
      <SessionsTable />
      <Table />
    </div>
  </transition>
</template>

<script>
import { mapActions, mapState } from "vuex";

import Loading from "@/components/layout/Loading";
import Summary from "@/components/training/Summary";
import SessionsTable from "@/components/training/SessionsTable";
import Table from "@/components/training/top-gyms/Table";

export default {
  name: "Training",

  components: { Loading, SessionsTable, Summary, Table },

  computed: {
    ...mapState("training", ["dataRetrieved"]),
  },

  mounted() {
    if (!this.dataRetrieved) {
      this.TOGGLE_LOADING();

      this.GET_DATA().then(() => {
        this.TOGGLE_LOADING();
      });
    }
  },

  methods: {
    ...mapActions("core", ["TOGGLE_LOADING"]),
    ...mapActions("training", ["GET_DATA"]),
  },
};
</script>
