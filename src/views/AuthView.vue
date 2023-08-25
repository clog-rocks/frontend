<template>
  <div>
    <div class="form">
      <router-view v-slot="{ Component }">
        <transition
          name="fast-fade"
          mode="out-in"
        >
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.form {
  max-width: 400px;
}
</style>
