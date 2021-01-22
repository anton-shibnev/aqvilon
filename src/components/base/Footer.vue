<template>
  <q-footer
    :id="name | camelize"
    :class="name"
  >
    <div class="container">
      <div
        :class="`${name}__inner`"
      >
        <q-img
          :class="`${name}__logo`"
          :src="options.logoSrc"
        />
        <q-btn
          icon="svguse:icons.svg#arrow-up"
          :label="$q.screen.gt.xs ? 'Наверх' : ''"
          :class="`${name}__scroll-top`"
          @click.native="scrollTo()"
        />
        <div
          :class="`${name}__office-list`"
        >
          <div
            v-for="(office, index) in page.offices"
            :key="index"
            :class="`${name}__office`"
          >
            <span
              :class="`${name}__office-name--head ${name}__office-name`"
              v-text="office.title"
            />
            <div
              :class="`${name}__office-value`"
              v-text="office.address"
            />
            <div
              :class="`${name}__office-value`"
              v-text="office.work_time"
            />
            <div v-if="office.phones">
              <a
                v-for="phone in office.phones"
                :key="phone.name"
                :class="`${name}__office-value ${name}__link`"
                :href="phone.name"
                v-text="phone.name"
              />
            </div>
            <a
              :href="`mailto:${office.email}`"
              :class="`${name}__office-value ${name}__link`"
              v-text="office.email"
            />
          </div>
        </div>
        <div
          :class="`${name}__soc-list`"
        >
          <span
            v-for="(soc, index) in options.socList"
            :key="index"
            :class="`${name}__soc-item`"
            active-class=""
            @click="linkTo(soc.href)"
          >
            <q-icon
              :name="`svguse:icons.svg#${soc.icon}`"
            />
          </span>
        </div>

        <div
          :class="`${name}__bottom`"
        >
          <div
            :class="`${name}__dev`"
          >
            <div
              :class="`${name}__dev-desc`"
              v-text="options.devDesc"
            />
            <div
              :class="`${name}__dev-wrap`"
            >
              <hr
                :class="`${name}__dev-hr`"
              >
              <q-img
                :class="`${name}__dev-logo`"
                :src="options.devLogoSrc"
              />
            </div>
          </div>
          <div
            :class="`${name}__bottom-wrap`"
          >
            <div
              :class="`${name}__bottom-list`"
            >
              <a
                v-for="(item, index) in options.bottomList"
                :key="index"
                target="_blank"
                :class="`${name}__bottom-list-item`"
                :href="item.href"
                v-text="item.text"
              />
            </div>

            <div
              :class="`${name}__disclaimer`"
              v-text="options.disclaimer"
            />

            <div
              :class="`${name}__web-dev`"
            >
              <div
                :class="`${name}__web-dev-desc`"
              >
                Разработано:
              </div>
              <a
                :class="`${name}__web-dev-link`"
                target="_blank"
                :href="options.webDev.href"
                v-text="options.webDev.text"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-footer>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { openURL, QFooter, scroll } from 'quasar';
import { getModule } from 'vuex-module-decorators';
import UI from 'src/store/modules/UI';

@Component({
})
export default class Footer extends QFooter {
  @Prop({ type: Object }) options: never | undefined
  // @Prop({ type: Boolean, default: false }) static: boolean | undefined;

  name = 'footer'

  ui = getModule(UI, this.$store)

  get page(): any {
    return this.ui.pageInfo as any;
  }

  scrollTo() {
    if (process.env.CLIENT) {
      const elem: any = document.body;
      const { getScrollTarget, setScrollPosition } = scroll;
      const target = getScrollTarget(elem);
      const offset = elem.offsetTop;
      const duration = 500;
      setScrollPosition(target, offset, duration);
    }
  }

  linkTo(link: string) {
    openURL(link);
  }
}
</script>

