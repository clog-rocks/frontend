<template>
  <div class="counter">
    <ICountUp
      v-if="!staticValue"
      class="value"
      :delay="delay"
      :endVal="value"
      :options="options"
    />
    <span v-else class="value">{{ staticValue }} </span>
    <transition name="bounce" appear>
      <p class="legend">{{ legend }}</p>
    </transition>
  </div>
</template>

<script>
import ICountUp from "vue-countup-v2";

export default {
  name: "Counter",

  components: {
    ICountUp,
  },

  props: {
    delay: { type: Number, default: 0 },
    value: { type: Number, default: null },
    options: {
      type: Object,
      default: function () {
        return {};
      },
    },
    legend: { type: String, default: null },
    staticValue: { type: String, default: null },
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
    font-size: 1.2em !important;
    font-weight: 200;
    position: relative;
    top: -15px;
    letter-spacing: 1px;
  }
}
</style>
