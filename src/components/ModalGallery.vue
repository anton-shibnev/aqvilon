<template>
  <modal @close="close()">
    <div :class="name">
      <div
        :class="`${name}__select`"
      >
        <span
          :class="`${name}__select-name`"
          v-text="options.selectName"
        />
        <q-select
          v-if="selectOptions"
          :input-class="`${name}__dropdown`"
          :options="selectOptions"
          outlined
          :popup-content-class="`${name}__select-popup`"
          v-model="selectedOption"
          @input="handleSelectChange()"
        />
      </div>
      <q-no-ssr>
        <gallery-slider
          v-if="renderComponent"
          :class="`${name}__slider`"
          :data="ui.album.album_images"
          :options="galleryOptions"
          :counter="true"
        />
      </q-no-ssr>
    </div>
  </modal>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Modal from 'components/base/Modal.vue';
import GallerySlider from 'components/GallerySlider.vue';
import { getModule } from 'vuex-module-decorators';
import UI from 'src/store/modules/UI';

@Component({
  components: { GallerySlider, Modal },
})
export default class ModalGallery extends Vue {
  @Prop({ type: Object }) options: never | undefined

  name = 'modal-gallery'

  ui = getModule(UI, this.$store)

  selectedOption = null

  renderComponent = true

  async handleSelectChange() {
    const { id } = this.ui.albums.find((album: { date: null; }) => album.date === this.selectedOption);
    await this.ui.getAlbum(id);
    this.forceRerender();
  }

  forceRerender() {
    this.renderComponent = false;

    this.$nextTick(() => {
      this.renderComponent = true;
    });
  }

  galleryOptions = {
    slide: 1,
    bullets: true,
    list: [
      {
        name: 1,
        imgSrc: 'images/block-gallery/01.jpg',
        descHead: 'Коворкинг 1',
        descText: 'Уже сейчас один из самых популярных форматов\n'
        + 'для начинающих предпринимателей и фрилансеров.\n'
        + 'Не смотря на особое, зачастую, «плавающее» распределение\n'
        + 'рабочих мест',
      },
      {
        descHead: 'Коворкинг 2',
        descText: 'Уже сейчас один из самых популярных форматов\n'
    + 'для начинающих предпринимателей и фрилансеров.\n'
    + 'Не смотря на особое, зачастую, «плавающее» распределение\n'
    + 'рабочих мест',
        name: 2,
        imgSrc: 'images/block-gallery/01.jpg',
      },
      {
        descHead: 'Коворкинг 3',
        descText: 'Уже сейчас один из самых популярных форматов\n'
+ 'для начинающих предпринимателей и фрилансеров.\n'
+ 'Не смотря на особое, зачастую, «плавающее» распределение\n'
+ 'рабочих мест',
        name: 3,
        imgSrc: 'images/block-gallery/01.jpg',
      },
    ],
  }

  get selectOptions() {
    return this.ui.albums.map((album: { date: any; }) => album.date);
  }

  close(): void {
    this.ui.TOGGLE_GALLERY_MODAL();
  }

  async created() {
    if (!this.ui.albums.length) {
      await this.ui.getAlbums();
    }
    /* eslint prefer-destructuring: "off" */
    this.selectedOption = this.ui.album.date;
  }
}
</script>

<style lang="scss" scoped>
// $
.modal-gallery {
  @extend %container-padding;

  @include padding-y-arr(
    ("mob": 32px)
  );

  min-height: 100vh;
  overflow: hidden;

  &__select {
    display: grid;
    grid-gap: 8px;
    justify-content: start;

    @media #{$mq-xs} {
      align-items: center;
      grid-auto-flow: column;
    }

    ::v-deep {
      .q-field {
        &__native {
          @include font(("mob": 16px), 1, 500, -0.01em);
        }

        &__control {
          padding: 0 16px;
        }

        &__marginal {
          height: 49px;
        }

        &--auto-height {
          .q-field__control,
          .q-field__native {
            height: 49px;
            min-height: 49px;
          }
        }
      }
    }
  }

  &__select-name {
    @include font(("mob": 20px), 1.2, 500, -0.01em);
  }

  &__slider {
    @include bp-change(width, ("md": 960px, "lg": 1345px));
    @include margin-x-arr(("md": auto));

    margin-top: 112px;

    ::v-deep .gallery-slider__counter {
      bottom: auto;
      left: auto;
      position: absolute;
      right: 0;
      top: -30px;
      transform: none;
    }
  }

  &__dropdown {
    background: #7a1e24;
    margin-left: 200px;
    width: 364px !important;
  }

  &__select-popup {
    ::v-deep {
      .q-item {
        @include font(("mob": 16px), 1, 500, -0.01em);
      }
    }
  }
}
</style>

<style>
  .q-menu {
    z-index: 9999999;
  }
</style>
