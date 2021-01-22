<template>
  <div
    :class="[`${name}-outer`, { [`${name}-outer--static`]: static }]"
  >
    <q-header
      :id="name | camelize"
      ref="header"
      :class="[name, { [`${name}--sticky`]: isSticky || !$q.screen.gt.md }]"
    >
      <!-- <q-scroll-observer @scroll="onScroll($event)" /> -->
      <special-offer
        v-if="promoBage.length"
        :class="[`${name}__special-offer`, { [`${name}__special-offer--active`]: isOfferActive }]"
        :in-header="true"
      />
      <div class="container">
        <div
          :class="`${name}__inner`"
        >
          <div
            :class="`${name}__hand`"
          >
            <burger
              v-if="!$q.screen.gt.md"
              :class="`${name}__burger`"
              @toggle="ui.TOGGLE_MENU()"
            />
            <router-link
              to="/"
              active-class=""
            >
              <q-img
                contain
                src="images/header/logo.svg"
                :class="`${name}__logo`"
                @click="scrollTop()"
              />
            </router-link>
            <ul
              v-if="!!$q.screen.gt.md"
              :class="`${name}__list`"
            >
              <li
                v-for="(item, index) in options.list"
                :key="index"
                :class="`${name}__list-item`"
              >
                <a
                  :href="item.href"
                  :class="`${name}__list-item-link`"
                  v-text="item.text"
                  @click.prevent="scrollTo(item.href)"
                />
              </li>
            </ul>
          </div>
          <div
            :class="`${name}__hand`"
          >
            <button
              v-if="promoBage.length"
              :class="`${name}__offer`"
              @click="isOfferActive = !isOfferActive"
            >
              <q-icon
                name="svguse:icons.svg#special-offer"
              />
            </button>
            <a
              v-if="phones"
              :href="`tel:${phones[0].number}`"
              :class="`${name}__tel`"
            >
              <q-icon
                v-if="!$q.screen.gt.md"
                name="svguse:icons.svg#tel"
                :class="`${name}__tel-icon`"
              />
              <span
                v-if="serverData && !!$q.screen.gt.md"
                :class="`${name}__tel-text`"
              >
                {{ phones[0].number }}
              </span>
            </a>
            <Btn
              v-if="!!$q.screen.gt.md"
              :label="options.btn.label"
              :class="`${name}__btn`"
              @click="ui.TOGGLE_EVA()"
            />
          </div>
        </div>
      </div>
    </q-header>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { QHeader, scroll } from 'quasar';
import Burger from 'components/header/Burger.vue';
import Btn from 'components/base/Btn.vue';
import SpecialOffer from 'components/hero/SpecialOffer.vue';
import { getModule } from 'vuex-module-decorators';
import UI from 'src/store/modules/UI';

@Component({
  components: { SpecialOffer, Btn, Burger },
})
export default class Header extends QHeader {
  @Prop({ type: Object }) options: never | undefined
  @Prop({ type: Boolean, default: false }) static: boolean | undefined;
  @Prop({ type: Boolean, default: false }) isSticky: boolean | undefined;
  @Prop({ type: Object }) serverData: any

  name = 'header'

  scrollPosition = 0

  isOfferActive = false

  get promoBage() {
    return this.serverData?.promo_bage || [];
  }

  // onScroll(e: any) {
  //   this.isSticky = e.position > window.innerHeight;
  // }

  ui = getModule(UI, this.$store)

  get phones() {
    return this.serverData?.main_office?.phones;
  }

  scrollTo(hash: string) {
    if (process.env.CLIENT) {
      this.$emit('targetScroll');
      const elem: any = document.querySelector(hash);
      const { getScrollTarget, setScrollPosition } = scroll;
      const target = getScrollTarget(elem);
      const offset = elem.offsetTop;
      const duration = 500;
      setScrollPosition(target, offset, duration);
    }
  }
}
</script>

<style lang="scss" scoped>
$name: "header";

.#{$name}-outer {
  height: 0;
  position: relative;

  @media #{$mq-md} {
    height: map-get($header-height, "md");
  }

  @media #{$mq-lg} {
    height: map-get($header-height, "lg");
  }

  // &--static {
  //   position: relative !important;

  //   .#{$name} {
  //     position: relative !important;
  //   }
  // }
}

.#{$name} {
  @include bp-change(height, $header-height);

  background-color: $white;
  border-bottom: 1px solid #c6c7c7;
  transition: inherit;
  z-index: 4000;

  @media #{$mq-md} {
    clip-path: polygon(0 0, 100% 0, 100% 300%, 0% 300%);
    position: absolute;
    top: 0;
  }

  &--sticky {
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
  }

  .container {
    background-color: $white;
    height: 100%;
    position: relative;
    z-index: 10;
  }

  &__special-offer {
    @include bp-change(right, ("mob": 0, "md": 14%, "lg": 16%));

    position: absolute;
    top: 100%;
    transform: translateY(-100%);
    transition: transform $trs;
    z-index: 5;

    &--active {
      transform: translateY(0);
    }
  }

  &__inner {
    align-content: center;
    align-items: center;
    display: grid;
    grid-auto-flow: column;
    height: 100%;
    justify-content: space-between;
  }

  &__hand {
    align-items: center;
    display: grid;
    grid-auto-flow: column;
  }

  &__logo {
    @include wh-arr(("mob": (143px, 22px), "xs": (152px, 24px), "md": (140px, 22px), "lg": (204px, 32px)));
    @include bp-change(margin-right, ("md": 36px, "lg": 45px));

    cursor: pointer;
  }

  &__offer,
  &__tel {
    color: $main-color;
    justify-self: end;
    transition: color $trs;

    &:hover,
    &:focus {
      color: $accent-button-hover;
    }
  }

  &__offer {
    @include btn-reset();
    @include bp-change( font-size, ( "mob": 20px, "xs": 23px, "md": 20px, "lg": 24px ) );

    position: relative;
  }

  &__tel {
    @include bp-change( margin-left, ( "mob": 26px, "xs": 22px, "md": 32px, "lg": 48px ) );
  }

  &__tel-icon {
    @include bp-change( font-size, ( "mob": 18px, "xs": 22px) );
  }

  &__tel-text {
    @extend %header-tel-text;
  }

  &__burger {
    @include bp-change( margin-right, ( "mob": 24px, "xs": 42px) );
  }

  &__list {
    @media #{$mq-md} {
      align-items: center;
      display: grid;
      grid-auto-flow: column;
    }

    @include bp-change( grid-gap, ( "md": 21px, "lg": 32px) );
  }

  &__list-item-link {
    @extend %header-item;

    cursor: pointer;
    user-select: none;

    @media #{$mq-md} {
      color: $main-color;
      transition: color $trs;

      &:hover {
        color: $accent-button-hover;
      }
    }
  }

  &__btn {
    @include bp-change( margin-left, ( "md": 16px, "lg": 34px) );
  }
}
</style>
