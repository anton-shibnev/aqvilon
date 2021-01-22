<template>
  <section
    :class="name"
  >
    <q-img
      :class="`${name}__bg`"
      src="images/404/bg-360.png"
      srcset="images/404/bg-360.png 360w,
              images/404/bg-768.png 768w,
              images/404/bg-1366.png 1366w"
      sizes="(max-width: 768px) 360w,
             (min-width: 768px) and (max-width: 1366px) 768w,
             (min-width: 1366px) 1366w"
    />
    <div
      :class="`${name}__inner`"
    >
      <div
        :class="`${name}__text`"
      >
        <div
          :class="`${name}__title`"
        >
          Страница
          <br>
          не найдена
        </div>
        <div
          :class="`${name}__desc`"
        >
          К сожалению, такой страницы нет, либо она была удалена. Попробуйте перейти на
          <router-link
            to="/"
            v-text="'главную'"
          />.
        </div>
      </div>
      <q-img
        :class="`${name}__pic`"
        src="images/404/sign.svg"
        contain
      />
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Error404 extends Vue {
  @Prop({ type: Object }) options: never | undefined
  name = 'error-404'
}
</script>

<style lang="scss" scoped>
// $
.error-404 {
  background-color: $light-grey;
  color: $black;
  height: 100%;
  padding: 48px 16px 0 24px;

  &__inner {
    height: 100%;
    margin: 0 auto;
    position: relative;

    @media #{$mq-xs} {
      align-content: end;
      align-items: center;
      display: grid;
      grid-template-areas: "text pic";
      grid-template-columns: repeat(2, 1fr);
    }

    @media #{$mq-md} {
      grid-gap: 60px;
      grid-template-columns: 470px 1fr;
      max-width: 970px;
    }

    @media #{$mq-lg} {
      grid-gap: 70px;
      grid-template-columns: 660px 1fr;
      max-width: 1350px;
    }
  }

  &__text {
    @media #{$mq-xs} {
      align-self: start;
      grid-area: text;
      margin-top: 57px;
    }

    @media #{$mq-lg} {
      margin-top: 102px;
    }
  }

  &__bg {
    @include abs-spread();
  }

  &__title {
    @include font(("mob": 32px, "xs": 56px, "lg": 88px), 1, 500, ("mob": -0.01em, "lg": -0.03em), $font-secondary);

    position: relative;
    z-index: 5;
  }

  &__desc {
    @include font(("mob": 16px, "xs": 20px, "lg": 24px), ("mob": 1.2, "lg": 1.33), 400, -0.01em);
    @include bp-change(margin-top, ("mob": 16px, "xs": 24px));

    position: relative;
    z-index: 5;

    @media #{$mq-xs} {
      grid-area: desc;
    }
  }

  &__pic {
    height: 341px;

    @media #{$mq-xs} {
      bottom: auto;
      grid-area: pic;
      height: 491px;
      left: auto;
      margin-left: -8px;
      position: relative;
    }

    @media #{$mq-lg} {
      height: 691px;
      margin-left: 0;
    }
  }

}
</style>
