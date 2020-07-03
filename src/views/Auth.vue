<template>
  <v-row justify="center">
    <v-col
      align-self="center"
      class="px-9 px-sm-0 text-center"
      cols="12"
      justify="center"
      md="4"
    >
      <span class="font-weight-thin logo">clog</span>
    </v-col>
    <v-col
      align-self="center"
      class="px-9 px-sm-0"
      cols="12"
      md="4"
      style="max-width: 500px;"
    >
      <transition
        mode="out-in"
        name="component-fade"
        @afterEnter="afterEnter"
        @beforeLeave="beforeLeave"
        @enter="enter"
      >
        <component :is="activeComponent" />
      </transition>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";

export default {
  name: "Auth",

  components: {
    Login,
    Register,
  },

  computed: {
    ...mapState("auth", ["activeComponent"]),
  },

  mounted: function() {
    // Force data retrievel upon next login.
    this.LOGBOOK_DATA_MISSING();
    this.TRAINING_DATA_MISSING();
  },

  methods: {
    ...mapMutations({
      LOGBOOK_DATA_MISSING: "logbook/SET_DATA_MISSING",
      TRAINING_DATA_MISSING: "training/SET_DATA_MISSING",
    }),

    // Component switch transition.
    beforeLeave: function(element) {
      this.prevHeight = getComputedStyle(element).height;
    },

    enter: function(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },

    afterEnter: function(element) {
      element.style.height = "auto";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";

.logo {
  font-size: 8rem;
}

@media #{map-get($display-breakpoints, 'md-and-down')} {
  .logo {
    font-size: 6rem;
  }
}

/* Transitions */
.component-fade-enter-active,
.component-fade-leave-active {
  overflow: hidden;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  transition-duration: 0.3s;
  transition-property: height, opacity;
}

.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
