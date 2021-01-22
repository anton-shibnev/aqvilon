<template>
  <section
    :class="name"
  >
    <div
      :class="`${name}__inner`"
    >
      <div
        :class="`${name}__title`"
      >
        {{ ui.pageInfo.title }}
      </div>
      <div v-html="ui.pageInfo.text" />
    </div>
  </section>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Vue, Component } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import UI from 'src/store/modules/UI';

@Component({
  async preFetch({ store }) {
    const ui = getModule(UI, store);
    await ui.getPageData({ name: 'home.RightsInfoPage' });
  },
})
export default class Information extends Vue {
  name = 'privacy-policy'

  ui = getModule(UI, this.$store)

  options = {
    title: '',
  }
}
</script>

<style lang="scss" scoped>
// $
.privacy-policy {
  @include padding-y-arr(("mob": 48px, "xs": 64px, "md": 96px, "lg": 104px));

  background-color: $light-grey;
  color: $black;
  height: 100%;

  &__inner {
    @extend %container-padding;

    @include bp-change(max-width, ("md": 1040px, "lg": 1465px));

    display: block;
    margin: 0 auto;
  }

  &__title {
    @include font(("mob": 24px, "xs": 56px, "lg": 72px), 1, 500, -0.01em, $font-secondary);
    @include bp-change(margin-bottom, ("mob": 32px, "xs": 48px, "md": 56px, "lg": 64px));
  }

  ol {
    counter-reset: my-awesome-counter;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      @include font(("mob": 18px, "xs": 24px, "lg": 32px), 1.2, 500, -0.01em);

      counter-increment: my-awesome-counter;

      &::before {
        content: counter(my-awesome-counter) ". ";
      }

      p {
        @include bp-change(margin-top, ("mob": 16px, "xs": 24px));
      }
    }
  }

  p,
  ol li p {
    @include font(("mob": 16px, "xs": 20px, "lg": 24px), 1.2, 400, -0.01em);
    @include bp-change(margin-bottom, ("mob" : 32px, "xs": 40px, "lg": 50px));
  }

  p,
  ol {
    @include bp-change(max-width, ("mob": 810px, "lg": 1140px));
  }
}
</style>
