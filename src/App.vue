<template>
  <router-view v-slot="{ Component }">
    <transition
      appear
      mode="out-in"
      name="component-fade"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>
