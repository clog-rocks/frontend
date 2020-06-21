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

    <div class="nav-scroller">
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
    </div>
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
$background-color: #f37272;
$transition-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);

.navbar-container {
  padding-bottom: 1rem;

  .logo {
    font-weight: 100;
    font-size: 2rem !important;
  }
}

.nav-scroller {
  position: relative;
  z-index: 2;
  overflow-y: hidden;
  border-top: 1px solid #e5e5e5;

  .nav {
    justify-content: space-between;
    display: flex;
    flex-wrap: nowrap;
    margin-top: -1px;
    overflow-x: auto;
    text-align: center;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;

    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
      display: none;
    }

    /* Hide scrollbar for IE and Edge */
    -ms-overflow-style: none;

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

      &:before,
      &:after {
        content: "";
        opacity: 0;
        position: absolute;
        bottom: 2px;
        left: 0;
        right: 0;
        height: 1px;
        background-color: $background-color;
      }

      &:before {
        transform: translateY(-8px);
      }

      &:after {
        transform: translateY(4px);
      }

      &:hover {
        &:before,
        &:after {
          opacity: 1;
          transform: translateY(0);
        }
      }

      &:hover:before {
        transition: transform 0.2s $transition-function, opacity 0.2s;
      }

      &:hover:after {
        transition: transform 0s $transition-function, opacity 0s 0.2s;
      }

      /* vue-router */
      &.router-link-active,
      &.router-link-exact-active {
        cursor: default !important;

        &:before,
        &:after {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
  }
}
</style>
