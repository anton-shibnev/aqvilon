<template>
  <modal @close="ui.TOGGLE_ARCHIVE_MODAL()">
    <section :class="name">
      <div
        :class="`${name}__title`"
        v-text="options.title"
      />
      <div
        :class="`${name}__gallery-list`"
      >
        <div
          v-for="(item, index) in ui.albums"
          :key="index"
          :class="`${name}__gallery-item`"
        >
          <stage-card
            :options="item"
            @open-archive="open(item.id)"
          />
        </div>
      </div>
    </section>
  </modal>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Modal from 'components/base/Modal.vue';
import StageCard from 'components/stage-devolop/StageCard.vue';
import { getModule } from 'vuex-module-decorators';
import UI from 'src/store/modules/UI';

@Component({
  components: { StageCard, Modal },
})
export default class ModalArchive extends Vue {
  @Prop({ type: Object }) options: never | undefined

  name = 'modal-archive'

  ui = getModule(UI, this.$store)

  async mounted() {
    await this.ui.getAlbums();
  }

  async open(id: number) {
    await this.ui.getAlbum(id);
    this.ui.TOGGLE_GALLERY_MODAL();
  }
}
</script>

<style lang="scss" scoped>
// $
.modal-archive {
  @extend %container-padding;

  @include padding-y-arr(("mob": 28px));

  &__title {
    @extend %h2;
  }

  &__gallery-list {
    @include bp-change(margin-top, ("mob": 32px));
    @include bp-change(grid-template-columns, ("mob": repeat(2, 1fr), "lg": repeat(4, 1fr)));
    @include bp-change(grid-gap, ("mob": 16px, "xs": 20px));

    display: grid;
  }
}
</style>
