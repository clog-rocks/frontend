<template>
  <v-app>
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      color="#000"
      background-color="white"
      height="1"
    ></v-progress-linear>

    <v-content>
      <v-container
        :class="{ 'fill-height': centerContainer }"
        :fluid="centerContainer"
        class="pt-0"
      >
        <transition name="fade" appear>
          <Navbar v-if="displayNavbar" />
        </transition>

        <transition name="fade" appear mode="out-in">
          <router-view />
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import Navbar from "@/components/layout/Navbar";
import { isMobileOnly } from "mobile-device-detect";

export default {
  name: "app",
  components: { Navbar },

  data: () => ({
    centerContainer: null,
    displayNavbar: null,
  }),

  computed: {
    ...mapState("core", ["loading"]),
    ...mapState("auth", ["isAuthenticated"]),
  },

  mounted() {
    this.centerContainer = this.shouldCenter();
    this.displayNavbar = this.isAuthenticated;
  },

  methods: {
    shouldCenter() {
      return this.$route.name == "Auth" && !isMobileOnly;
    },
  },

  watch: {
    // Center content of Auth components on screen.
    // Timeout required to delay fill-height class change
    // until transition finished.
    $route() {
      setTimeout(() => {
        this.centerContainer = this.shouldCenter();
      }, 500);
    },

    // Delay Navbar insertion to DOM.
    // Avoid jittering structure before Auth Component is hidden.
    isAuthenticated(newValue) {
      const timeout = newValue ? 500 : 0;
      setTimeout(() => {
        this.displayNavbar = this.isAuthenticated;
      }, timeout);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400&display=swap");

.data-loading {
  position: fixed;
  text-align: center;
  top: 50%;
  left: 50%;
  font-size: 1.2rem;
  transform: translate(-50%, -50%);
  font-weight: 300;
}

/* Transitions */
/* Fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Bounce */
.bounce-enter-active {
  animation: bounce-in 1s;
}
.bounce-leave-active {
  animation: bounce-in 1s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  70% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
</style>
