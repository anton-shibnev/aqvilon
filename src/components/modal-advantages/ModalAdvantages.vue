<template>
  <modal @close="handleClose()">
    <section :class="name">
      <div
        :class="`${name}__title`"
        v-text="ui.pageInfo.title"
      />
      <Tabs
        :class="`${name}__tabs`"
        :options="ui.pageInfo"
      />
    </section>
  </modal>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Vue, Component } from 'vue-property-decorator';
import Modal from 'components/base/Modal.vue';
import Tabs from 'components/modal-advantages/Tabs.vue';
import { getModule } from 'vuex-module-decorators';
import UI from 'src/store/modules/UI';

@Component({
  components: { Tabs, Modal },
  async preFetch({ store }) {
    const ui = getModule(UI, store);
    await ui.getPageData({ name: 'home.BenefitsPage' });
  },
})
export default class ModalAdvantages extends Vue {
  name = 'modal-advantages'

  ui = getModule(UI, this.$store);

  async handleClose(): Promise<void> {
    await this.$router.push('/');
  }
}
</script>

<style lang="scss" scoped>
// $
.modal-advantages {
  @extend %container-padding;

  @include padding-y-arr((
    "mob": (88px, 48px),
    "xs": (48px, 56px),
    "lg": (48px, 64px),
  ));

  &__title {
    @extend %h2;
  }

  &__tabs {
    @include bp-change(margin-top, ("mob": 32px));
    @include wider($container-padding);
  }
}
</style>
