<template>
  <v-app>
    <v-content>
      <v-container
        :class="{ 'fill-height': isAuth, fluid: isAuth }"
        class="pt-0"
      >
        <transition name="fade" appear mode="out-in">
          <router-view />
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "app",

  data: () => ({
    isAuth: null,
  }),

  mounted() {
    this.isAuth = this.$router.currentRoute.name === "Auth";
  },

  watch: {
    // Center content of Auth components on screen.
    // Timeout required to delay fill-height class change
    // until transition finished.
    $route(to) {
      setTimeout(() => {
        this.isAuth = to.name == "Auth";
      }, 500);
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
</style>
