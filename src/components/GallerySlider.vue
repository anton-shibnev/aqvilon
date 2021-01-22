<template>
  <div :class="name">
    <div
      v-if="counter"
      :class="`${name}__counter`"
    >
      <span
        :class="`${name}__counter-current`"
        v-text="sliderOptions.active + 1"
      />
      <span
        :class="`${name}__counter-length`"
        v-text="`/${data.length}`"
      />
    </div>
    <q-no-ssr>
      <vue-glide
        :options="sliderOptions"
        v-model="sliderOptions.active"
      >
        <vue-glide-slide
          v-for="(slide, index) in data"
          :key="index"
          :name="index"
          :class="`${name}__slide`"
        >
          <div
            :class="`${name}__desc`"
          >
            <div
              v-if="slide.title"
              :class="`${name}__desc-head`"
              v-text="slide.title"
            />
            <div
              v-if="slide.desc"
              :class="`${name}__desc-text`"
              v-text="slide.desc"
            />
          </div>
          <!-- TODO почему-то не отображается предыдущая картинка при type carousel -->
          <q-img
            :src="proc(slide.image_max_1920x1920.url)"
            :class="`${name}__slide-pic`"
          />
        </vue-glide-slide>
        <template slot="control">
          <div
            :class="`${name}__controls`"
            data-glide-el="controls"
          >
            <btn
              round
              custom-color="secondary"
              icon="svguse:icons.svg#chevron-left"
              :class="[
                `${name}__prev-btn`,
              ]"
              data-glide-dir="<"
            />
            <btn
              round
              custom-color="secondary"
              icon="svguse:icons.svg#chevron-right"
              :class="[
                `${name}__prev-btn`,
              ]"
              data-glide-dir=">"
            />
          </div>

          <div
            v-if="options.bullets"
            :class="`${name}__bullets`"
            data-glide-el="controls[nav]"
          >
            <button
              v-for="(_, index) in data"
              :key="index"
              :class="[
                `${name}__bullet-item`,
                { [`${name}__bullet-item--active`]: sliderOptions.active === index }
              ]"
              :data-glide-dir="`=${index}`"
            />
          </div>
        </template>
      </vue-glide>
    </q-no-ssr>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Vue, Component, Prop } from 'vue-property-decorator';
import Outer from 'components/base/Outer.vue';
import Btn from 'components/base/Btn.vue';
import { Glide, GlideSlide } from 'vue-glide-js';

@Component({
  components: {
    Btn,
    Outer,
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
  },
})
export default class GallerySlider extends Vue {
  @Prop({ type: Object }) options: never | undefined
  @Prop({ type: Array }) data: never | undefined
  @Prop({ type: Boolean, default: false }) counter: boolean

  name = 'gallery-slider'

  // sliderOptions = {
  //   active: 0,
  //   perView: 1,
  //   gap: 84,
  //   rewind: false,
  //   type: 'carousel',
  //   rewindDuration: 400,
  //   breakpoints: {
  //     1919: { gap: 72 },
  //     1365: { gap: 24 },
  //     767: { gap: 16 },
  //   },
  // }

  sliderOptions = {
    active: 1,
    perView: 1,
    gap: 84,
    breakpoints: {
      1919: { gap: 72 },
      1365: { gap: 24 },
      767: { gap: 16 },
    },
  }

  active = 2

  proc(src: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${process.env.API}${src}`;
  }
}
</script>

<style lang="scss" scoped>
// $
.gallery-slider {
  $this: &;
  $pic-height: ( "mob": 197px, "xs": 344px, "md": 457px, "lg": 640px, );
  $control-height: ( "mob": 32px, "xs": 40px, "md": 40px, "lg": 48px, );

  position: relative;
  width: 100%;

  &__slider {
    display: flex;
  }

  &__desc {
    max-width: 535px;
    user-select: none;

    @media #{$mq-md} {
      display: grid;
      grid-gap: 40px;
      grid-template-columns: 1fr 633px;
      max-width: none;
    }

    @media #{$mq-lg} {
      grid-template-columns: 1fr 890px;
    }
  }

  &__desc-head {
    @extend %gallery-block-desc-head;
  }

  &__desc-text {
    @extend %gallery-block-desc-text;

    margin-top: 8px;

    @media #{$mq-md} {
      margin-top: 0;
    }
  }

  &__controls {
    @include abs-center-x();
    @include bp-change(
      width,
      ("mob": 100%, "xs": calc(100% - 16px), "md": calc(100% + 112px), "lg": calc(100% + 130px))
    );
    @include bp-change(bottom, ("mob": 108px, "xs": 175px, "md": 232px, "lg": 323px));

    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  &__slide {
    width: 100%;

    #{$this}__desc-head,
    #{$this}__desc-text {
      opacity: 0;
      transform: translateX(-10px);
      transition: opacity 0.3s ease-in-out , transform 0.3s ease-in-out;
    }
  }

  &__slide-pic {
    @include bp-change(height, $pic-height);

    border-radius: 5px;
    margin-top: 23px;
    width: 100%;

    @media #{$mq-md} {
      filter: grayscale(100%);
      transition: filter 0.3s ease-in-out 0.3s;
    }

    @media #{$mq-lg} {
      margin-top: 32px;
    }
  }

  &__prev-btn,
  &__next-btn {
    @include bp-change(width, $control-height);
    @include bp-change(height, $control-height);
    @include bp-change(font-size, ("mob": 9px, "lg": 12px));

    border: 1px solid $grey;
    transition: opacity 0.5s, transform 0.5s;

    &--hide {
      opacity: 0;
      transform: scale(0);
    }

    ::v-deep {
      .q-btn__wrapper {
        padding: 0;
      }
    }
  }

  &__counter {
    @include abs-center-x();

    bottom: -40px;
  }

  &__counter-current {
    @include font(("mob": 24px), 1.2, 500, -0.01em);
  }

  &__counter-length {
    @include font(("mob": 16px), 1.2, 400, -0.01em);
  }

  &__bullets {
    @include bp-change(margin-top, ("mob": 12px));

    display: grid;
    grid-auto-flow: column;
    grid-gap: 8px;
    justify-content: center;
  }

  &__bullet-item {
    @include btn-reset();
    @include circle(12px);

    background-color: $grey;
    box-shadow: inset 0 0 0 0 $accent-button;
    cursor: pointer;
    transition: box-shadow $trs;

    &:hover {
      box-shadow: inset 0 0 0 7px $accent-button;
    }

    &--active {
      box-shadow: inset 0 0 0 7px $accent-button;
    }
  }

  ::v-deep {
    .glide {
      &__slides {
        align-items: flex-end;
        display: flex;
      }

      &__slide {
        &--active {
          #{$this}__slide-pic {
            filter: grayscale(0);
          }

          #{$this}__desc-head,
          #{$this}__desc-text {
            opacity: 1;
            transform: translateX(0);
          }

          #{$this}__desc-head {
            transition-delay: 0s;
          }
          #{$this}__desc-text {
            transition-delay: 0.3s;
          }
        }
      }
    }
  }
}
</style>
