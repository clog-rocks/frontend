<template>
  <v-row justify="center">
    <v-col
      justify="center"
      align-self="center"
      cols="12"
      md="4"
      class="text-center px-9 px-sm-0"
    >
      <span class="logo font-weight-thin">clog</span>
    </v-col>
    <v-col
      align-self="center"
      cols="12"
      md="4"
      style="max-width: 500px;"
      class="px-9 px-sm-0"
    >
      <transition
        mode="out-in"
        name="component-fade"
        @beforeLeave="beforeLeave"
        @enter="enter"
        @afterEnter="afterEnter"
      >
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

    // Component switch transition.
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },

    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },

    afterEnter(element) {
      element.style.height = "auto";
    },
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

@media (max-width: 959.99px) {
  .logo {
    font-size: 6rem;
  }
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition-duration: 0.3s;
  transition-property: height, opacity;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  overflow: hidden;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
