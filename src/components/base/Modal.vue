<template>
  <section :class="name">
    <q-scroll-area class="fit">
      <div
        :class="`${name}__inner`"
      >
        <btn
          round
          icon="svguse:icons.svg#cross"
          :class="`${name}__close`"
          custom-color="secondary"
          @click="$emit('close', $event)"
        />
        <div
          :class="`${name}__content`"
        >
          <slot />
        </div>
      </div>
    </q-scroll-area>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Btn from 'components/base/Btn.vue';

@Component({
  components: { Btn },
})
export default class Modal extends Vue {
  @Prop({ type: Object }) options: never | undefined

  name = 'modal'
}
</script>

<style lang="scss" scoped>
// $
.modal {
  @include wh(100%);

  background-color: $white;
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 9999;

  &__close {
    @include wh-arr(("xs": 40px, "lg": 48px));
    @include bp-change(top, ("mob": 24px, "xs": 32px, "md": 48px));
    @include bp-change(right, ("mob": 16px, "xs": 47px, "md": 79px, "lg": 112px));
    @include wh(40px);

    color: $main-color;
    position: fixed;
    z-index: 30;

    ::v-deep {
      .q-btn__wrapper {
        min-height: 0;
        min-width: 0;
        padding: 0;
      }
    }
  }
}
</style>
