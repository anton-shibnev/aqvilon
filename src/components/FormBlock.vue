<template>
  <outer
    :id="name | camelize"
  >
    <div :class="name">
      <div
        :class="`${name}__wrap`"
      >
        <div
          :class="`${name}__title`"
          v-text="options.title"
        />
        <div
          :class="`${name}__desc`"
          v-text="options.desc"
        />
        <q-form
          :class="`${name}__form`"
          @submit="onSubmit()"
        >
          <q-input
            label="Ваше Имя"
            :class="`${name}__input-name`"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Заполните поле']"
            v-model="formFields.name"
          />
          <q-input
            label="Телефон"
            :class="`${name}__input-tel`"
            lazy-rules
            mask="+ 7 (###) ### - ####"
            :rules="[val => val && val.length > 0 || 'Введите номер телефона']"
            v-model="formFields.phone"
          />
          <q-select
            :options="optionsFirst"
            :class="`${name}__input-time`"
            v-model="day"
          />
          <q-select
            :options="schedule"
            :class="`${name}__input-date`"
            v-model="formFields.time"
          />
          <div
            :class="`${name}__policy`"
          >
            <checkbox
              :class="[`${name}__policy-check`, { [`${name}__policy-check--warn`]: isPolicyChecked }]"
              v-model="accept"
            />
            <span
              :class="`${name}__policy-text`"
            >
              Я согласен с условиями <br> <router-link to="privacy-policy">политики конфиденциальности</router-link>
            </span>
          </div>
          <btn
            :label="options.btn.label"
            :class="`${name}__btn`"
            type="submit"
          />
        </q-form>
      </div>
      <q-img
        v-if="!!$q.screen.gt.md && imgUrl"
        :class="`${name}__pic`"
        :src="imgUrl"
      />
    </div>
  </outer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { date } from 'quasar';
import Outer from 'components/base/Outer.vue';
import AInput from 'components/base/AInput.vue';
import Checkbox from 'components/base/Checkbox.vue';
import Btn from 'components/base/Btn.vue';
import ASelect from 'components/base/ASelect.vue';
import { getModule } from 'vuex-module-decorators';
import UI from 'src/store/modules/UI';

@Component({
  components: {
    ASelect,
    Btn,
    Checkbox,
    AInput,
    Outer,
  },
})
export default class FormBlock extends Vue {
  @Prop({ type: Object }) options: any
  @Prop({ type: Object }) serverData: any

  name = 'form-block'

  ui = getModule(UI, this.$store);

  accept = false

  isPolicyChecked: any = null

  optionsFirst = [
    'Сегодня', 'Завтра',
  ]

  day = 'Сегодня'

  schedule = ['Любое', 'с 09:00 до 12:00', 'с 12:00 до 15:00', 'с 15:00 до 18:00', 'с 18:00 до 21:00']

  optionsSecond = [
    this.getCurrentDate(), this.getNextDay(),
  ]

  formFields = {
    name: '',
    phone: '',
    date: this.dayName,
    time: this.schedule[0],
  }

  get dayName() {
    switch (this.day) {
      case this.optionsFirst[0]:
        return this.getCurrentDate();
      case this.optionsFirst[1]:
        return this.getNextDay();
      default:
        return this.getCurrentDate();
    }
  }

  getCurrentDate() {
    const timeStamp = Date.now();
    const formattedString = date.formatDate(timeStamp, 'DD.MM.YYYY');

    return formattedString;
  }

  getNextDay() {
    const timeStamp = Date.now();
    const increased = date.addToDate(timeStamp, { days: 1 });
    const formattedString = date.formatDate(increased, 'DD.MM.YYYY');

    return formattedString;
  }

  get imgUrl() {
    return `${process.env.API}${this.serverData.request_image[0].image_max_1920x1920.url}`;
  }

  async onSubmit() {
    if (this.accept !== true) {
      this.$q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: 'Заполните все поля!',
      });
      this.isPolicyChecked = true;
    } else {
      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Заявка успешно отправлена',
      });
      this.isPolicyChecked = false;
      await this.sendForm();
    }
  }

  onReset() {
    this.formFields = {
      name: '',
      phone: '',
      time: '',
      date: '',
    };

    this.accept = false;
  }

  async sendForm(): Promise<void> {
    await this.ui.formSend(this.formFields);
  }
}
</script>

<style lang="scss" scoped>
// $
.form-block {
  @media #{$mq-md} {
    @include margin-y(-#{map-get($outer-padding, "md")});

    display: grid;
    grid-gap: 183px;
    grid-template-columns: 1fr map-get($form-block-pic-width, "md");
  }

  @media #{$mq-lg} {
    @include margin-y(-#{map-get($outer-padding, "lg")});

    grid-gap: 248px;
    grid-template-columns: 1fr map-get($form-block-pic-width, "lg");
  }

  &__wrap {
    @include bp-change(padding-top, ("md": 128px, "lg": 207px));
  }

  &__pic {
    @include bp-change(height, ("md": 622px, "lg": 880px));

    @media #{$mq-md} {
      @include pin-out(right, map-get($container-padding, "md"));
    }

    @media #{$mq-lg} {
      @include pin-out(right, map-get($container-padding, "lg"));
    }
  }

  &__title {
    @extend %h2;
  }

  &__desc {
    @extend %form-desc;

    @include bp-change(margin-top, ("mob": 16px, "xs": 25px, "md": 24px));
    @include bp-change(max-width, ("mob": 535px, "lg": 900px));
  }

  &__form {
    @include bp-change(margin-top, ("mob": 21px, "xs": 32px, "md": 53px, "lg": 57px));
    @include bp-change(grid-gap, ("mob": 22px, "xs": 11px 20px, "md": 38px 22px, "lg": 30px 22px));

    display: grid;

    @media #{$mq-xs} {
      grid-template-areas:
        "name name tel tel"
        "time date policy policy"
        "btn btn . .";
      grid-template-columns: repeat(4, 1fr);
    }

    @media #{$mq-md} {
      grid-template-areas:
        "name name tel tel"
        "time date policy policy"
        "btn . . .";
    }
  }

  &__input-name {
    @media #{$mq-xs} {
      grid-area: name;
    }
  }

  &__input-tel {
    @media #{$mq-xs} {
      grid-area: tel;
    }
  }

  &__input-date {
    @media #{$mq-xs} {
      grid-area: date;
    }
  }

  &__input-time {
    @media #{$mq-xs} {
      grid-area: time;
    }
  }

  &__policy {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 10px;
    justify-content: start;
    margin-top: 11px;

    @media #{$mq-xs} {
      grid-area: policy;
      grid-gap: 6px;
      margin-top: 20px;
    }

    @media #{$mq-md} {
      margin-top: 27px;
    }
  }

  &__policy-text {
    @extend %form-policy;
  }

  &__policy-check {
    @include bp-change(margin, ("mob": 0 0 0 -10px, "md": -21px -4px 0 -6px, "lg": -10px 0 0 -11px ));

    &--warn ::v-deep .q-checkbox__bg {
      border-color: $danger;
    }
  }

  &__btn {
    @include bp-change(margin-top, ("xs": 26px, "md": -5px, "lg": 10px));

    @media #{$mq-xs} {
      grid-area: btn;
    }
  }
}
</style>
