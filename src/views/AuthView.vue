<template>
  <div class="center">
    <router-view v-slot="{ Component }">
      <transition
        name="very-fast-fade"
        mode="out-in"
      >
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>

<style>
.auth-form {
  @media (width >=600px) {
    width: 500px;
  }

  line-height: 2rem;
  background-color: transparent;
}

.button-link-group {
  display: inline-flex;
  gap: 0.75rem;
  align-items: baseline;
}
</style>
