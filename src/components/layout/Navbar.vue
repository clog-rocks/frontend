<template>
  <div v-if="displayNavbar">
    <v-app-bar flat color="#fff">
      <v-toolbar-title class="site-header-logo">clog</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn :ripple="false" icon tile>
        <v-icon color="red">mdi-filter</v-icon>
      </v-btn>
      <v-btn :ripple="false" icon tile>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="nav-scroller">
      <nav class="nav">
        <router-link :to="{ name: 'LogbookGlance' }">Glance</router-link>
        <a class="p-2" href="/logbook/">logbook</a>
        <a class="p-2" href="/logbook/ascent/add/">New ascent</a>
        <a class="p-2" href="/logbook/locations/">Your crags</a>
        <a class="p-2" href="/logbook/countries/">Explore</a>
        <router-link :to="{ name: 'Training' }">Training</router-link>
        <a class="p-2" href="/user/profile/">Your account </a>
        <a class="p-2" @click.prevent="LOGOUT" href="">Logout</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Navbar",

  data: () => ({
    displayNavbar: null,
  }),

  mounted() {
    this.displayNavbar = this.IS_AUTHENTICATED;
  },

  methods: {
    ...mapActions("auth", ["LOGOUT"]),
  },

  computed: {
    ...mapGetters("auth", ["IS_AUTHENTICATED"]),
  },

  watch: {
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

<style scoped>
@import "../../styles/navbar.css";

.router-link-active {
  font-weight: 400;
}
</style>
