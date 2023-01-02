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
  margin-top: 2rem;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    flex-wrap: wrap;
    place-items: flex-start;
  }

  nav {
    padding: 1rem 0;
    margin-top: 1rem;
    margin-left: -1rem;
    font-size: 1rem;
    text-align: left;
  }
}
</style>
