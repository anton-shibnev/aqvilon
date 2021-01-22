<template>
  <modal @close="handleClose()">
    <section :class="name">
      <div
        :class="`${name}__hero`"
      >
        <div
          :class="`${name}__hero-title`"
          v-text="ui.pageInfo.title"
        />
        <div
          :class="`${name}__hero-date`"
        >
          Акция: до {{ formatEndDate() }}
        </div>
        <pic
          :class="`${name}__hero-pic`"
          :src="proc(ui.pageInfo.image_max_768x768.url)"
        />
      </div>
      <div
        :class="`${name}__content`"
        v-html="ui.pageInfo.description"
      />
      <div
        v-if="ui.pageInfo.other_promo.length > 1"
        :class="`${name}__bottom`"
      >
        <article-slider
          :options="ui.pageInfo.other_promo"
          :class="`${name}__slider`"
        />
      </div>
    </section>
  </modal>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Pic from 'components/base/Pic.vue';
import ArticleSlider from 'components/ArticleSlider.vue';
import Modal from 'components/base/Modal.vue';
import { getModule } from 'vuex-module-decorators';
import UI from 'src/store/modules/UI';

@Component({
  components: { Modal, ArticleSlider, Pic },
  async preFetch({ store, currentRoute }) {
    const slug = currentRoute.params.discountId;
    const ui = getModule(UI, store);
    await ui.getPageData({ name: 'home.PromotionPage', options: { slug } });
  },
})
export default class ModalArticle extends Vue {
  name = 'modal-article'

  ui = getModule(UI, this.$store);

  proc(src: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${process.env.API}${src}`;
  }

  async handleClose(): Promise<void> {
    await this.$router.push('/');
  }

  formatEndDate() {
    return this.ui.pageInfo.end_date.split('-').reverse().join('.');
  }
}
</script>

<style lang="scss" scoped>
// $
.modal-article {
  @extend %container-padding;

  @include bp-change(padding-top, ("mob": 88px, "xs": 0));

  &__hero {
    @include bp-change(height, ("xs": 384px, "md": 486px, "lg": 680px));
    @include bp-change(padding, ("xs": 24px 24px 32px, "md": 48px 48px 57px, "lg": 48px 48px 57px));

    position: relative;

    @media #{$mq-xs} {
      align-content: end;
      border-radius: 0 0 5px 5px;
      color: $white;
      display: grid;
      overflow: hidden;
    }
  }

  &__hero-title {
    @extend %h2;

    @include bp-change(max-width, ("md": 748px, "lg": 815px));

    position: relative;
    z-index: 5;
  }

  &__hero-date {
    @include bp-change(margin-top, ("mob": 8px, "xs": 16px, "md": 22px));
    @include font(("mob": 16px, "xs": 20px, "md": 24px), 1.2, 400, -0.01em);

    position: relative;
    z-index: 5;
  }

  &__hero-pic {
    @include bp-change(margin-top, ("mob": 24px, "xs": 0));

    border-radius: 5px;
    overflow: hidden;

    @media #{$mq-xs} {
      @include abs-spread();

      border-radius: 0;
    }

    ::v-deep .q-img__content {
      background-color: rgba(#0e0f12, 0.24);
    }
  }

  &__content {
    @include bp-change(
      margin,
      ("mob": 32px 0 0, "xs": 40px 0 0, "md": 48px 0 0 163px, "lg": 48px 0 0 228px)
    );
    @include bp-change(padding-bottom, ("mob": 154px, "xs": 113px));

    @media #{$mq-md} {
      max-width: 797px;
    }

    h3 {
      @include font(("mob": 20px, "xs": 24px, "lg": 32px), 1.2, 500, -0.01em);

      &:not(:last-child) {
        @include bp-change(margin-bottom, ("mob": 16px, "xs": 25px));
      }
    }

    p {
      @include font(("mob": 16px, "lg": 20px), 1.2, 400, -0.01em);

      color: $dark-grey;

      &:not(:last-child) {
        @include bp-change(margin-bottom, ("mob": 10px, "xs": 25px, "md": 18px, "lg": 24px));
      }
    }
  }

  &__bottom {
    @include padding-y(40px, 64px);
    @include p-wider($container-padding);

    background-color: $light-grey;
    overflow: hidden;

    @media #{$mq-md} {
      @include padding-y(51px, 64px);
    }

    @media #{$mq-lg} {
      @include padding-y(64px);
    }
  }

  &__slider {
    @include bp-change(width, ("mob": 307px, "xs": 634px, "md": 100%));
  }
}
</style>
