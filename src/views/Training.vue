<template>
  <transition name="fade" mode="out-in" appear>
    <div v-if="!DATA_RETRIEVED" class="data-loading">
      Fetching your training data, please wait…
    </div>
    <div v-else>
      <h1>Placeholder</h1>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Training",
  components: {},

  methods: {
    ...mapActions("core", ["TOGGLE_LOADING"]),
    ...mapActions("training", ["GET_DATA"]),
  },

  computed: {
    ...mapGetters("training", ["DATA_RETRIEVED"]),
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
