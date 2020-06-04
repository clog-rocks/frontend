<template>
  <v-app>
    <v-progress-linear
      :active="LOADING"
      :indeterminate="LOADING"
      absolute
      color="#aea7af"
      background-color="white"
      height="1"
    ></v-progress-linear>

    <v-content>
      <v-container
        :class="{ 'fill-height': centerContainer, fluid: centerContainer }"
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
import { mapGetters } from "vuex";

import Navbar from "@/components/layout/Navbar";

export default {
  name: "app",
  components: { Navbar },

  data: () => ({
    centerContainer: null,
    displayNavbar: null,
  }),

  computed: {
    ...mapGetters("core", ["LOADING"]),
    ...mapGetters("auth", ["IS_AUTHENTICATED"]),
  },

  mounted() {
    this.centerContainer = this.$router.currentRoute.name === "Auth";
    this.displayNavbar = this.IS_AUTHENTICATED;
  },

  watch: {
    // Center content of Auth components on screen.
    // Timeout required to delay fill-height class change
    // until transition finished.
    $route(to) {
      setTimeout(() => {
        this.centerContainer = to.name == "Auth";
      }, 500);
    },

    // Delay Navbar insertion to DOM.
    // Avoid jittering structure before Auth Component is hidden.
    IS_AUTHENTICATED(newValue) {
      const timeout = newValue ? 500 : 0;
      console.log("new: " + newValue);
      setTimeout(() => {
        this.displayNavbar = this.IS_AUTHENTICATED;
      }, timeout);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400&display=swap");

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.enlarged,
.enlarged-big,
.enlarged-huge {
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 300;
}

.enlarged {
  font-size: 120%;
}

.enlarged-big {
  font-size: 200%;
}

.enlarged-huge {
  font-size: 350%;
}
</style>
