<template>
  <div class="auth">
    <div class="auth__logo">
      clog
    </div>
    <div class="auth__form">
      <transition
        mode="out-in"
        name="component-fade"
        @afterEnter="afterEnter"
        @beforeLeave="beforeLeave"
        @enter="enter"
      >
        <component :is="activeComponent" />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapWritableState } from "pinia";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { mapMutations } from "vuex";
import { useAuthStore } from "@/stores/auth";
import { useLogbookStore } from "@/stores/logbook";

export default {
  name: "AuthView",

  components: {
    LoginForm,
    RegisterForm,
  },

  computed: {
    ...mapState(useAuthStore, ["activeComponent"]),
    ...mapWritableState(useLogbookStore, { logbookDataRetrieved: "dataRetrieved" }),
  },

  mounted: function() {
    // Force data retrievel upon next login.
    this.logbookDataRetrieved = false;
    this.TRAINING_DATA_MISSING();
  },

  methods: {
    ...mapMutations({
      TRAINING_DATA_MISSING: "training/SET_DATA_MISSING",
    }),

    // Component switch transition.
    beforeLeave: function(element) {
      this.prevHeight = getComputedStyle(element).height;
    },

    enter: function(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },

    afterEnter: function(element) {
      element.style.height = "auto";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/styles";

.auth {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100vw;
  height: 100vh;

  &__logo {
    justify-self: center;
    font-size: 6rem;
    font-weight: 100;
  }

  &__form {
    width: 90vw;
  }

  @media #{map-get($display-breakpoints, "sm-and-up")} {
    flex-direction: row;
    gap: 2rem;
    justify-content: center;

    &__logo {
      font-size: 10rem;
    }

    &__form {
      max-width: 25rem;
    }
  }
}

/* Transitions */
.component-fade-enter-active,
.component-fade-leave-active {
  overflow: hidden;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  transition-duration: 0.3s;
  transition-property: height, opacity;
}

.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
