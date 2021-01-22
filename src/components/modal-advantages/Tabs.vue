<template>
  <div :class="bem">
    <q-tabs
      dense
      active-color="primary"
      indicator-color="primary"
      narrow-indicator
      no-caps
      v-model="currTab"
    >
      <q-tab
        v-for="(tab, index) in options"
        :key="index"
        :name="tab.title"
        :label="tab.title"
        :class="{ 'tab--active': currTab === tab.title }"
        @click="handleTabClick(index)"
      />
    </q-tabs>

    <q-tab-panels
      animated
      v-model="currTab"
    >
      <q-tab-panel
        v-for="(tab, i) in options"
        :key="i"
        :name="tab.title"
      >
        <vue-glide
          :options="sliderOptions"
          :class="`${bem}__slider`"
          v-model="sliderOptions.active"
          @glide:run="isLastSlide = false"
          @glide:run-end="onLastSlide($event)"
        >
          <vue-glide-slide
            v-for="(slide, index) in tab.adv_tab_cards"
            :key="index"
            :name="index"
            :class="`${bem}__slide`"
          >
            <tab-card
              :options="slide"
            />
          </vue-glide-slide>
          <vue-glide-slide
            :class="`${bem}__slide`"
          >
            <div :class="`${bem}__next`">
              <div :class="`${bem}__next-container`">
                <btn
                  round
                  custom-color="secondary"
                  icon="svguse:icons.svg#chevron-right"
                  data-glide-dir=">"
                  :class="[`${bem}__next-btn`]"
                  @click="handleNextTab(i)"
                />
                <div :class="`${bem}__next-descr`">
                  Следующий раздел
                </div>
                <div :class="`${bem}__next-title`">
                  {{ nextTitle }}
                </div>
              </div>
            </div>
          </vue-glide-slide>
          <template slot="control">
            <div
              :class="`${bem}__controls`"
              data-glide-el="controls"
            >
              <btn
                round
                custom-color="secondary"
                icon="svguse:icons.svg#chevron-left"
                :class="[
                  `${bem}__slider-prev-btn`,
                  { [`${bem}__slider-prev-btn--hide`]: sliderOptions.active === 0 }
                ]"
                data-glide-dir="<"
              />
              <btn
                round
                custom-color="secondary"
                icon="svguse:icons.svg#chevron-right"
                :class="[
                  `${bem}__slider-next-btn`,
                  { [`${bem}__slider-next-btn--hide`]: isLastSlide }
                ]"
                data-glide-dir=">"
              />
            </div>
          </template>
        </vue-glide>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Component, Prop } from 'vue-property-decorator';
import { QTabs } from 'quasar';
import TabCard from 'components/modal-advantages/TabCard.vue';
import { Glide, GlideSlide } from 'vue-glide-js';
import Btn from 'components/base/Btn.vue';

@Component({
  components: {
    TabCard,
    Btn,
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
  },
})
export default class Tabs extends QTabs {
  @Prop({ type: Array }) options: any

  bem = 'tabs'

  sliderOptions = {
    type: 'slider',
    active: 0,
    perView: 3,
    bound: true,
    gap: 24,
    breakpoints: {
      1919: { gap: 24, perView: 2 },
      1365: { gap: 24, perView: 1 },
      767: { gap: 16, perView: 1 },
    },
  }

  currTab = this.options[0].title

  nextTitle = this.options[1].title;

  isLastSlide = false;

  resetIndex() {
    this.sliderOptions.active = 0;
  }

  private handleTabClick(index: number) {
    const nextIndex = index + 1;
    this.resetIndex();
    if (this.options.length === nextIndex) {
      this.nextTitle = this.options[0].title;

      return;
    }
    this.nextTitle = this.options[nextIndex].title;
  }

  private handleNextTab(index: number) {
    const nextIndex = index + 1;
    this.resetIndex();
    if (this.options.length === nextIndex) {
      this.currTab = this.options[0].title;
      this.nextTitle = this.options[1].title;

      return;
    }
    if (this.options[nextIndex + 1] === undefined) {
      this.nextTitle = this.options[0].title;
    } else {
      this.nextTitle = this.options[(nextIndex + 1)].title;
    }
    this.currTab = this.options[nextIndex].title;
  }

  onLastSlide() {
    this.isLastSlide = true;
  }
}
</script>

<style lang="scss" scoped>
// $

%highlighted-tab {
  background-color: $secondary-color !important;
  border: 1px solid transparent !important;
}

