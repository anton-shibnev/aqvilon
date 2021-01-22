<template>
  <outer
    :id="name | camelize"
    :class="`${name}-outer`"
  >
    <section :class="name">
      <div
        :class="`${name}__title`"
      >
        <span>{{ options.block_2_title }}</span>
        <hr
          :class="`${name}__title-hr`"
        >
      </div>
      <div
        :class="`${name}__list`"
      >
        <div
          v-for="(item, index) in options.block_2_textcards"
          :key="index"
          :class="`${name}__item`"
        >
          <div
            :class="`${name}__item-title`"
            v-text="item.title"
          />
          <div
            :class="`${name}__item-desc`"
            v-text="item.text"
          />
        </div>
      </div>
      <q-intersection
        once
        ssr-prerender
        :class="`${name}__pic`"
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

  name = 'list-pic-block'

  get img() {
    if (this.options.block_2_image) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return `${process.env.API}${this.options.block_2_image.url}`;
    }
    return '';
  }
}
</script>

<style lang="scss" scoped>
$name: "list-pic-block";

.#{$name}-outer {
  background-color: $white;
  position: relative;
  z-index: 10;
}

.#{$name} {
  @include bp-change(grid-gap, ("md": 64px 75px, "lg": 120px 124px));

  @media #{$mq-md} {
    align-items: start;
    display: grid;
    grid-template-areas:
      "pic title"
      "pic list";
    grid-template-columns: 415px 1fr;
    grid-template-rows: auto 1fr;
    margin-bottom: -#{map-get($outer-padding, "md")};
  }

  @media #{$mq-lg} {
    grid-template-columns: 455px 1fr;
    margin-bottom: -#{map-get($outer-padding, "lg")};
  }

  &__title {
    @extend %h2;

    @include bp-change(margin-top,( "md": 54px, "lg": 66px) );

    @media #{$mq-md} {
      align-items: center;
      align-self: end;
      display: grid;
      grid-area: title;
      grid-gap: 104px;
      grid-template-columns: min-content 1fr;
    }
  }

  &__title-hr {
    display: none;

    @media #{$mq-md} {
      @include pin-out(right, map-get($container-padding, "md"));

      background-color: $secondary-color;
      display: block;
      width: calc(100% + #{map-get($container-padding, "md")});
    }

    @media #{$mq-lg} {
      @include pin-out(right, map-get($container-padding, "lg"));

      width: calc(100% + #{map-get($container-padding, "lg")});
    }
  }

  &__list {
    @include bp-change(grid-gap, ("mob": 23px, "xs": 40px 20px, "md": 40px 60px, "lg": 55px 104px));
    @include bp-change(margin-top, ("mob": 41px, "xs": 55px, "md": 0));

    display: grid;
    margin-top: 41px;

    @media #{$mq-xs} {
      align-items: start;
      grid-template-columns: repeat(2, 1fr);
    }

    @media #{$mq-md} {
      grid-area: list;
    }
  }

  &__item {
    @include bp-change(grid-gap, ("mob": 8px, "md": 16px, "lg": 24px));

    display: grid;
  }

  &__item-title {
    @extend %text-6;
  }

  &__item-desc {
    @extend %text-7;

    color: $dark-grey;
  }

  &__pic {
    height: 116vw;
    margin-top: 39px;

    @media #{$mq-xs} {
      height: 54.6vw;
      margin-top: 54px;
    }

    @media #{$mq-md} {
      @include pin-out(left,map-get($container-padding, "md"));

      grid-area: pic;
      height: 618px;
      margin-top: 0;
    }

    @media #{$mq-lg} {
      @include pin-out(left, map-get($container-padding, "lg"));

      height: 840px;
    }
  }
}
</style>
