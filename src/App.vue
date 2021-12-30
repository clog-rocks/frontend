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
      <v-dialog
        elevation="0"
        max-width="50em"
        overlay-color="white"
        overlay-opacity="1"
        transition="dialog-transition"
        :value="showEditOverlay"
        @click:outside="TOGGLE_EDIT_OVERLAY"
      >
        <v-card>
          <v-tabs
            align-with-title
            background-color="primary"
            centered
          >
            <v-tabs-slider color="yellow" />

            <v-tab>Training</v-tab>
            <v-tab>Ascent</v-tab>
          </v-tabs>
          <v-card-text>
            <TrainingSessionForm />
          </v-card-text>
          <v-card-text>
            <p>ascent form here</p>
          </v-card-text>
        </v-card>
      </v-dialog>

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
  },
};
</script>
