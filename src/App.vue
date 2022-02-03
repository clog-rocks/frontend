<template>
  <v-app>
    <v-progress-linear
      absolute
      :active="loading"
      background-color="white"
      color="#000"
      height="1"
      :indeterminate="loading"
    />

    <v-main>
      <v-container class="py-0">
        <transition
          appear
          name="fade"
        >
          <NavigationBar v-if="displayNavbar" />
        </transition>

        <transition
          appear
          mode="out-in"
          name="fade"
        >
          <router-view />
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from "@/components/layout/NavigationBar";
import { mapState } from "pinia";
import { useAuthStore } from "./stores/auth";
import { useCoreStore } from "./stores/core";

export default {
  name: "App",

  components: { NavigationBar },

  data: () => {
    return {
      displayNavbar: null,
    };
  },

  computed: {
    ...mapState(useCoreStore, ["loading"]),
    ...mapState(useAuthStore, ["isAuthenticated"]),
  },

  watch: {
    // Delay Navbar insertion to DOM.
    // Avoid jittering structure before Auth Component is hidden.
    isAuthenticated(newValue) {
      const timeout = newValue ? 500 : 0;

      setTimeout(() => (this.displayNavbar = this.isAuthenticated), timeout);
    },
  },

  mounted: function() {
    this.displayNavbar = this.isAuthenticated;
  },
};
</script>
