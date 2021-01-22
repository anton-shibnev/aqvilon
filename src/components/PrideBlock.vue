<template>
  <outer
    :id="name | camelize"
    :class="`${name}__outer`"
  >
    <div :class="name">
      <div
        :class="`${name}__title`"
      >
        Ключевой арендатор
      </div>
      <div
        :class="`${name}__wrap-desc`"
      >
        <div :class="`${name}__wrap-logo`">
          <q-img
            v-if="options.tenant_img"
            :src="options.tenant_img"
            :class="`${name}__medals`"
          />
        </div>
        <p
          :class="`${name}__desc`"
          v-text="options.tenant_desc"
        />
        <Btn
          v-if="$q.screen.gt.xs"
          custom-color="secondary"
          label="Перейти на сайт"
          icon-right="svguse:icons.svg#external-link"
          :class="`${name}__btn`"
          @click="linkTo(options.tenant_link)"
        />
      </div>

      <div :class="`${name}__list-wrap`">
        <q-img
            v-if="options.tenant_bckgr && options.tenant_bckgr[0].image_max_1920x1920.url"
            :src="proc(options.tenant_bckgr[0].image_max_1920x1920.url)"
            :class="`${name}__img`"
        />
        <ul
            :class="`${name}__list`"
        >
          <li
              v-for="(item, index) in options.tenant_points"
              :key="index"
              :class="`${name}__list-item`"
          >
            <div
                :class="`${name}__item-title`"
                v-text="item.title"
            />
            <div
                :class="`${name}__item-desc`"
                v-text="item.desc"
            />
          </li>
          <Btn
              v-if="$q.screen.lt.sm"
              custom-color="secondary"
              label="Перейти на сайт"
              icon-right="svguse:icons.svg#external-link"
              :class="`${name}__btn`"
              @click="linkTo(options.tenant_link)"
          />
        </ul>
      </div>
    </div>
  </outer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Outer from 'components/base/Outer.vue';
import Btn from 'components/base/Btn.vue';
import { openURL } from 'quasar';

@Component({
  components: { Btn, Outer },
})
export default class PrideBlock extends Vue {
  @Prop({ type: Object }) options: never | undefined

  name = 'pride-block'

  linkTo(link: string) {
    openURL(link);
  }

  proc(src: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${process.env.API}${src}`;
  }
}
</script>

<style lang="scss" scoped>
// $
.pride-block {
  @media #{$mq-md} {
    display: grid;
    grid-gap: 39px 101px;
    grid-template-areas:
      "title title"
      "wrap-desc list";
    grid-template-columns: 633px 1fr;
  }

  @media #{$mq-lg} {
    grid-gap: 39px 134px;
    grid-template-columns: 890px 1fr;
  }

  &__outer {
    @media #{$mq-xs} {
      background: $light-grey;
    }
  }

  &__title {
    @extend %h2;

    margin-bottom: 32px;

    @media #{$mq-xs} {
      margin-bottom: 40px;
    }

    @media #{$mq-xs} {
      margin-bottom: 0;
    }
  }

  &__wrap-desc {
    @include bp-change(margin-top, ("md": 0, "lg": 8px));

    @media #{$mq-md} { grid-area: wrap-desc; }
  }

  &__wrap-logo {
    @include bp-change(max-width, ("mob": 280px, "xs": 307px, "lg": 408px));
    @include bp-change(margin, ("mob": 0 0 23px, "xs": 39px 0 31px, "md": 40px 0 31px, "lg": 60px 0 40px));
  }

  &__medals {
    @include bp-change(margin-top, ("mob": 13px, "lg": 17px));

    height: auto !important;
    // @include wh-arr(("mob": (192px, 45px), "xs": (206px, 48px), "lg": (273px, 64px)));

    width: 100% !important;
  }

  &__desc {
    @extend %pride-block-desc;

    @include bp-change(margin-bottom, ("mob": 17px, "xs": 18px, "lg": 24px));
    @include bp-change(max-width, ("md": 470px, "lg": 661px));

    white-space: pre-wrap;
  }

  &__btn {
    @include bp-change(margin-top, ("mob": 21px, "xs": 28px, "md": 32px, "lg": 64px ));

    @media (max-width: $breakpoint-xs) {
      margin: 0 auto;
      width: 226px;
    }
  }

  &__list {
    @include bp-change(margin-top, ("mob": 32px, "xs": 39px, "md": 0, "lg": 205px ));

    background: $white;
    display: grid;
    grid-gap: 32px;

    @media #{$mq-xs} {
      bottom: -30px;
      grid-gap: 27px 20px;
      grid-template-columns: repeat(2, 1fr);
      padding: 32px 40px;
      position: absolute;
      right: 0;
    }

    @media #{$mq-md} {
      bottom: -75px;
      padding: 40px 48px;
      right: 0;
      width: 752px;
    }

    @media #{$mq-lg} {
      bottom: -100px;
      grid-row-gap: 66px;
      padding: 56px 60px;
      width: 1010px;
    }

    &-wrap {
      @media #{$mq-xs} {
        margin-right: -30px;
        position: relative;
      }

      @media #{$mq-md} {
        grid-area: list;
        margin-right: -40px;
      }

      @media #{$mq-lg} {
        margin-right: -60px;
      }
    }
  }

  &__img {
    margin-top: 40px;

    @media #{$mq-xs} {
      height: 512px;
    }

    @media #{$mq-md} {
      height: 455px;
      margin-top: -140px;
      position: absolute;
      right: 0;
      width: 600px;
    }

    @media #{$mq-lg} {
      height: 622px;
      margin-top: -200px;
      width: 848px;
    }
  }

  &__list-item {
    border-bottom: 1px solid $grey;
    padding-bottom: 10px;
  }

  &__item-title {
    @extend %pride-block-item-title;

    color: $accent-button !important;
  }

  &__item-desc {
    @extend %pride-block-item-desc;

    color: $main-color;
    margin-top: 4px;
  }
}
</style>
