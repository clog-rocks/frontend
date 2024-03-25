<template>
  <router-view v-slot="{ Component }">
    <transition
      name="v"
      mode="out-in"
    >
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style>
.auth-form {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(100vw, 50ch);
  line-height: 2rem;
  background-color: transparent;
  transform: translate(-50%, -50%);
}

.button-link-group {
  display: inline-flex;
  gap: 0.75rem;
  align-items: baseline;
  margin-top: 1rem;
}
</style>