<style lang="scss" scoped>
// $
.footer {
  background-color: $main-color;
  color: $white;
  position: static;
  width: 100%;

  //@media #{$mq-md} {
  //  bottom: 0;
  //  position: fixed;
  //}

  @media (max-height: $max-height-for-footer) {
    position: static !important;
  }

  &--static {
    @media #{$mq-md} {
      position: static;
    }
  }

  &__inner {
    @include padding-y-arr((
      "mob": (48px, 32px),
      "xs": (64px, 48px),
      "md": (74px, 34px),
      "lg": (104px, 33px),
    ));

    display: grid;

    @media #{$mq-md} {
      grid-template-areas:
        "logo list soc"
        "bottom bottom bottom";
      grid-template-columns: 490px 1fr auto;
      position: relative;
    }

    @media #{$mq-lg} {
      grid-template-columns: 683px 1fr auto;
    }
  }

  &__logo {
    @include wh(248px, 113px);

    display: block;
    justify-self: center;

    @media #{$mq-xs} {
      @include wh(184px, 84px);

      justify-self: start;
    }

    @media #{$mq-md} {
      @include wh(307px, 140px);
    }

    @media #{$mq-lg} {
      @include wh(435px, 198px);

      margin-top: 31px;
    }
  }

  &__office-list {
    display: grid;
    grid-gap: 19px;
    margin-top: 40px;
    max-width: 240px;

    @media #{$mq-xs} {
      grid-template-columns: repeat(2, 1fr);
      max-width: none;
    }

    @media #{$mq-md} {
      grid-area: list;
      grid-gap: 0;
      margin-top: 0;
    }
  }

  &__office-item {
    @include bp-change(margin-bottom, ("mob": 12px, "md": 13px));
  }

  &__office-name {
    @extend %footer-office-name;

    @include bp-change(margin-bottom, ("mob": 8px, "md": 8px));

    color: $grey;

    &--head {
      @extend %footer-office-name-head;

      @include bp-change(margin-bottom, ("mob": 12px, "md": 17px));

      display: block;
    }
  }

  &__office-value {
    @extend %footer-office-value;

    @include bp-change(max-width, ("md": 230px));
    @include bp-change(margin-bottom, ("mob": 12px));

    display: block;

    &--link {
      @extend %footer-office-value-link;

      width: max-content;
    }
  }

  &__link {
    color: $secondary-color;
    transition: color $trs;

    &:hover {
      color: $white;
    }
  }

  &__soc-list {
    @include bp-change(margin-top, ("mob": 17px, "xs": 40px, "md": -7px, "lg": -10px));
    @include bp-change(grid-gap, ("mob": 24px, "md": 22px, "lg": 32px));

    align-items: start;
    display: grid;
    grid-auto-flow: column;
    justify-content: start;

    @media #{$mq-md} { grid-area: soc; }
  }

  &__soc-item {
    @include bp-change(font-size, ("mob": 48px, "xs": 32px, "lg": 48px));

    color: $white;
    cursor: pointer;

    &:hover {
      color: $secondary-color;
    }

  }

  &__bottom {
    @include bp-change(margin-top, ("mob": 41px, "xs": -9px,"md": 37px, "lg": 56px));

    @media #{$mq-md} {
      grid-area: bottom;
    }
  }

  &__dev {
    display: grid;

    @media #{$mq-xs} { grid-area: dev; }
  }

  &__dev-wrap {
    @include bp-change(grid-gap, ("mob": 29px, "xs": 34px, "lg": 56px));

    align-items: center;
    display: grid;
    grid-gap: 29px;
    grid-template-columns: 1fr auto;
  }

  &__dev-hr {
    @include bp-change(transform, ("xs": translateY(2px), "lg": translateY(7px)));

    background-color: rgba($white, 0.2);
    width: 100%;
  }

  &__dev-desc {
    @extend %footer-dev-desc;

    color: $grey;
    justify-self: end;
  }

  &__dev-logo {
    @include wh(143px, 28px);

    margin-top: 3px;
    position: relative;

    @media #{$mq-xs} { @include wh(150px, 27px); }

    @media #{$mq-md} { @include wh(144px, 27px); }

    @media #{$mq-lg} { @include wh(172px, 32px); }
  }

  &__bottom-wrap {
    @include bp-change(margin-top, ("mob": 22px, "xs": 4px, "md": 31px));

    @media #{$mq-xs} {
      display: grid;
      grid-template-areas:
        "bottom-list bottom-list"
        "disc web-dev";
    }

    @media #{$mq-md} {
      grid-template-areas: "disc bottom-list web-dev";
    }
  }

  &__bottom-list {
    @include bp-change(grid-gap, ("mob": 10px, "xs": 12px));

    display: grid;

    @media #{$mq-xs} {
      grid-area: bottom-list;
      grid-auto-flow: column;
      justify-content: start;
    }
  }

  &__bottom-list-item {
    @extend  %footer-bottom-list-item;

    @include wh(max-content);

    color: $grey;

    &:hover { color: $secondary-color; }
  }

  &__disclaimer {
    @extend %footer-disclaimer;

    @include bp-change(margin-top, ("mob": 20px, "xs": 8px, "md": 0));
    @include bp-change(max-width, ("xs": 84%, "md": 625px));

    color: $dark-grey;

    @media #{$mq-xs} { grid-area: disc; }
  }

  &__web-dev {
    @include bp-change(margin-top, ("mob": 24px, "xs": 11px, "md": 0));
    @include bp-change(grid-gap, ("mob": 8px, "xs": 1px));

    align-items: baseline;
    display: grid;
    grid-auto-flow: column;
    justify-content: start;

    @media #{$mq-xs} {
      align-content: start;
      grid-area: web-dev;
      grid-auto-flow: row;
      justify-content: end;
      justify-items: end;
    }
  }

  &__web-dev-desc {
    @extend %footer-web-dev-desc;

    color: $grey;
  }

  &__web-dev-link {
    @extend %footer-web-dev-link;

    color: $white;

    &:hover {
      color: $secondary-color;
    }
  }

  &__scroll-top {
    $w: ( "md": 124px, "lg": 125px, );
    $plus-height: 10px;

    @include wh(48px);
    @include bp-change(right, ("mob": 0, "xs": 250px));

    box-shadow: 0 5px 10px rgba(51, 27, 22, 0.12);
    color: $main-color;
    font-size: 11px;
    position: absolute;
    top: 201px;

    @media #{$mq-xs} {
      @include wh(auto);

      border-radius: 0 0 2px 2px;
      top: 0;
    }

    @media #{$mq-md} {
      $w: 124px;

      right: calc(#{map-get($form-block-pic-width, "md")} - #{$w});
      width: $w;

      &:hover {
        &::after {
          transform: translateY($plus-height);
        }

        ::v-deep .q-btn__content {
          transform: translateY($plus-height/2);
        }
      }
    }

    @media #{$mq-lg} {
      $w: 124px;

      right: calc(#{map-get($form-block-pic-width, "lg")} - #{$w});
      width: $w;
    }

    &::after {
      @include pseudo();

      background-color: $white;
      border-radius: 2px 0 0 2px;
      height: 100%;
      width: 100%;

      @media #{$mq-xs} {
        border-radius: 0 0 2px 2px;
      }

      @media #{$mq-md} {
        bottom: 0;
        height: calc(100% + #{$plus-height});
        transition: transform $trs;
      }
    }

    * > {
      position: relative;
    }

    ::v-deep {
      .q-focus-helper {
        display: none;
      }

      .q-icon {
        @include abs-center();

        @media #{$mq-xs} {
          bottom: 0;
          font-size: 16px;
          left: auto;
          margin: 2px;
          right: -14px;
          top: auto;
          transform: none;
        }
      }

      .q-btn__wrapper {
        position: relative;
        z-index: 2;

        @media #{$mq-xs} {
          padding: 11px 38px 11px 24px;
        }
      }

      .q-btn__content {
        align-items: baseline;
        display: flex;
        flex-direction: row-reverse;
        position: relative;

        @media #{$mq-md} {
          transition: transform $trs;
        }

        > span {
          @extend %footer-scroll;

          margin-right: 8px;
          text-transform: capitalize;
        }
      }
    }
  }
}
</style>
