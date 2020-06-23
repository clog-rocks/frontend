<template>
  <section class="navbar-container">
    <v-app-bar flat color="#fff">
      <v-toolbar-title class="logo">clog</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn :ripple="false" icon tile>
        <v-icon color="red">mdi-filter</v-icon>
      </v-btn>
      <v-btn :ripple="false" icon tile>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <nav class="nav">
      <router-link :to="{ name: 'LogbookGlance' }">Glance</router-link>
      <a class="p-2" href="/logbook/">logbook</a>
      <a class="p-2" href="/logbook/ascent/add/">New ascent</a>
      <a class="p-2" href="/logbook/locations/">Your crags</a>
      <a class="p-2" href="/logbook/countries/">Explore</a>
      <router-link :to="{ name: 'Training' }">Training</router-link>
      <a class="p-2" href="/user/profile/">Your account </a>
      <a class="p-2" @click.prevent="LOGOUT" href="">Logout</a>
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

.navbar-container {
  padding-bottom: 1rem;

  .logo {
    font-weight: 100;
    font-size: 2rem !important;
  }
}

.nav {
  position: relative;
  z-index: 2;
  overflow-y: hidden;
  border-top: 1px solid #e5e5e5;
  justify-content: space-between;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
    width: 0;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  a {
    padding: 0.75rem;
    font-size: 0.9rem;
    font-weight: 300;
    letter-spacing: 1px;
    color: #584e4a !important;
    position: relative;
    text-transform: uppercase;
    text-decoration: none;
    padding-bottom: 8px;
    transition: all 0.3s;

    &:hover {
      color: $color-active !important;
    }

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 0%;
      background: $background-color;
      height: 1px;
      transition: all 0.3s;
    }

    &:hover:after {
      width: 100%;
    }

    /* vue-router */
    &.router-link-active,
    &.router-link-exact-active {
      color: $color-active !important;
      cursor: default !important;

      &:after {
        width: 100%;
        background: #adadad;
      }
    }
  }
}
</style>
