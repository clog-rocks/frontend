<template>
  <div class="form">
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
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  height: 100vh;
}
</style>
