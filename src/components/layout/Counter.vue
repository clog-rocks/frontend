<template>
  <div class="counter">
    <span
      v-if="staticValue"
      class="counter__value"
    >
      {{ staticValue }}
    </span>
    <ICountUp
      v-else
      class="counter__value"
      :delay="delay"
      :end-val="value"
      :options="options"
    />
    <transition
      appear
      name="bounce"
    >
      <span class="counter__legend">
        {{ legend }}
      </span>
    </transition>
  </div>
</template>

<script>
import ICountUp from "vue-countup-v2";

export default {
  name: "Counter",

  components: { ICountUp },

  props: {
    delay: {
      type: Number,
      default: 0,
    },

    value: {
      type: Number,
      default: null,
    },

    options: {
      type: Object,
      default: function() {
        return {};
      },
    },

    legend: {
      type: String,
      default: null,
    },

    staticValue: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.counter {
  font-weight: 200;
  text-align: center;

  &__value {
    display: block;
    font-size: 3rem;
  }

  &__legend {
    position: relative;
    bottom: 0.6em;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 4px;
  }
}
</style>
