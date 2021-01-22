<template>
  <outer
    :id="name | camelize"
    :class="`${name}-outer`"
  >
    <section :class="name">
      <div
        :class="`${name}__title`"
        v-text="serverData.office_formations_title"
      />

      <div
        :class="`${name}__slider`"
      >
        <gallery-slider
          :options="options.galleryOptions"
          :data="serverData.office_formations"
        />
      </div>
    </section>
  </outer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Outer from 'components/base/Outer.vue';
import GallerySlider from 'components/GallerySlider.vue';

@Component({
  components: { GallerySlider, Outer },
})
export default class GalleryBlock extends Vue {
  @Prop({ type: Object }) options: never | undefined
  @Prop({ type: Object }) serverData: never | undefined

  name = 'gallery-block'
}
</script>

<style lang="scss" scoped>
$name: "gallery-block";

.#{$name}-outer {
  background-color: $secondary-light-color;
}

.#{$name} {
  @extend %container-kid;

  @include bp-change(margin-bottom, ("md": -24px));

  @media #{$mq-md} {
    @include margin-x(auto);
  }

  &__title {
    @include font(("mob": 32px, "xs": 56px, "md": 40px, "lg": 56px), 1, 500, -0.01em, $font-secondary);
  }

  &__slider {
    @include bp-change(margin-top, ("mob": 41px,"xs": 48px, "md": 58px,"lg" : 73px ));
  }
}
</style>
