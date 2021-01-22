<template>
  <q-input
    v-bind="$props"
    :class="bem"
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
  </q-input>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { QInput } from 'quasar';

@Component
export default class AInput extends QInput {
  @Prop({ type: Array }) options: never | undefined

  bem = 'a-input'
}
</script>

<style lang="scss" scoped>
// $
.a-input {
  @extend %input-text;
}

::v-deep {
  .q-field {
    margin-bottom: 0;

    &--float {
      .q-field__label {
        transform: translateY(-100%) scale(0.75) !important;
      }
    }

    &__label {
      @extend %input-text;
    }

    &__control {
      @include bp-change(height, ("mob": 46px, "xs": 50px, "lg": 60px));
    }
  }
}
</style>
