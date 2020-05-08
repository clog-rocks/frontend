<template>
  <v-row justify="center">
    <v-col
      justify="center"
      align-self="center"
      cols="12"
      md="4"
      class="text-center"
    >
      <span class="logo font-weight-thin">clog</span>
    </v-col>
    <v-col align-self="center" cols="12" md="4">
      <transition mode="out-in" name="component-fade">
        <component :is="displayedComponent" />
      </transition>
    </v-col>
  </v-row>
</template>

<script>
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";

export default {
  name: "Auth",
  components: {
    Login,
    Register,
  },
  computed: {
    displayedComponent() {
      return this.$store.state.auth.activeComponent;
    },
  },
};
</script>

<style scoped>
.logo {
  font-size: 8rem;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.2s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
