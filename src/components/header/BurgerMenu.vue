<template>
  <div
    :id="bem | camelize"
    :class="[`${bem}-outer`, { [`${bem}-outer--active`]: isActive }]"
  >
    <div
      :class="[`${bem}-overlay`, { [`${bem}-overlay--active`]: isActive }]"
      @click="ui.CLOSE_MENU()"
    />
    <q-drawer
      :class="[bem, { [`${bem}--active`]: isActive }]"
      show-if-above
      :breakpoint="500"
      :content-class="`${bem}__content`"
      overlay
    >
      <q-scroll-area class="fit">
        <div
          :class="`${bem}__inner`"
        >
          <div
            :class="`${bem}__title`"
            v-text="options.title"
          />
          <ul
            :class="`${bem}__list`"
          >
            <li
              v-for="(item, index) in options.list"
              :key="index"
              :class="`${bem}__list-item`"
            >
              <a
                :href="item.href"
                :class="`${bem}__list-item-link`"
                v-text="item.text"
                @click.prevent="[scrollTo(item.href), ui.CLOSE_MENU()]"
              />
              <hr
                :class="`${bem}__list-item-hr`"
              >
            </li>
          </ul>
          <div
            :class="`${bem}__bottom`"
          >
            <Btn
              :label="options.btn.label"
              :class="`${bem}__btn`"
              @click="[ui.TOGGLE_EVA(), ui.TOGGLE_MENU()]"
            />
            <!--            ompo-->
            <a
              v-if="phones"
              :href="`tel:${serverData.main_office.phones[0].number}`"
              :class="`${bem}__tel`"
            >
              <span
                :class="`${bem}__tel-text`"
              >
                {{ phones[0].number }}
              </span>
            </a>
          </div>
          <div
            :class="`${bem}__special-offer`"
          >
            <special-offer
              v-if="serverData.promo_bage && serverData.promo_bage.length"
              :wide="true"
              :data="serverData.promo_bage"
            />
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { QDrawer, scroll } from 'quasar';
import Btn from 'components/base/Btn.vue';
import SpecialOffer from 'components/hero/SpecialOffer.vue';
import { getModule } from 'vuex-module-decorators';
import UI from 'src/store/modules/UI';

@Component({
  components: { SpecialOffer, Btn },
})
export default class BurgerMenu extends QDrawer {
  @Prop({ type: Object }) options: never | undefined
  @Prop({ type: Object }) serverData: any
  @Prop({ type: Boolean, default: false }) isActive: boolean | undefined

  bem = 'burger-menu'

  ui = getModule(UI, this.$store)

  get phones() {
    return this.serverData?.main_office?.phones;
  }

  scrollTo(el: string) {
    if (process.env.CLIENT) {
      const elem: any = document.querySelector(el);
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
$name: "burger-menu";

.#{$name}-outer {
  @include wh(100%);
  @include bp-change(top, $header-height);

  bottom: 0;
  pointer-events: none;
  position: fixed;
  z-index: 9999;

  &--active {
    pointer-events: auto;
  }
}

.#{$name}-overlay {
  @include abs-spread();

  background-color: $black;
  opacity: 0;
  transition: opacity $trs;

  &--active {
    opacity: 0.64;
  }
}

.#{$name} {
  height: 100%;
  transition: transform $trs;

  &--active {
    ::v-deep {
      .q-drawer {
        transform: translateX(0) !important;
      }
    }
  }

  &__inner {
    @extend %container-padding;

    display: grid;
    grid-template-rows: max-content;
    height: 100%;

    @media #{$mq-xs} {
      padding-top: 40px;
    }
  }

  &__title {
    @include font(("mob": 32px), 1, 500, -0.01em, $font-secondary);

    align-self: start;
  }

  &__list {
    align-self: start;
    display: grid;
    grid-gap: 16px;
    margin-top: 32px;
  }

  &__list-item-link {
    @include font(("mob": 20px), 1.2, 500, -0.01em);

    color: $main-color;
  }

  &__list-item-hr {
    background-color: $accent-elements;
    margin-bottom: 0;
    margin-top: 3px;
  }

  &__bottom {
    align-items: center;
    align-self: end;
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    margin-top: 57px;
  }

  &__btn {
    @include font(("mob": 14px, "xs": 16px), 1, 500, -0.01em);

    ::v-deep .q-btn__wrapper {
      padding: 18px 24px;
    }
  }

  &__tel {
    @include font(("mob": 18px, "xs": 24px), 1, 500, -0.01em);

    align-self: start;
    color: $main-color;

    @media #{$mq-xs} {
      align-self: center;
    }
  }

  &__special-offer {
    @include wider($container-padding);

    align-self: end;
    margin-top: 16px;
  }

}

::v-deep {
  .scroll {
    > .full-width {
      height: 100%;
    }
  }

  .q-drawer {
    height: 100vh;
    max-width: 486px;
    transform: translateX(-100%) !important;
    transition: transform $trs;
    width: 100% !important;

    @each $bp-name, $val in $header-height {
      @if ($bp-name == "mob") {
        height: calc(100vh - #{$val});
      }

      @else {
        @media only screen and (min-width: #{map-get($bp, $bp-name)}) {
          height: calc(100vh - #{$val});
        }
      }
    }

    &__content {
      @include bp-change(padding-top, ("mob": map-get($header-height, "mob"), "xs": 0));

      background: $white;
      visibility: visible !important;
    }
  }
}
</style>

<style>
.burger-menu__content {
  margin-top: 40px !important;
}
</style>
