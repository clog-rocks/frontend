<template>
  <section>
    <v-app-bar
      color="#fff"
      flat
    >
      <v-toolbar-title class="logo">
        clog
      </v-toolbar-title>

      <v-spacer />

      <v-btn
        icon
        :ripple="false"
        tile
      >
        <v-icon color="red">
          mdi-filter
        </v-icon>
      </v-btn>
      <v-btn
        icon
        :ripple="false"
        tile
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn
        icon
        :ripple="false"
        tile
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>

    <nav>
      <router-link :to="{ name: 'Logbook' }">
        Logbook
      </router-link>
      <router-link :to="{ name: 'Training' }">
        Training
      </router-link>
      <a
        class="p-2"
        href="/logbook/countries/"
      >Explore</a>
      <a
        class="p-2"
        href="/user/profile/"
      >Your account </a>
      <a
        class="p-2"
        href=""
        @click.prevent="LOGOUT"
      >Logout</a>
    </nav>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Navbar",

  methods: {
    ...mapActions("auth", ["LOGOUT"]),
  },
};
</script>

<style lang="scss" scoped>
$color-active: #000;
$background-color: #f37272;

section {
  padding-bottom: 1rem;

  .logo {
    font-size: 2rem !important;
    font-weight: 100;
  }
}

nav {
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  border-top: 1px solid #e5e5e5;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbars *
   * Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
    width: 0;
  }

  a {
    position: relative;
    padding: 0.75rem;
    padding-bottom: 8px;
    font-size: 0.9rem;
    font-weight: 300;
    color: #584e4a !important;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 1px;
    outline: none;

    &:hover {
      color: $color-active !important;
    }

    &::after {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 1px;
      content: "";
      background: $background-color;
      transition: transform ease-in-out 250ms;
      transform: scale(0, 1);
    }

    &:hover::after,
    &:focus::after {
      transform: scale(1, 1);
    }

    /* vue-router */
    &.router-link-active,
    &.router-link-exact-active {
      color: $color-active !important;
      cursor: default !important;

      &::after {
        background: #adadad;
        transform: scale(1, 1);
      }

      &:focus::after {
        background: $background-color !important;
      }
    }
  }
}
</style>