.tabs {
  $this: &;
  $pic-height: ( "mob": 197px, "xs": 344px, "md": 457px, "lg": 640px, );
  $control-height: ( "mob": 32px, "xs": 40px, "md": 40px, "lg": 48px, );

  &__grid {
    @include bp-change(grid-gap, ("mob": 24px));

    display: grid;

    @media #{$mq-md} {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__card {
    @media #{$mq-md} {
      &:first-child {
        grid-column-end: 3;
        grid-column-start: 1;
      }
    }

    &--wide {
      @media #{$mq-md} {
        grid-column-end: 3;
        grid-column-start: 1;
      }
    }
  }

  ::v-deep {
    .q-tabs {
      &__arrow {
        display: none;
      }

      &__content {
        @include bp-change(
          grid-gap,
          (
            "mob": 12px,
          )
        );
        @include p-wider($container-padding);

        display: grid;
        grid-auto-flow: column;
        justify-content: start;
        overflow: scroll;

        // ghost
        &::after {
          content: "";
          display: block;
          height: 100%;
          width: 1px;
        }
      }
    }

    .q-tab {
      @include bp-change(
        padding,
        (
          "mob": 10px 15px,
          "xs": 12px 15px,
        )
      );

      background-color: transparent;
      border: 1px solid $grey;
      border-radius: 4px;
      transition: background-color $trs, border $trs, color $trs;

      .q-tab__label {
        padding: 0;
      }

      &__indicator {
        display: none;
      }

      &.q-router-link--exact-active,
      &:hover {
        @extend %highlighted-tab;

        .q-tab__label {
          color: $main-color;
        }
      }

      &__label {
        @include font(
          ("mob": 16px, "xs": 14px, "md": 14px, "lg": 18px),
          ("mob": 1.2, "xs": 1),
          500,
          -0.01em
        );

        color: $white;
        transition: color $trs;

        @media #{$mq-lg} {
          font-size: 18px !important;
        }
      }

      .q-ripple,
      .q-focus-helper {
        display: none;
      }
    }

    .q-tab-panel {
      padding: 0;
    }

    .q-tab-panels {
      @include bp-change(margin-top, ("mob": 24px, "xs": 28px, "lg": 35px));

      background: transparent;
      overflow: visible;
    }

    .q-panel {
      overflow: visible;
    }

    .q-separator {
      display: none;
    }
  }

  &__slider {
    @include bp-change(
      width,
      (
        "mob": 328px,
        "xs": 418px,
        "md": 910px,
        "lg": 1690px
      )
    );

    ::v-deep {
      .glide {
        &__slides {
          display: flex !important;
        }
      }
    }
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
      (
        "mob": 100%,
        "md": calc(100% + 40px),
        "lg": calc(100% + 48px)
      )
    );
    @include bp-change(
      bottom,
      ("mob": 40%, "xs": 43%)
    );

    align-items: center;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
  }

  &__slide {
    @include bp-change(min-height, ("mob": 201px, "xs": 258px, "md": 272px, "lg": 336px));

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

  &__slider-prev-btn,
  &__slider-next-btn {
    @include bp-change(width, $control-height);
    @include bp-change(height, $control-height);
    @include bp-change(font-size, ("mob": 9px, "lg": 12px));

    border: 1px solid $grey;
    pointer-events: auto;
    transition: opacity $trs, transform $trs !important;

    &--hide {
      opacity: 0;
      pointer-events: none;
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

  &__next {
    align-items: center;
    background: #2e3544;
    border-radius: 4px;
    color: $light-grey;
    display: flex;
    height: 100%;
    justify-content: center;
    text-align: center;
    width: 100%;

    &-descr {
      font-size: 12px;
      line-height: 120%;
      margin-top: 24px;

      @media #{$mq-xs} {
        font-size: 14px;
      }

      @media #{$mq-md} {
        font-size: 16px;
      }

      @media #{$mq-lg} {
        font-size: 18px;
      }
    }

    &-title {
      font-size: 16px;
      font-weight: 500;
      margin-top: 4px;

      @media #{$mq-xs} {
        font-size: 18px;
      }

      @media #{$mq-md} {
        font-size: 20px;
      }

      @media #{$mq-lg} {
        font-size: 24px;
      }
    }

    &-btn {
      background: $main-color;
      color: white;
      font-size: 1.4rem;
      height: 64px;
      width: 64px;

      @media #{$mq-xs} {
        height: 72px;
        width: 72px;
      }

      @media #{$mq-lg} {
        font-size: 1.6rem;
        height: 96px;
        width: 96px;
      }
    }
  }
}

.q-tab {
  ::v-deep {
    .q-tab__content {
      padding: 0 !important;
    }
  }

  &--active {
    @extend %highlighted-tab;

    ::v-deep {
      .q-tab__label {
        color: $main-color !important;
      }
    }
  }
}
</style>
