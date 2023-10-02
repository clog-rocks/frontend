<script setup lang="ts">
import { useUserStore } from "@/stores";

const userStore = useUserStore();
</script>

<template>
  <header>
    <p class="logo">clog</p>
    <nav>
      <TransitionGroup
        tag="nav"
        name="list"
      >
        <!-- Authenticated -->
        <RouterLink
          v-if="userStore.isAuthenticated"
          key="logbook"
          :to="{ name: 'logbook' }"
        >
          Logbook
        </RouterLink>
        <RouterLink
          v-if="userStore.isAuthenticated"
          key="training"
          :to="{ name: 'training' }"
        >
          Training
        </RouterLink>
        <RouterLink
          v-if="userStore.isAuthenticated && userStore.user?.username !== null"
          key="user"
          :to="{ name: 'user' }"
        >
          {{ userStore.user!.username }}
        </RouterLink>
        <RouterLink
          v-if="userStore.isAuthenticated"
          key="logout"
          :to="{ name: 'logout' }"
        >
          Logout
        </RouterLink>

        <!-- Not authenticated -->
        <RouterLink
          v-if="!userStore.isAuthenticated"
          key="login"
          :to="{ name: 'login' }"
        >
          Login
        </RouterLink>
        <RouterLink
          v-if="!userStore.isAuthenticated"
          key="register"
          :to="{ name: 'register' }"
        >
          Register
        </RouterLink>
      </TransitionGroup>
    </nav>
  </header>
</template>

<style scoped>
header {
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  padding: 1rem 0 2rem;

  & a {
    padding: 0 1rem;

    &.router-link-active {
      color: var(--text);
    }

    &.router-link-active:hover {
      background-color: transparent;
    }
  }
}
</style>
