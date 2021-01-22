<template>
  <q-checkbox
    :class="[
      bem,
      `${bem}--${customColor}`,
    ]"
    v-bind="$props"
    v-on="$listeners"
  >
    <slot
      v-for="(_, name) in $slots"
      :slot="name"
      :name="name"
    />
    <template
      v-for="(_, name) in $scopedSlots"
      :slot="name"
      slot-scope="slotData"
    >
      <slot
        :name="name"
        v-bind="slotData"
      />
    </template>
  </q-checkbox>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { QCheckbox } from 'quasar';

@Component
export default class Checkbox extends QCheckbox {
  @Prop({ type: String, default: 'primary' }) customColor?: string;

  bem = 'checkbox'
}
</script>

<style lang="scss" scoped>
.checkbox {
  user-select: none;

  &:hover {
    ::v-deep .q-checkbox__bg {
      border-color: $main-color;
    }
  }

  &:active {
    ::v-deep .q-checkbox__bg {
      background-color: rgba($main-color, 0.24);
      border-color: $main-color;
    }
  }

  ::v-deep {
    .q-checkbox {
      $this: &;

      &__bg {
        background-color: rgba($main-color, 0);
        border: 1px solid $grey;
        border-radius: 5px;
        color: $grey;
        transition: border-color $trs, background-color $trs;
      }

      &__inner {
        @include bp-change(font-size, ("md": 30px, "lg": 40px));

        &--truthy {
          color: $main-color !important;

          .q-checkbox__bg {
            background-color: $main-color;
            border: 1px solid $main-color;
          }
        }

        &::before {
          display: none;
        }
      }
    }
  }
}
</style>
