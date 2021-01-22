<template>
  <outer :id="name | camelize">
    <section :class="name">
      <div
        :class="`${name}__title`"
        v-text="options.title"
      />
      <div
        :class="`${name}__desc`"
        v-text="serverData.building_process_desc"
      />

      <div :class="`${name}__release`">
        <div
          :class="`${name}__release-desc`"
          v-text="options.releaseDesc"
        />
        <div
          :class="`${name}__release-date`"
          v-text="serverData.prjct_end_date_txt"
        />
      </div>
      <btn
        :class="`${name}__btn-online`"
        :label="options.btnOnline.label"
        @click="ui.TOGGLE_STREAM()"
      />
      <div :class="`${name}__progress`">
        <div :class="`${name}__wrap-progress`">
          <div :class="`${name}__nipple`" />
          <div
            :class="`${name}__nipple ${name}__nipple--progress`"
            :style="`left: ${progress}%`"
          >
            <span :class="`${name}__nipple-desc`">{{ `${currentMonth} (${(Math.round(progress))}%)` }}</span>
          </div>
          <div
            :class="[
              `${name}__nipple`,
              { [`${name}__nipple--disabled`]: progress !== 100 }
            ]"
            :style="`left: 100%`"
          />
          <div :class="`${name}__progress-line`">
            <div
              v-for="(item, index) in divider"
              :key="index"
              :class="`${name}__progress-line-inner`"
              :style="`width: ${getLineWidth(index)}%`"
            >
              <span
                :class="`${name}__progress-line-inner-desc`"
                v-text="item"
              />
            </div>
          </div>
          <div :class="`${name}__progress-line-back`">
            <div
              v-for="(_, index) in divider.length - 1"
              :key="index"
              :class="`${name}__progress-line-inner-back`"
            />
          </div>
        </div>
        <div :class="`${name}__progress-desc`">
          <div
            v-for="(item, index) in progressList"
            :key="index"
            :class="`${name}__progress-desc-item`"
          >
            <span v-text="item" />
          </div>
        </div>
      </div>
      <div :class="`${name}__gallery-list`">
        <div
          v-for="(item, index) in lastAlbums"
          :key="index"
          :class="`${name}__gallery-item`"
        >
          <stage-card
            :options="item"
            @open-archive="openPopup(item.id)"
          />
        </div>
      </div>
      <btn
        :class="`${name}__btn-archive`"
        :label="options.btnArchive.label"
        custom-color="secondary"
        @click="ui.TOGGLE_ARCHIVE_MODAL()"
      />
    </section>
  </outer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Outer from 'components/base/Outer.vue';
import Btn from 'components/base/Btn.vue';
import StageCard from 'components/stage-devolop/StageCard.vue';
import projectDates from 'src/utils/projectDates';
import { getModule } from 'vuex-module-decorators';
import UI from 'src/store/modules/UI';

@Component({
  components: { StageCard, Btn, Outer },
})
export default class StageDevelop extends Vue {
  @Prop({ type: Object }) options: never | undefined;
  @Prop({ type: Object }) serverData: any | undefined;

  name = 'stage-develop';

  ui = getModule(UI, this.$store);

  get progress() {
    const start = new Date(this.serverData?.prjct_start_date).getTime();
    const end = new Date(this.serverData?.prjct_end_date).getTime();
    const current = Date.now();

    return ((current - start) / (end - start)) * 100;
  }

  get getProjectDateStart() {
    return 'Начало строительства — III кв 2020 г.';
  }

  get getProjectDateEnd() {
    return projectDates(this.serverData?.prjct_end_date, true) || this.serverData?.prjct_end_date_txt;
  }

  get progressList() {
    return [this.getProjectDateStart, this.getProjectDateEnd];
  }

  get lastAlbums() {
    return this.serverData.process_albums.slice(0, 4);
  }

  divider = ['', '25%', '50%', '75%', ''];

  get currentMonth() {
    const date = new Date();
    const month = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ][date.getMonth()];
    return `${month} ${date.getFullYear()}`;
  }

  getLineWidth(index: number) {
    const percent = 100 / (this.divider.length - 1);
    if (this.progress > (index + 1) * percent) {
      return 100;
    }
    return (this.progress - index * percent) * (this.divider.length - 1);
  }

  async openPopup(id: number): Promise<void> {
    await this.ui.getAlbum(id);
    this.ui.TOGGLE_GALLERY_MODAL();
  }
}
</script>

