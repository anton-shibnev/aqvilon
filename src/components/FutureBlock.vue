<template>
  <outer
    :id="name | camelize"
    :class="`${name}-outer`"
  >
    <section :class="name">
      <div
        :class="`${name}__wrap`"
      >
        <div
          :class="`${name}__title`"
          v-text="options.your_office_title"
        />
        <div
          :class="`${name}__desc`"
        >
          <div
            :class="`${name}__desc-head`"
            v-text="options.your_office_subtitle"
          />
          <div
            :class="`${name}__desc-text`"
            v-text="options.your_office_description"
          />
        </div>
        <div
          :class="`${name}__list`"
        >
          <div
            v-for="(item, index) in options.office_points"
            :key="index"
            :class="`${name}__item`"
          >
            <img
              :src="item.icon"
              :class="`${name}__item-icon`"
            >
            <div
              :class="`${name}__item-title`"
              v-text="item.title"
            />
            <div
              :class="`${name}__item-desc`"
              v-text="item.desc"
            />
            <hr
              v-if="index !== options.office_points.length - 1"
              :class="`${name}__item-hr`"
            >
          </div>
        </div>
      </div>
      <q-intersection
        once
      >
        <pic
          :class="`${name}__pic`"
          :src="img"
        />
      </q-intersection>
    </section>
  </outer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Outer from 'components/base/Outer.vue';
import Pic from 'components/base/Pic.vue';

@Component({
  components: { Pic, Outer },
})
export default class ListPicBlock extends Vue {
  @Prop({ type: Object }) options: any | undefined

  name = 'future-block'

  get img() {
    if (this.options.your_office_image) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return `${process.env.API}${this.options.your_office_image[0].image_max_1920x1920.url}`;
    }
    return '';
  }
}
</script>

<style lang="scss" scoped>
$name: "future-block";

.#{$name}-outer {
  background-color: $secondary-light-color;
}

.#{$name} {
  $this: &;

  display: grid;

  @media #{$mq-md} {
    grid-gap: 163px;
    grid-template-columns: 1fr 470px;
    margin-bottom: -#{map-get($outer-padding, "md")};
  }

  @media #{$mq-lg} {
    grid-template-columns: 1fr 681px;
    margin-bottom: -#{map-get($outer-padding, "md")};
  }

  &__wrap {
    @media #{$mq-md} {
      align-content: start;
      display: grid;
      grid-template-areas:
        "title title"
        ". desc"
        ". list";
      grid-template-columns: 162px 1fr;
    }

    @media #{$mq-lg} {
      grid-template-columns: 229px 1fr;
    }
  }

  &__title {
    @extend %h2;

    @media #{$mq-md} {
      grid-area: title;
    }
  }

  &__desc {
    margin-top: 41px;

    @media #{$mq-xs} {
      margin-top: 57px;
    }

    @media #{$mq-md} {
      grid-area: desc;
      margin-top: 64px;
    }

    @media #{$mq-lg} {
      margin-top: 210px;
    }
  }

  &__desc-head {
    @extend %desc-head;
  }

  &__desc-text {
    @extend %desc-text;

    @include bp-change(margin-top, ("mob": 16px, "xs": 8px, "md": 16px, "lg": 24px));
  }

  &__list {
    display: grid;
    grid-gap: 24px;
    margin-top: 64px;

    @media #{$mq-xs} {
      margin-top: 47px;
    }

    @media #{$mq-md} {
      grid-area: list;
      grid-gap: 16px;
      margin-top: 63px;
    }

    @media #{$mq-lg} {
      grid-gap: 26px;
      margin-top: 72px;
    }
  }

  &__item {
    @include  bp-change(grid-gap, ("xs": 8px 32px, "md": 10px 25px, "lg": 12px 38px));

    @media #{$mq-xs} {
      display: grid;
      grid-template-areas:
        "item-icon item-title"
        "item-icon item-desc"
        "item-icon item-hr";
      justify-content: start;
    }
  }

  &__item-hr {
    @include bp-change(margin-top, ("mob": 16px, "xs": 9px,"md": -2px, "lg": 3px));

    background-color: $accent-elements;
    display: block;
    height: 1px;
    margin-bottom: 0;
    width: 100%;

    @media #{$mq-xs} { grid-area: item-hr; }

    @media #{$mq-md} { min-width: 410px; }
  }

  &__item-title {
    @extend  %future-block-item-title;

    margin-top: 16px;

    @media #{$mq-xs} {
      grid-area: item-title;
      margin-top: 0;
    }
  }

  &__item-desc {
    @extend  %future-block-item-desc;

    @include bp-change(max-width, ("md": 365px, "lg": 580px));

    color: $dark-grey;
    margin-top: 8px;

    @media #{$mq-xs} {
      grid-area: item-desc;
      margin-top: 0;
    }
  }

  &__item-icon {
    @include bp-change(font-size, ("mob": 64px,"xs": 56px, "lg": 64px));

    color: $accent-elements;

    @media #{$mq-xs} { grid-area: item-icon; }
  }

  &__pic {
    @include bp-change(margin-top, ("mob": 31px, "xs": 74px, "md": 73px, "lg": 106px));
    @include bp-change(height, ("xs": 420px, "md": 660px, "lg": 960px));

    @media #{$mq-md} {
      @include pin-out(right, map-get($container-padding, "md"));
    }

    @media #{$mq-lg} {
      @include pin-out(right, map-get($container-padding, "lg"));
    }
  }
}
</style>
