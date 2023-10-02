<template>
  <nav>
    <div>
      <RouterLink
        key="logbook"
        :to="{ name: 'logbook' }"
      >
        Logbook
      </RouterLink>
      <RouterLink
        key="training"
        :to="{ name: 'training' }"
      >
        Training
      </RouterLink>
    </div>
    <div>
      <RouterLink
        key="user"
        :to="{ name: 'user' }"
      >
        Profile
      </RouterLink>
      <RouterLink
        key="logout"
        :to="{ name: 'logout' }"
      >
        Logout
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
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
