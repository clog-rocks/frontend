<template>
  <transition name="fade" mode="out-in" appear>
    <div v-if="!dataRetrieved" class="data-loading">
      Fetching your training data, please wait…
    </div>
    <div v-else>
      <h1>Placeholder</h1>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Training",
  components: {},

  methods: {
    ...mapActions("core", ["TOGGLE_LOADING"]),
    ...mapActions("training", ["GET_DATA"]),
  },

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
};
</script>
