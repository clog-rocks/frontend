<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-container :class="{ 'fill-height': isAuth }" fluid>
          <router-view />
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "app",

  computed: {
    // Center content of Auth components on screen.
    isAuth() {
      return this.$router.currentRoute.name === "Auth";
    },
  },
};
</script>
