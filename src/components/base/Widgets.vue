<template>
  <div
    :class="name"
  >
    <btn
      v-for="(btn, index) in btnList"
      :key="index"
      :href="btn.href"
      :type="btn.type"
      :class="[
        `${name}__btn`,
        { [`${name}__btn--animate`]: btn.animate },
      ]"
      :icon="`svguse:icons.svg#${btn.icon}`"
      round
      @click="typeof btn.click === 'function' ? btn.click() : undefined"
    >
      <svg
        v-if="btn.animate"
        :class="`${name}__btn-circle`"
      >
        <circle
          id="kk"
          cx="50%"
          cy="50%"
          r="32"
          stroke="#000"
          stroke-width="2"
          fill-opacity="0"
        />
      </svg>
    </btn>
    <iframe
      id="eva-iframe"
      v-if="ui.isEvaOpen"
      ref="eva"
      class="eva"
      :src="evaUrl"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Btn from 'components/base/Btn.vue';
import { getModule } from 'vuex-module-decorators';
import UI from 'src/store/modules/UI';

@Component({
  components: { Btn },
})
export default class Widgets extends Vue {
  @Prop({ type: Object }) options: never | undefined

  name = 'widgets'
  isAnimate = false

  ui = getModule(UI, this.$store)

  btnList = [
    // eslint-disable-next-line @typescript-eslint/unbound-method
    { icon: 'building', animate: true, click: this.ui.TOGGLE_EVA },
  ]

  get evaUrl() {
    return process.env.EVA_URL;
  }

  get phoneNumber(): any {
    return this.ui.pageInfo?.main_office?.phones[0]?.number;
  }

  mounted() {
    if (window.location.hash) {
      this.ui.OPEN_EVA();

      const iframe = document.getElementById('eva-iframe') as HTMLIFrameElement;

      if (iframe) {
        iframe.addEventListener('load', () => {
          // sending set-route action

          this.ui.postMessage({ action: 'set-route', msg: window.location.hash });
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.eva {
  border: 0;
  bottom: 0;
  height: 100%;
  left: 0;
  margin: 0;
  padding: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 9999;

  &__close {
    background: #fff;
    height: 51px;
    position: fixed;
    right: 0;
    text-transform: uppercase;
    top: 2px;
    width: 245px;
    z-index: 99999;

    ::v-deep {
      .q-btn__content {
        display: grid;
        grid-auto-flow: column;
        grid-gap: 10px;
        margin-top: -8px;
      }
    }
  }

  &__close-circle {
    @include circle(30px);

    border: 1px solid #dfe2e6;
    position: relative;
  }

  &__close-icon {
    @include abs-center();

    font-size: 10px;
  }

}

// $
.widgets {
  @include bp-change(right, $container-padding);
  @include bp-change(bottom, ("mob": 90px));

  display: grid;
  grid-gap: 24px;
  position: fixed;
  z-index: 9000;

  &__btn {
    $animation-time: 2s;
    $animation-delay: -3s;

    @include wh-arr(("mob": 64px));

    box-shadow: 0 0 0 0 rgba($primary, 0.1);
    font-size: 20px;
    transition: transform $trs, background-color $trs;

    &--animate {
      &::after {
        @include pseudo();
        @include circle(100%);

        animation: pseudo-pulse $animation-time infinite $animation-delay;
        background-color: rgba($primary, 0.7);
        transform: scale(1) translate3d(0, 0, 0);
        z-index: -1;
      }

      &::before {
        @include pseudo();
        @include circle(100%);

        animation: pseudo-pulse $animation-time infinite 3.3s;
        background-color: rgba($primary, 0.7);
        transform: scale(1) translate3d(0, 0, 0);
        z-index: -1;
      }
    }
  }

  &__btn-circle {
    @include abs-center();
    @include wh(calc(100% + 20px));

    circle {
      @include bp-change(r, ("mob": 38px));

      animation: fill 2s linear normal;
      animation-delay: -0.5s;
      animation-iteration-count: infinite;
      stroke: $accent-button;
      stroke-dasharray: 150;
      stroke-dashoffset: 300;
      stroke-width: 1px;
    }
  }
}

@keyframes fill {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes fill {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes pseudo-pulse {
  0% {
    background-color: rgba($primary, 0.7);
    transform: scale(1) translate3d(0, 0, 0);
  }

  70% {
    background-color: rgba($primary, 0);
    transform: scale(1.5) translate3d(0, 0, 0);
  }

  100% {
    background-color: rgba($primary, 0);
    transform: scale(1) translate3d(0, 0, 0);
  }
}
</style>
