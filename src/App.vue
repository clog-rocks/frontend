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
      <v-overlay
        v-show="showEditOverlay"
      >
        <v-btn
          absolute=""
          color="black"
          fixed
          icon
          large
          right
          tile
          top
          @click="TOGGLE_EDIT_OVERLAY"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <TrainingSessionForm />
      </v-overlay>

      <v-container class="py-0">
        <transition
          appear
          name="fade"
        >
          <Navbar v-if="displayNavbar" />
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
import { mapMutations, mapState } from "vuex";
import Navbar from "@/components/layout/Navbar.vue";
import TrainingSessionForm from "@/components/training/forms/TrainingSessionForm.vue";
import { isMobileOnly } from "mobile-device-detect";

export default {
  name: "App",

  components: { Navbar, TrainingSessionForm },

  data: () => {
    return {
      displayNavbar: null,
    };
  },
  computed: {
    ...mapState("core", ["loading", "showEditOverlay"]),
    ...mapState("auth", ["isAuthenticated"]),
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

  methods: {
    ...mapMutations("core", ["TOGGLE_EDIT_OVERLAY"]),

    shouldCenter: function() {
      return this.$route.name === "Auth" && !isMobileOnly;
    },
  },
};
</script>
