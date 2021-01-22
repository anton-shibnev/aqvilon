<template>
  <div
    :class="name"
    @click="$emit('open-archive', $event)"
  >
    <div
      :class="`${name}__wrap-pic`"
    >
      <pic
        :class="`${name}__pic`"
        :src="img"
        :dark="false"
      />
    </div>
    <div
      :class="`${name}__bottom`"
    >
      <div
        :class="`${name}__date`"
        v-text="options.date"
      />
      <div
        :class="`${name}__count`"
      >
        {{ options.c_images }} фото
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Pic from 'components/base/Pic.vue';

@Component({
  components: { Pic },
})
export default class StageCard extends Vue {
  @Prop({ type: Object }) options: any | undefined

  name = 'stage-card'

  get img() {
    if (this.options.image.url) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return `${process.env.API}${this.options.image.url}`;
    }
    return '';
  }
}
</script>

<style lang="scss" scoped>
// $
.stage-card {
  $this: &;

  @include scale-pic($this);

  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;

  @media #{$mq-xs} {
    display: grid;
    grid-template-rows: 241px 1fr;
    height: 100%;
  }

  @media #{$mq-lg} {
    grid-template-rows: 300px 1fr;
  }

  &__wrap-pic {
    @include wh(100%);

    overflow: hidden;
  }

  &__pic {
    @include wh(100%);
  }

  &__bottom {
    align-items: center;
    background-color: $secondary-light-color;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 16px 8px 24px;

    @media #{$mq-lg} {
      padding: 16px 17px 24px;
    }
  }

  &__count,
  &__date {
    @extend %stage-develop-bottom;
  }

  &__date {
    margin-right: 10px;
  }

  &__count {
    color: $dark-grey;
  }
}
</style>
