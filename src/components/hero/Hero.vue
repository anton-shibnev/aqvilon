<template>
  <section
    :id="bem"
    ref="hero"
    :class="bem"
  >
    <special-offer
      v-if="serverData.promo_bage && serverData.promo_bage.length"
      :class="`${bem}__special-offer`"
      :data="serverData.promo_bage"
    />
    <div
      :class="`${bem}__text`"
    >
      <div
        :class="`${bem}__top`"
      >
        <div
          :class="`${bem}__title`"
        >
          АКВИЛОН LINKS
        </div>
        <div
          :class="`${bem}__sub-title`"
        >
          БИЗНЕС-ЦЕНТР <span>КЛАССА «А»</span>
        </div>
      </div>
      <div
        :class="`${bem}__date`"
      >
        <div
          :class="`${bem}__date-desc`"
        >
          Срок сдачи:
        </div>
        <div
          :class="`${bem}__date-release`"
        >
          {{ serverData.prjct_end_date_txt || 'IV КВАРТАЛ 2021 ГОДА' }}
        </div>
      </div>
    </div>
    <q-carousel
      animated
      :class="`${bem}__carousel`"
      :autoplay="autoplayTime"
      swipeable
      infinite
      navigation
      v-model="currSlide"
      @mouseenter="isAutoplay = false"
      @mouseleave="isAutoplay = true"
    >
      <template #navigation-icon="{ active, btnProps, onClick }">
        <q-circular-progress
          v-if="serverData.first_block_images.length"
          :class="`${bem}__nav-item`"
          :value="active ? n : circleValue"
          size="12px"
          :thickness="1"
          :color="active ? 'primary' : 'white'"
          track-color="orange"
          @click="onClick()"
        />
      </template>
      <q-carousel-slide
        v-for="(item, index) in serverData.first_block_images"
        :key="index"
        :name="item.id"
        :class="`${bem}__slide`"
      >
        <q-img
          :class="`${bem}__slide-pic`"
          :src="proc(item.image_max_1920x1920.url)"
        />
      </q-carousel-slide>
    </q-carousel>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import SpecialOffer from 'components/hero/SpecialOffer.vue';

@Component({
  components: { SpecialOffer },
})
export default class Hero extends Vue {
  @Prop() options: any | undefined
  @Prop() serverData: any | undefined

  bem = 'hero'

  isAutoplay = true

  autoplayTime = 4000

  circleValue = 100

  currSlide: any = this.serverData!.first_block_images[0]!.id

  n = 100

  proc(src: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${process.env.API}${src}`;
  }

  // interval() {
  //   setInterval(() => {
  //     if (this.n < 100) {
  //       this.n += 1;
  //     } else {
  //       this.n = 0;
  //     }
  //   }, 60);
  // }
  //
  // created() {
  //   this.interval();
  // }
}
</script>

<style lang="scss" scoped>
// $
.hero {
  display: grid;
  grid-template-rows: 1fr auto;
  height: calc(100vh - #{map-get($header-height, "mob")});
  height: 100vh;
  left: 0;
  position: relative;
  scroll-snap-align: start;
  top: 0;
  user-select: none;
  width: 100%;

  @media #{$mq-xs} {
    height: calc(100vh - #{map-get($header-height, "xs")});
  }

  @media #{$mq-md} {
    height: calc(100vh - #{map-get($header-height, "md")});
    min-height: 400px;
    position: absolute;
  }

  @media #{$mq-lg} {
    height: calc(100vh - #{map-get($header-height, "lg")});
  }

  &__text {
    @include padding-x-arr($container-padding);
    @include bp-change(padding-bottom, ("mob": 76px, "xs": 118px, "md": 107px, "lg": 139px));
    @include bp-change(grid-gap, ("mob": 23px, "xs": 28px, "lg": 36px));

    bottom: 0;
    color: $white;
    display: grid;
    pointer-events: none;
    position: absolute;
    z-index: 10;
  }

  &__carousel {
    height: 100%;
    position: absolute;
    width: 100%;
  }

  &__title {
    @extend %main-title;

    text-transform: uppercase;
  }

  &__sub-title {
    @extend %hero-sub-title;

    text-transform: uppercase;

    ::v-deep span {
      color: $accent-elements;
    }
  }

  &__date {
    display: grid;
    grid-gap: 1px;
  }

  &__date-desc {
    @extend %text-3;
  }

  &__date-release {
    @extend %text-4;

    @media #{$mq-lg} {
      margin-top: 3px;
    }
  }

  &__slide {
    @extend %container-padding;

    @include bp-change(padding-bottom, ("mob": 76px, "xs": 118px, "md": 106px, "lg": 141px));
    @include bp-change(grid-gap, ("mob": 24px, "xs": 28px, "lg": 36px));

    align-content: end;
    display: grid;
    padding-top: 20px;
    position: relative;

    &::after {
      @include abs-spread();

      background: linear-gradient(180deg, rgba(14, 15, 18, 0) 61.72%, #0e0f12 100%);
      content: "";
      display: block;
      opacity: 0.24;
      z-index: 5;
    }
  }

  &__slide-pic {
    @include abs-spread();
  }

  &__nav-item {
    cursor: pointer;
    z-index: 300;
  }

  &__special-offer {
    @include bp-change(right, $container-padding);

    position: absolute;
    right: 0;
    z-index: 10;

    @media #{$mq-xs} {
      top: 64px;
    }
  }
}

::v-deep {
  .q-carousel {
    &__navigation-inner {
      display: grid;
      grid-auto-flow: column;
      grid-gap: 16px;
      justify-content: start;
    }

    &__navigation {
      @include bp-change(left, $container-padding);
      @include bp-change(bottom, ("mob": 23px, "xs": 66px, "md": 38px, "lg": 58px));

      width: max-content;

      .q-btn {
        margin: 0;
      }
    }
  }

  .q-circular-progress__track {
    opacity: 0;
  }
}
</style>
