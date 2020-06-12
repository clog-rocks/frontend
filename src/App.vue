<template>
  <v-app>
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
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
import { mapState } from "vuex";
import _ from "lodash";
import Navbar from "@/components/layout/Navbar";

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
    window.addEventListener("resize", _.debounce(this.on_resize, 250));

    this.centerContainer = this.shouldCenter();
    this.displayNavbar = this.isAuthenticated;
  },

  methods: {
    shouldCenter() {
      return (
        this.$route.name == "Auth" && document.documentElement.clientWidth > 959
      );
    },

    on_resize() {
      this.centerContainer = this.shouldCenter();
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
      console.log("new: " + newValue);
      setTimeout(() => {
        this.displayNavbar = this.isAuthenticated;
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
