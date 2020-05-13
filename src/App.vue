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
  data: () => ({
    isAuth: true,
  }),

  watch: {
    $route(to) {
      // Center content of Auth components on screen.
      console.log(to);
      this.isAuth = to.name === "Auth";
    },
  },
};
</script>
