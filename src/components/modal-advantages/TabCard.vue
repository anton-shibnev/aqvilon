<template>
  <article
    :class="name"
  >
    <q-img
      :class="`${name}__pic`"
      :src="options.image"
    />
    <div :class="`${name}__content`">
      <div
        :class="`${name}__title`"
        v-text="options.title"
      />
      <div
        v-if="options.desc"
        :class="`${name}__desc`"
        v-text="options.desc"
      />
    </div>
  </article>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class TabCard extends Vue {
  @Prop({ type: Object }) options: any

  name = 'tab-card'
}
</script>

<style lang="scss" scoped>
.tab-card {
  $this: &;

  @include scale-pic($this);
  @include bp-change(
    padding,
    (
      "mob": 20px 16px,
      "xs": 24px 20px,
      "md": 24px 20px 17px,
      "lg": 28px 24px 20px
    )
  );

  border-radius: 4px;
  display: block;
  height: 100%;
  min-height: 200px;
  overflow: hidden;
  position: relative;
  -webkit-touch-callout: none;
  user-select: none;
  width: 100%;

  &:hover {
    #{$this}__desc {
      max-height: 200px;
      visibility: visible;
    }
  }

  &__content {
    align-content: end;
    align-items: end;
    display: grid;
    height: 100%;
    position: relative;
    transition: transform $trs;
    z-index: 10;
  }

  &__pic {
    @include abs-spread();

    z-index: 5;

    ::v-deep {
      .q-img__content {
        background-color: rgba($black, 0.16);

        &::after {
          @include pseudo();
          @include abs-spread();

          background: linear-gradient(180.28deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.4) 99.76%);
        }
      }
    }
  }

  &__title {
    @include font(
      ("mob": 16px, "xs": 18px, "md": 20px,  "lg": 24px),
      1.2,
      400,
      -0.01em,
      $font-main
    );
    @include bp-change(
      margin-bottom,
      ("mob": 8px)
    );

    color: $white;
  }

  &__desc {
    @include font(("mob": 12px, "xs": 14px), 1.2, 400, -0.01em);

    color: $secondary-light-color;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.7s ease-in-out;
    white-space: pre-wrap;
  }

  &__list {
    @include bp-change(margin-top, ("mob": 8px));

    color: $secondary-light-color;
    display: grid;
    grid-gap: 12px;

    @media #{$mq-xs} {
      column-count: 2;
      column-gap: 12px;
      column-width: 291px;
      display: block;
      max-width: 1000px;
    }

    @media #{$mq-md} {
      max-width: calc(50vw - #{(map-get($container-padding, "md")) * 2});
    }

    @media #{$mq-lg} {
      max-width: calc(50vw - #{(map-get($container-padding, "lg")) * 2});
    }
  }

  &__list-item {
    @include font(("mob": 12px, "xs": 14px, "lg": 20px), 1.2, 400, -0.01em);
    @include bp-change(padding-bottom, ("mob": 4px));
    @include bp-change(padding-left, ("mob": 14px));

    @include c-pseudo() {
      background-color: $secondary-light-color;
      border-radius: 50%;
      height: 6px;
      left: 0;
      top: 5px;
      width: 6px;
    }

    @media #{$mq-xs} {
      break-inside: avoid;
      margin-bottom: 12px;
    }
  }
}
</style>
