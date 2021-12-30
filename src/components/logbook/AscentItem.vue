<template>
  <div
    :id="ascent.id"
    class="animate-bezier-short ascent"
  >
    <!-- TODO: add personal grade -->
    <div class="ascent__grade">
      {{ ascent.route.grade.fr_route }}
    </div>

    <div
      v-if="ascent.repeat"
      class="ascent__style ascent__style--repeat ascent__style--rp"
    >
      repeat
    </div>
    <div
      v-else
      class="ascent__style"
      :class="style_class"
    >
      {{ ascent.style.shorthand }}
    </div>

    <div class="ascent__route">
      <div class="ascent__route__location">
        {{ ascent.route.sector.crag.country.name }} /
        {{ ascent.route.sector.crag.name }} /
        {{ ascent.route.sector.name }}
      </div>

      <div>
        <span class="ascent__route__name">
          {{ ascent.route.name }}
        </span>

        <span class="ascent__route__rating">
          <v-rating
            background-color="blue lighten-5"
            clearable
            color="blue lighten-1"
            dense
            hover
            length="3"
            size="18"
            :value="ascent.quality"
          />
          <v-icon
            v-if="ascent.recommended"
            color="red"
            dense
          >
            mdi-heart-outline
          </v-icon>
        </span>
      </div>

      <div
        v-if="ascent.comment"
        class=""
      >
        <div
          class="collapse hide"
        >
          <div class="ascent__route__comment">
            {{ ascent.comment }}
          </div>
        </div>
      </div>
    </div>

    <!-- TODO: dont hardcode paths here -->
    <div class="ascent__controls">
      <a href="/logbook/ascent/delete/7413/?next=/logbook/glance/">
        <span>Delete</span>
        <v-icon small>mdi-delete-outline</v-icon>
      </a>

      <a href="/logbook/ascent/edit/7413/">
        <span>Edit</span>
        <v-icon small>mdi-pencil-outline</v-icon>
      </a>

      <a href="/logbook/ascent/add/?pk=5788">
        <span>Repeat</span>
        <v-icon small>mdi-repeat</v-icon>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "AscentItem",

  props: {
    ascent: {
      type: Object,

      // Object type requires function to return default object.
      default: () => {},
    },
  },

  computed: {
    style_class: function() {
      return `ascent__style--${this.ascent.style.shorthand.toLowerCase()}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "vuetify/src/styles/styles";

$cb-transition: cubic-bezier(0.165, 0.84, 0.44, 1);

.ascent {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0.25rem;
  box-shadow: 0 0 1px rgb(0 0 0 / 10%);
  transition: box-shadow 250ms $cb-transition;

  &:hover {
    box-shadow: 0 0 2px rgb(0 0 0 / 20%);
  }

  &__style {
    min-width: 2rem;
    font-weight: 300;
    text-align: center;
    letter-spacing: 1px;

    &--os { color: orange; }
    &--fl { color: blue; }
    &--rp { color: red; }
    &--repeat { font-size: 0.75rem; }
  }

  &__grade {
    min-width: 3rem;
    font-size: 1.5rem;
    font-weight: 100;
  }

  &__route {
    order: -1;
    width: 100%;

    &__location {
      font-size: 0.8em;
      letter-spacing: 1px;
    }

    &__name {
      padding-right: 10px;
      letter-spacing: 1px;
    }

    &__comment {
      padding: 0.5em;
      font-style: italic;
    }
  }

  &__controls {
    display: flex;
    width: auto;
    margin-left: auto;
    text-align: right;

    a {
      font-size: 0.75rem;
      text-decoration: none;

      span {
        padding-right: 0.25rem;
        letter-spacing: 1px;
        opacity: 0.5;
        transition: opacity 0.6s $cb-transition;
      }

      i { display: none; }
    }

    a + a { padding-left: 2em; }

    a:first-of-type > span { color: red; }
  }

  @media #{map-get($display-breakpoints, "sm-and-up")} {
    &__route {
      order: unset;
      width: unset;
    }

    &__style {
      min-width: 3.5rem;
      margin-right: 0.5em;
      font-size: 1.5rem;

      &--repeat { font-size: 0.75rem; }
    }

    &__grade {
      min-width: 70px;
      font-size: 2.1rem;
    }

    &__controls {
      flex-direction: column-reverse;

      a {
        width: 100%;

        /* font-size: unset; */

        span { opacity: 0; }

        i {
          display: inline-block;
          opacity: 0;
        }

        &:hover > span { opacity: 1; }
      }
    }
  }
}

@media #{map-get($display-breakpoints, "sm-and-up")} {
  .ascent:hover .ascent__controls a > i { opacity: 1; } /* stylelint-disable-line selector-class-pattern */
}

.ascent + .ascent {
  margin-top: 0.5rem;
}

.v-rating { display: inline-flex; }
</style>
