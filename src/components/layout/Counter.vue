<template>
  <div class="counter">
    <span
      v-if="staticValue"
      class="value"
    >
      {{ staticValue }}
    </span>
    <ICountUp
      v-else
      class="value"
      :delay="delay"
      :end-val="value"
      :options="options"
    />
    <transition
      appear
      name="bounce"
    >
      <p class="legend">
        {{ legend }}
      </p>
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
  .value {
    font-size: 3em;
    font-weight: 200;
  }

  .legend {
    position: relative;
    top: -15px;
    font-size: 1.2em !important;
    font-weight: 200;
    letter-spacing: 1px;
  }
}
</style>
