<template>
  <outer
    :id="name | camelize"
    :class="`${name}-outer`"
  >
    <section :class="name">
      <div
        v-for="(box, index) in options.advantages"
        :key="index"
        :class="`${name}__box`"
      >
        <div
          :class="`${name}__box-title`"
          v-text="box.title"
        />
        <div
          :class="`${name}__wrap-nums`"
        >
          <template
            v-for="(num, j) in box.numList"
          >
            <div
              :key="j"
              :class="[`${name}__num`, `${name}__num--${j + 1}`]"
            >
              <div
                :class="`${name}__num-name`"
                v-text="num.name"
              />
              <div
                :class="`${name}__num-value`"
              >
                {{ num.value }} {{ box.unit }}
              </div>
            </div>
            <span
              v-if="box.separator && j === 0"
              :key="j + 999"
              :class="[`${name}__separator`, `${name}__separator--${box.separator}`]"
            />
          </template>
        </div>
      </div>
    </section>
  </outer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Outer from 'components/base/Outer.vue';

@Component({
  components: { Outer },
})
export default class NumbersBlock extends Vue {
  @Prop({ type: Object }) options: never | undefined

  name = 'numbers-block'
}
</script>

<style lang="scss" scoped>
$name: "numbers-block";

.#{$name}-outer {
  @media #{$mq-lg} {
    @include padding-y(64px);
  }
}

.#{$name} {
  @include bp-change(grid-gap, ("mob": 17px, "xs": 25px, "md": 20px) );
  @include bp-change(grid-template-rows, ("xs": repeat(2, 215px), "md": 1fr) );

  display: grid;

  @media #{$mq-md} {
    grid-template-columns: repeat(2, 1fr);
  }

  &__box {
    @include bp-change(
      padding,
      (
        "mob": 32px 16px,
        "xs": 33px 32px 40px,
        "md": 32px,
        "lg": 64px 64px 72px
      ));

    background-color: $secondary-light-color;
    display: grid;
  }

  &__box-title {
    @extend %text-10;
  }

  &__wrap-nums {
    @include bp-change(margin-top, ("mob": 34px, "xs": 30px, "md": 38px, "lg": 26px) );

    align-items: center;
    display: grid;
    grid-template-areas: "num-1 seporator" "num-2 .";
    grid-template-columns: max-content auto max-content;
    justify-content: start;

    @media #{$mq-xs} {
      display: grid;
      grid-template-areas: "num-1 seporator num-2";
      justify-content: start;
    }
  }

  &__num {
    position: relative;

    @for $i from 1 through 2 {
      &--#{$i} { grid-area: num-#{$i}; }
    }

    &:first-child {
      @include bp-change(margin-bottom, ("mob": 27px, "xs": 0));
    }
  }

  &__num-name {
    @extend %number-block-num-name;

    @media #{$mq-xs} {
      position: absolute;
      top: -20px;
    }
  }

  &__num-value {
    @extend %text-11;

    @include bp-change(margin-top, ("mob": 1px, "lg": 3px));

    color: $accent-elements;
  }

  &__separator {
    background-color: $accent-elements;
    grid-area: seporator;

    &--dash {
      @include bp-change(width, ("mob": 68px, "xs": 153px, "lg": 219px));
      @include margin-x-arr((
        "mob": (0, 25px),
        "xs": (46px, 40px),
        "md": (45px, 41px),
        "lg": (63px, 56px)
      ));

      display: block;
      height: 4px;
    }

    &--slash {
      @include bp-change(height, ("mob": 60px, "xs": 85px, "lg": 94px));
      @include margin-x-arr((
        "mob": (32px, 40px),
        "xs": (56px, 43px),
        "md": (55px, 44px),
        "lg": (86px, 72px)
      ));

      display: block;
      transform: skewX(-15deg);
      width: 4px;
    }
  }
}
</style>
