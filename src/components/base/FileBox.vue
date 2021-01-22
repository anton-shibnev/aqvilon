<template>
  <a
    :href="proc(options.url)"
    :class="name"
  >
    <q-icon
      :class="[`${name}__icon`, { [`${name}__icon--${options.fileType}`]: !!options.fileType }]"
      name="svguse:icons.svg#file"
    />
    <div
      :class="`${name}__title`"
      v-text="options.title"
    />
    <!--    <div-->
    <!--      :class="`${name}__data`"-->
    <!--    >-->
    <!--      {{ options.fileType }}, {{ options.size }} Мб · Опубликовано {{ options.date }}, в {{ options.time }}-->
    <!--    </div>-->
  </a>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class FileBox extends Vue {
  @Prop({ type: Object }) options: never | undefined

  name = 'file-box'

  proc(src: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${process.env.API}${src}`;
  }
}
</script>

<style lang="scss" scoped>
// $
.file-box {
  $this: &;

  border-bottom: 1px solid $main-color;
  display: grid;
  grid-gap: 5px 16px;
  grid-template-areas: "icon title" ". data";
  justify-content: start;
  padding-bottom: 16px;
  position: relative;
  text-decoration: none;

  &::after {
    background-color: $black;
    bottom: 0;
    content: "";
    display: block;
    height: 1px;
    position: absolute;
    transform: scale(0);
    transition: transform $trs;
    width: 100%;
  }

  &:hover {
    &::after {
      transform: scale(1);
    }

    #{$this}__title {
      color: $primary;
    }
  }

  &__icon {
    align-self: center;
    color: $black;
    grid-area: icon;

    &--pdf {
      color: $primary;
    }

    &--docx {
      color: $blue;
    }
  }

  &__title {
    @include font(
      ("mob": 14px, "xs": 16px),
      ("mob": 1.14, "xs": 1.25),
      400,
      ("mob": 0.25px, "xs": 0.5px)
    );

    color: $black;
    grid-area: title;
    transition: color $trs;
  }

  &__data {
    @include font(
      ("mob": 12px),
      ("mob": 1.33),
      400,
      ("mob": 0.4px)
    );

    color: $dark-grey;
    grid-area: data;
  }
}
</style>
