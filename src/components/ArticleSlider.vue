<template>
  <div :class="name">
    <div
      :class="`${name}__title`"
    >
      Другие акции:
    </div>
    <vue-glide
      :options="sliderOptions"
      :class="`${name}__slider`"
      v-model="sliderOptions.active"
      @glide:slide-click="handleClick($event)"
    >
      <vue-glide-slide
        v-for="(slide, index) in options"
        :key="index"
        :name="index"
        class="carousel-cell"
        :class="`${name}__slide`"
      >
        <q-img
          :src="proc(slide.image.url)"
          :class="`${name}__slide-pic`"
        />
        <div
          :class="`${name}__slide-desc`"
          v-text="slide.title"
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
              { [`${name}__prev-btn--hide`]: sliderOptions.active === 0 }
            ]"
            data-glide-dir="<"
          />
          <btn
            round
            custom-color="secondary"
            icon="svguse:icons.svg#chevron-right"
            :class="[
              `${name}__prev-btn`,
              { [`${name}__next-btn--hide`]: sliderOptions.active === options.length - 1 }
            ]"
            data-glide-dir=">"
          />
        </div>
      </template>
    </vue-glide>
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
export default class ArticleSlider extends Vue {
  @Prop({ type: Array }) options: never | undefined

  name = 'article-slider'

  proc(src: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${process.env.API}${src}`;
  }

  async handleClick(i: number) {
    if (this.options![i] !== undefined) {
      const { slug } = this.options![i];
      if (this.$router.currentRoute.params.discountId === slug) {
        return;
      }
      await this.$router.push({ path: `/discount/${slug}` });
    }
  }

  sliderOptions = {
    active: 0,
    perView: 4,
    gap: 20,
    breakpoints: {
      1919: { gap: 20, perView: 4 },
      1365: { gap: 20, perView: 2 },
      767: { gap: 16, perView: 1 },
    },
  }
}
</script>

<style lang="scss" scoped>
// $
.article-slider {
  $this: &;

  position: relative;
  user-select: none;
  width: 100%;

  &__title {
    @include font(("mob": 32px, "lg": 56px), 1, 500, -0.01em, $font-secondary);
    @include bp-change(margin-bottom, ("mob": 32px, "xs": 24px, "md": 46px));
  }

  &__slide-desc {
    @include font(("mob": 20px, "lg": 24px), 1.2, 500, -0.01em);
    @include bp-change(margin-top, ("mob": 10px, "xs": 17px, "md": 15px));
  }

  &__slider {
    position: relative;
  }

  &__controls {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 16px;
  }

  &__slide {
    cursor: pointer;
    width: 100%;
  }

  &__slide-pic {
    @include bp-change(height, ("mob": 197px, "xs": 212px, "lg": 300px));

    border-radius: 5px;
    width: 100%;
  }

  &__prev-btn,
  &__next-btn {
    $control-height: ("mob": 40px, "xs": 40px, "md": 40px, "lg": 48px);

    @include bp-change(width, $control-height);
    @include bp-change(height, $control-height);
    @include bp-change(font-size, ("mob": 10px));

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

  ::v-deep {
    .glide {
      > [data-glide-el="controls"] {
        @include bp-change(top, ("mob": -50px, "xs": -56px));
        @include bp-change(right, ("mob": 100%, "xs": -85px, "md": 0));

        position: absolute;
        width: max-content;
      }

      &__slides {
        display: flex;
      }
    }
  }
}
</style>
