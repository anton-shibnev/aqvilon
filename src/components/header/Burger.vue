<template>
  <button
    :class="[name, { [`${name}--active`]: ui.isOpen }]"
    @click="$emit('toggle', $event)"
  >
    <div
      v-for="n in 3"
      :key="n"
      :class="`${name}__line ${name}__line--${n}`"
    />
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import UI from 'src/store/modules/UI';

@Component
export default class Burger extends Vue {
  @Prop({ type: Object }) options: never | undefined

  name = 'burger'

  ui = getModule(UI, this.$store)
}
</script>

<style lang="scss" scoped>
.burger {
  $this: &;

  @include wh(14px, 12px);
  @include btn-reset();

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  &::after {
    @include wh(calc(100% + 20px));
    @include abs-center();

    content: "";
  }

  &--active {
    #{$this}__line {
      background-color: $accent-button-hover;

      &--1 {
        transform: rotate(-135deg) translate(-6%, -300%);
      }

      &--2 {
        opacity: 0;
      }

      &--3 {
        transform: rotate(135deg) translate(-6%, 300%);
      }
    }
  }

  @media #{$mq-xs} {
    @include wh(22px, 17px);
  }

  &__line {
    @include wh(14px, 2px);

    background-color: $main-color;
    transition: background-color $trs, opacity $trs, transform $trs;

    @media #{$mq-xs} {
      @include wh(22px, 3px);
    }
  }
}
</style>
