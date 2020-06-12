<template>
  <v-row justify="center">
    <v-col
      justify="center"
      align-self="center"
      cols="12"
      md="4"
      class="text-center"
    >
      <span class="logo font-weight-thin">clog</span>
    </v-col>
    <v-col align-self="center" cols="12" md="4">
      <transition mode="out-in" name="component-fade">
        <component :is="activeComponent" />
      </transition>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";

import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";

export default {
  name: "Auth",
  components: {
    Login,
    Register,
  },

  methods: {
    ...mapActions({
      LOGBOOK_DATA_NOT_RETRIEVED: "logbook/DATA_NOT_RETRIEVED",
      TRAINING_DATA_NOT_RETRIEVED: "training/DATA_NOT_RETRIEVED",
    }),
  },

  mounted() {
    // Force data retrievel upon next login.
    this.LOGBOOK_DATA_NOT_RETRIEVED();
    this.TRAINING_DATA_NOT_RETRIEVED();
  },

  computed: {
    ...mapState("auth", ["activeComponent"]),
  },
};
</script>

<style scoped>
.logo {
  font-size: 8rem;
}

@media (max-width: 599.98px) {
  .logo {
    font-size: 6rem;
  }
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.2s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
