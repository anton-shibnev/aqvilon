<template>
  <q-select
    v-bind="$props"
    :class="name"
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
  </q-select>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { QSelect } from 'quasar';

@Component
export default class AInput extends QSelect {
  @Prop({ type: Object }) options: never | undefined

  // name = 'a-select'
}
</script>

<style lang="scss" scoped>
.a-select {
  $height: ( "mob": 46px, "xs": 52px, "md": 60px, "lg": 69px );

  @extend %input-text;

  ::v-deep {
    .q-field {
      &__marginal {
        height: max-content;
        margin-bottom: 4px;
        margin-top: auto;

        @media #{$mq-xs} {
          margin-bottom: 8px;
          margin-right: -7px;
        }

        @media #{$mq-md} {
          margin-bottom: 11px;
        }

        @media #{$mq-lg} {
          margin-bottom: 10px;
        }
      }

      &__control {
        @include bp-change(height, $height);
        @include bp-change(min-height, $height);
      }

      &__native {
        > span {
          transform: translateY(5px);
        }
      }

      &__native,
      &__prefix,
      &__suffix,
      &__input {
        @extend %input-text;

        @include bp-change(height, $height);
        @include bp-change(min-height, $height);

        padding: 3px 0;
      }
    }
  }
}

</style>
