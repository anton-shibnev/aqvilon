<template>
  <outer
    :id="name | camelize"
    :class="`${name}-outer`"
  >
    <div :class="`${name}__title`">
      {{ options.block_adv_title }}
    </div>
    <div
      :class="`${name}__descr`"
    >
      {{ options.block_adv_desc }}
    </div>
    <Tabs
      v-if="options.adv_tabs"
      :class="`${name}__tabs`"
      :options="options.adv_tabs"
    />
  </outer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Outer from 'components/base/Outer.vue';
import { getModule } from 'vuex-module-decorators';
import UI from 'src/store/modules/UI';
import Tabs from 'components/modal-advantages/Tabs.vue';

@Component({
  components: { Outer, Tabs },
})
export default class Privileges extends Vue {
  @Prop({ type: Object }) options: any

  name = 'privileges-block'

  ui = getModule(UI, this.$store)

  advantagesCards: any = null

  proc(src: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${process.env.API}${src}`;
  }

  async handleClick(i: number): Promise<void> {
    await this.$router.push(`/advantages/${i}`);
  }
}
</script>

<style lang="scss" scoped>
$name: "privileges-block";

.#{$name}-outer {
  background: $main-color;

  @media #{$mq-lg} {
    padding-bottom: 180px;
  }
}

.#{$name} {
  $this: &;

  &__title {
    @extend %h2;

    color: $white;
  }

  &__descr {
    @extend %stage-develop-desc;

    color: $white;
    margin-top: 16px;

    @media #{$mq-xs} {
      grid-area: desc;
      margin-top: 24px;
    }

    @media #{$mq-md} {
      @include margin-y(16px, 0);

      max-width: 600px;
    }

    @media #{$mq-lg} {
      @include margin-y(25px, 0);

      max-width: 880px;
    }
  }

  &__tabs {
    @include bp-change(
      margin-top,
      (
        "mob": 72px,
        "xs": 80px,
        "md": 64px,
        "lg": 88px,
      )
    );
  }
}
</style>
