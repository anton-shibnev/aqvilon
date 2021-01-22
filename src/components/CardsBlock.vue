<template>
  <outer
    :id="name | camelize"
    :class="`${name}-outer`"
  >
    <div :class="name">
      <div
        :class="`${name}__title`"
        v-text="options.pay_system_title"
      />
      <div
        :class="`${name}__card-list`"
      >
        <div
          v-for="(card, index) in options.pay_system_points"
          :key="index"
          :class="`${name}__card`"
        >
          <div
            :class="`${name}__card-circle`"
          >
            <img
              :class="`${name}__card-icon`"
              :src="card.icon"
            >
          </div>
          <div
            :class="`${name}__card-title`"
            v-text="card.title"
          />
          <div
            :class="`${name}__card-desc`"
            v-text="card.desc"
          />
        </div>
      </div>
    </div>
  </outer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Outer from 'components/base/Outer.vue';

@Component({
  components: { Outer },
})
export default class CardsBlock extends Vue {
  @Prop({ type: Object }) options: never | undefined

  name = 'cards-block'
}
</script>

<style lang="scss" scoped>
$name: "cards-block";
.#{$name}-outer {
  background-color: $light-grey;
}

.#{$name} {
  @extend %container-kid;

  @media #{$mq-lg} { padding-bottom: 10px; }

  &__title {
    @extend %h2;

    @media #{$mq-xs} {
      text-align: center;
    }
  }

  &__card-list {
    @include bp-change(margin-top, ("mob": 32px, "xs": 49px, "md": 55px, "lg": 71px) );
    @include bp-change(grid-gap, ("mob": 16px, "xs": 24px, "md": 20px) );

    display: grid;

    @media #{$mq-md} {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__card {
    @include bp-change(padding, ("mob": 40px 24px, "xs": 56px 24px 64px, "md": 40px 16px, "lg": 55px 35px) );

    align-content: start;
    background-color: $secondary-light-color;
    border-radius: 5px;
    display: grid;
    justify-content: center;
    justify-items: center;
    text-align: center;
  }

  &__card-title {
    @extend %cards-block-card-title;

    @include bp-change(margin-top, ("mob": 24px, "xs": 32px, "md": 24px, "lg": 40px) );
  }

  &__card-desc {
    @extend %cards-block-card-desc;

    @include bp-change(margin-top, ("mob": 8px, "md": 13px, "lg": 19px) );

    max-width: 350px;
  }

  &__card-circle {
    @include circle(("mob": 96px, "lg": 128px));

    align-items: center;
    background-color: $light-grey;
    display: grid;
    justify-content: center;
  }

  &__card-icon {
    font-size: 55px;
  }
}
</style>
