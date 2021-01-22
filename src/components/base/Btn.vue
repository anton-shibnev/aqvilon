<template>
  <q-btn
    :class="[name, `${name}--${customColor}`, { [`${name}--round`]: round }]"
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
  </q-btn>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { QBtn } from 'quasar';

@Component
export default class Btn extends QBtn {
  @Prop({ type: String, default: 'primary' }) customColor?: string;

  name = 'btn'
}
</script>

<style lang="scss" scoped>
.btn {
  @extend %btn-txt;

  @include behavior("background-color", $accent-button, $accent-button-hover, $accent-button-pressed);

  color: $white;
  text-transform: none;

  &--primary {
    @include behavior("background-color", $accent-button, $accent-button-hover, $accent-button-pressed);
  }

  &--secondary {
    @include behavior("background-color", $white, $white, $white);
    @include behavior("color", $main-color, $danger-hover, $danger-pressed);

    background-color: $white;
    border: 1px solid;
    color: $main-color;
  }

  &--danger {
    @include behavior("background-color", $danger, $danger-hover, $danger-pressed);
  }

  &--round {
    @include wh(52px);

    transition: background-color $trs, color $trs, border-color $trs !important;

    &:hover {
      background-color: $primary;
      border-color: $primary;
      color: $white;
    }

    ::v-deep .q-btn__wrapper {
      min-height: 0;
      min-width: 0;
      padding: 0;
    }
  }
}

::v-deep {
  .q-focus-helper {
    display: none !important;
  }

  .q-icon {
    font-size: 1em;
  }

  .q-btn__wrapper {
    @include bp-change( padding, ( "mob": 18px 33px, "md": 16px 24px, "lg": 18px 32px) );
  }
}
</style>
