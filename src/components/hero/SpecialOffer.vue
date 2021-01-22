<template>
  <div
    :class="[
      name,
      { [`${name}--wide`]: wide },
      { [`${name}--in-header`]: inHeader }
    ]"
  >
    <q-icon
      name="svguse:icons.svg#offer-percent"
      :class="`${name}__icon`"
    />
    <q-carousel
      ref="carousel"
      vertical
      transition-prev="scale"
      transition-next="scale"
      swipeable
      animated
      :class="`${name}__slider`"
      v-model="slide"
    >
      <q-carousel-slide
        v-for="(item, index) in data"
        :key="index"
        :name="index"
        :class="`${name}__slide`"
        @click="handleClick(item)"
      >
        <div
          :class="`${name}__slide-title`"
        >
          {{ item.short_title }}
        </div>
        <div
          :class="`${name}__slide-desc`"
        >
          Акция: {{ item.end_date }}
        </div>
      </q-carousel-slide>

      <template v-slot:control>
        <div
          v-if="data.length > 1"
          :class="[`${name}__control`]"
        >
          {{ data.length }}
          <q-carousel-control
            :class="`${name}__prev`"
          >
            <q-btn
              round
              custom-color="secondary"
              icon="svguse:icons.svg#chevron-left"
              :class="`${name}__prev-btn`"
              @click="$refs.carousel.previous()"
            />
          </q-carousel-control>

          <div
            :class="`${name}__counter`"
          >
            <span
              :class="`${name}__counter-current`"
              v-text="slide + 1"
            />
            <span
              :class="`${name}__counter-length`"
              v-text="`/${data.length}`"
            />
          </div>

          <q-carousel-control
            :class="`${name}__next`"
          >
            <q-btn
              round
              custom-color="secondary"
              icon="svguse:icons.svg#chevron-right"
              :class="`${name}__next-btn`"
              @click="$refs.carousel.next()"
            />
          </q-carousel-control>
        </div>
      </template>
    </q-carousel>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
})
export default class SpecialOffer extends Vue {
  @Prop({ type: Object }) options: never | undefined
  @Prop({ type: Boolean, default: false }) wide: boolean | undefined
  @Prop({ type: Boolean, default: false }) inHeader: boolean | undefined
  @Prop({ type: Array }) data: any | undefined

  name = 'special-offer'
  slide = 0
  slideList = [
    {
      title: 'Ипотека под 0% на 12 месяцев',
      desc: 'Акция: до 20.08.2020',
    },
    {
      title: 'Ипотека под 0% на 12 месяцев',
      desc: 'Акция: до 20.08.2020',
    },
    {
      title: 'Ипотека под 0% на 12 месяцев',
      desc: 'Акция: до 20.08.2020',
    },
  ]

  handleClick(slide: any) {
    void this.$router.push({ path: `discount/${slide.slug}` });
  }
}
</script>

<style lang="scss" scoped>
.special-offer {
  $this: &;

  @include bp-change(width, ("mob": 100%, "xs" : 372px, "lg": 431px));
  @include bp-change(height, ("mob": 93px, "lg": 103px));

  overflow: hidden;
  position: relative;

  &--in-header {
    #{$this}__slider {
      @media #{$mq-xs} {
        border-radius: 0 0 5px 5px !important;
        width: 100% !important;
      }
    }

    #{$this}__control {
      @media #{$mq-xs} {
        color: $white;
        right: 18px !important;
      }
    }
  }

  &--wide {
    width: 100% !important;

    #{$this}__slider {
      border-radius: 0 !important;
      width: 100% !important;
    }

    #{$this}__control {
      color: $white;
      right: 18px !important;
    }
  }

  &__icon {
    @include abs-center-y();
    @include bp-change(left,("mob": -27px, "xs": -30px, "md": -32px));
    @include font(("mob": 78px, "md": 80px));

    color: $secondary-light-color;
    z-index: 10;
  }

  &__slider {
    background-color: $primary;
    height: 100%;
    overflow: visible;
    position: relative;

    @media #{$mq-xs} {
      border-radius: 5px;
      width: calc(100% - 40px);
    }
  }

  &__slide {
    align-items: center;
    color: $white;
    display: grid;
    grid-gap: 8px;
    padding: 26px 24px 28px 63px !important;

    @media #{$mq-lg} {
      padding: 26px 24px 28px 76px !important;
    }
  }

  &__control {
    bottom: 0;
    display: grid;
    height: 100%;
    justify-content: space-between;
    position: absolute;
    right: 13px;
    top: 0;

    @media #{$mq-xs} {
      right: -43px;
    }

    &--hide {
      opacity: 0;
    }
  }

  &__counter {
    color: $white;
    text-align: center;
    z-index: 10;
  }

  &__counter-current {
    @extend %hero-counter-current;
  }

  &__counter-length {
    @extend %hero-counter-length;
  }

  &__slide-title {
    @extend %text-8;
  }

  &__slide-desc {
    @extend %text-9;
  }

  &__prev,
  &__next {
    margin: 0 !important;
    position: relative;
  }

  &__prev-btn,
  &__next-btn {
    font-size: 12px;
    transform: rotate(90deg);
  }
}

::v-deep {
  .q-focus-helper,
  .q-ripple {
    display: none !important;
  }
}
</style>