<style lang="scss" scoped>
// $
.stage-develop {
  $progress-divider: 4;

  $progress-line-height: 5px;

  &__title {
    @extend %h2;

    @media #{$mq-xs} {
      grid-area: title;
    }
  }

  &__desc {
    @extend %stage-develop-desc;

    margin-top: 16px;

    @media #{$mq-xs} {
      grid-area: desc;
      margin-top: 24px;
    }

    @media #{$mq-md} {
      @include margin-y(16px, 39px);

      max-width: 600px;
    }

    @media #{$mq-lg} {
      @include margin-y(25px, 55px);

      max-width: 880px;
    }
  }

  &__progress {
    display: none;
    user-select: none;

    @media #{$mq-md} {
      display: grid;
      grid-area: progress;
      grid-gap: 17px;
      margin-top: 65px;
    }
  }

  &__progress-line-back {
    @media #{$mq-md} {
      border-radius: 5px;
      bottom: 0;
      display: grid;
      grid-gap: 2px;
      grid-template-columns: repeat($progress-divider, 1fr);
      height: $progress-line-height;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }

  &__progress-line-inner-back {
    background-color: $secondary-light-color;
    //background-color: $white;

    border-radius: 5px;
    height: $progress-line-height;
    position: relative;
  }

  &__progress-line {
    @media #{$mq-md} {
      border-radius: 5px;
      display: grid;
      grid-gap: 2px;
      grid-template-columns: repeat($progress-divider, 1fr);
      height: $progress-line-height;
      position: relative;
      width: 100%;
      z-index: 5;
    }
  }

  &__progress-line-inner {
    background-color: $accent-button;
    border-radius: 5px;
    height: $progress-line-height;
    position: relative;
    width: 0;
  }

  &__progress-line-inner-desc {
    bottom: -35px;
    left: -10px;
    position: absolute;
  }

  &__progress-desc {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  &__progress-desc-item {
    &:last-child {
      justify-self: end;
    }
  }

  &__release {
    @include margin-y(32px, 16px);

    @media #{$mq-xs} {
      @include margin-y(55px, 24px);

      grid-area: release;
    }

    @media #{$mq-md} {
      @include margin-y(16px, 0);
    }

    @media #{$mq-lg} {
      margin: 25px 0 0 46px;
    }
  }

  &__release-desc {
    @extend %stage-develop-release-desc;
  }

  &__release-date {
    @extend %stage-develop-release-date;

    margin-top: 2px;
    text-transform: uppercase;

    @media #{$mq-xs} {
      margin-top: 4px;
    }

    @media #{$mq-lg} {
      margin-top: 7px;
    }
  }

  &__btn-online {
    cursor: pointer;

    @media #{$mq-xs} {
      grid-area: btn-online;
      justify-self: start;
      margin-right: 15px;
    }

    @media #{$mq-md} {
      min-width: max-content;
    }

    @media #{$mq-lg} {
      margin-right: 25px;
    }
  }

  &__gallery-list {
    display: grid;
    grid-gap: 15px;
    margin-top: 24px;

    @media #{$mq-xs} {
      grid-area: gallery;
      grid-auto-rows: 300px;
      grid-gap: 24px 20px;
      grid-template-columns: repeat(2, 1fr);
      margin-top: 31px;
    }

    @media #{$mq-md} {
      grid-template-columns: repeat(4, 1fr);
    }

    @media #{$mq-lg} {
      grid-auto-rows: 379px;
    }
  }

  &__btn-archive {
    cursor: pointer;
    margin-top: 24px;
    width: 100%;

    @media #{$mq-xs} {
      grid-area: btn-archive;
      margin-top: 0;
    }

    @media #{$mq-md} {
      max-width: min-content;
    }
  }

  &__wrap-progress {
    background-color: $white;
    position: relative;
  }

  &__nipple {
    $d: 8px;

    @include circle(20px);

    background-color: $white;
    box-shadow: 0 3px 10px rgba(76, 135, 149, 0.2);
    position: absolute;
    top: 50%;
    transform: translate(-#{$d/2}, -50%);
    z-index: 10;

    &-desc {
      position: absolute;
      top: -100%;
      transform: translateY(-8px);
      white-space: nowrap;
    }

    &::after {
      @include abs-center();
      @include circle($d);

      background-color: $primary;
      content: "";
      display: block;
    }

    &--disabled {
      &::after {
        background-color: $grey;
      }
    }
  }

  @media #{$mq-xs} {
    display: grid;
    grid-gap: 0;
    grid-template-areas:
      "title title title title title title title"
      "desc desc desc desc desc desc desc"
      "release . . . . . ."
      "btn-online btn-archive . . . . . "
      "gallery gallery gallery gallery gallery gallery gallery";
  }

  @media #{$mq-md} {
    grid-template-areas:
      "title title title title"
      "desc desc desc release "
      "btn-online btn-archive . ."
      "progress progress progress progress"
      "gallery gallery gallery gallery";
    grid-template-columns: minmax(auto, min-content);
  }
}
</style>
