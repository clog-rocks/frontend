<template>
  <div>
    <header>
      <NavigationBar />
    </header>
    <main>
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
    </main>
  </div>
</template>

<style scoped>
header {
  max-height: 100vh;

  @media (width >= 1024px) {
    display: flex;
    place-items: center;
  }
}
</style>
