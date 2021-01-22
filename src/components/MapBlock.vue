<template>
  <outer
    :id="name | camelize"
  >
    <section :class="name">
      <div
        :class="`${name}__top`"
      >
        <div
          :class="`${name}__title`"
          v-text="options.title"
        />
        <ul
          :class="`${name}__rout-list`"
        >
          <li
            v-for="(rout, index) in options.routList"
            :key="index"
            :class="`${name}__rout`"
          >
            <div
              :class="`${name}__rout-name`"
              v-text="rout.name"
            />
            <q-chip
              :class="`${name}__rout-chip`"
              :icon="`svguse:icons.svg#${rout.icon}`"
            >
              {{ rout.minutes }} мин.
            </q-chip>
          </li>
        </ul>
        <div
          :class="`${name}__desc`"
          v-text="serverData.place_description"
        />
      </div>
      <div
        :class="`${name}__map`"
      >
        <q-no-ssr>
          <!--          <GoogleMap />-->
          <ya-map />
        </q-no-ssr>
      </div>

      <div
        :class="`${name}__bottom`"
      >
        <div
          :class="`${name}__address`"
        >
          <div
            :class="`${name}__address-desc`"
            v-text="serverData.main_office.title"
          />
          <div
            :class="`${name}__address-value`"
            v-text="serverData.main_office.address"
          />
        </div>

        <div
          :class="`${name}__bottom-row`"
        >
          <a
            :href="`tel:${serverData.main_office.phones[0].number}`"
            :class="`${name}__tel`"
          >
            {{ serverData.main_office.phones[0].number }}
          </a>
          <btn
            :class="`${name}__btn`"
            :label="options.btn.label"
            :custom-color="options.btn.color"
            @click="scrollTo()"
          />
        </div>
      </div>
    </section>
  </outer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Outer from 'components/base/Outer.vue';
import Btn from 'components/base/Btn.vue';
// import GoogleMap from 'components/base/GoogleMap.vue';
import YaMap from 'components/base/YaMap.vue';
import { scroll } from 'quasar';

@Component({
  components: {
    Btn,
    Outer,
    YaMap,
  },
})
export default class MapBlock extends Vue {
  @Prop({ type: Object }) options: never | undefined
  @Prop({ type: Object }) serverData: never | undefined

  name = 'map-block'

  scrollTo() {
    if (process.env.CLIENT) {
      const elem: any = document.querySelector('#formBlock');
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
// $
.map-block {
  @media #{$mq-md} {
    @include margin-y(-#{map-get($outer-padding, "md")});

    align-content: start;
    align-items: start;
    display: grid;
    grid-gap: 0 20px;
    grid-template-areas:
      "top map"
      "bottom map";
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto 1fr;
  }

  @media #{$mq-lg} {
    @include margin-y(-#{map-get($outer-padding, "lg")});
  }

  &__top {
    @include bp-change(margin-top, ("md": 96px, "lg": 260px));

    @media #{$mq-md} { grid-area: top; }
  }

  &__title {
    @extend %h2;
  }

  &__rout-list {
    @include bp-change(margin-top, ("mob": 17px, "lg": 23px));

    display: flex;
    flex-wrap: wrap;
  }

  &__rout {
    align-items: center;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 8px;
    padding-left: 9px;
    position: relative;

    &::before {
      @include pseudo();
      @include circle(5px);
      @include abs-center-y();

      background-color: $secondary-color;
    }

    &:not(:last-child) {
      @include bp-change(margin-bottom, ("mob": 7px, "xs": 3px, "lg": 6px));
      @include bp-change(margin-right, ("mob": 16px, "xs": 24px, "lg": 32px));
    }
  }

  &__rout-name {
    @extend %map-block-route-name;
  }

  &__rout-chip {
    @extend %text-12;

    background-color: $main-color;
    color: $white;
    height: auto;
    margin: 0;
    padding: 4px 9px 5px 14px;

    ::v-deep {
      .q-chip__content {
        @extend %map-block-route-name;
      }

      .q-chip__icon {
        @include wh(0.4em);

        color: $secondary-color;
        margin-right: 3px;
      }
    }
  }

  &__desc {
    @extend %numbers-block-desc;

    @include bp-change(margin-top, ("mob": 32px, "xs": 36px, "lg": 34px));
  }

  &__map {
    @include bp-change(margin-top, ("mob": 24px, "xs": 32px, "md": 0));
    @include bp-change(height, ("mob": 252px, "xs": 460px, "md": 670px, "lg": 1068px));

    height: 252px;

    > * { height: 100%; }

    @media #{$mq-md} {
      @include pin-out(right, map-get($container-padding, "md"));

      grid-area: map;
    }
  }

  &__address {
    @include bp-change(margin-top, ("mob": 31px, "xs": 0));
  }

  &__address-desc {
    @extend %numbers-block-address-desc;

    color: $dark-grey;
  }

  &__address-value {
    @extend %numbers-block-address-value;

    margin-top: 4px;
  }

  &__bottom {
    @include bp-change(margin-top, ("mob": 24px, "xs": 42px, "md": 64px, "lg": 102px));

    @media #{$mq-md} {
      grid-area: bottom;
    }
  }

  &__bottom-row {
    @include bp-change(margin-top, ("mob": 25px, "xs": 16px, "md": 23px));

    @media #{$mq-xs} {
      align-items: center;
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
    }
  }

  &__tel {
    @extend %numbers-block-tel;

    color: $main-color;
    display: block;

    &:hover {
      color: $accent-button;
    }
  }

  &__btn {
    margin-top: 16px;
    min-width: 168px;

    @media #{$mq-xs} {
      margin-right: 15px;
      margin-top: 0;
    }

    @media #{$mq-md} {
      margin-right: 25px;
      min-width: auto;
    }
  }
}
</style>
