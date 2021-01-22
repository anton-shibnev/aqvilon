<template>
  <q-page @wheel="pageScroll($event)">
    <q-scroll-observer @scroll="onScroll($event)" />
    <hero
      :options="heroOptions"
      :server-data="page"
    />
    <div
      :style="{ transition: `${transitionDuration}ms` }"
      class="content-wrapper"
      :class="{ 'content-wrapper_up': heroScrolled }"
    >
      <Header
        :style="{ transition: `${transitionDuration}ms` }"
        :options="headerOptions"
        :is-sticky="heroScrolled"
        :server-data="page"
        @targetScroll="onTargetScroll()"
      />
      <list-pic-block :options="page" />
      <numbers-block :options="page" />
      <map-block
        :options="mapBlockOptions"
        :server-data="page"
      />
      <q-no-ssr>
        <privileges-block :options="page" />
      </q-no-ssr>
      <stage-develop
        :options="stageDevelopOptions"
        :server-data="page"
      />
      <future-block :options="page" />
      <q-intersection
        once
        ssr-prerender
      >
        <gallery-block
          :options="galleryBlockOptions"
          :server-data="page"
        />
      </q-intersection>
      <cards-block :options="page" />
      <pride-block :options="page" />
      <form-block
        :options="formBlockOptions"
        :server-data="page"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Vue, Component } from 'vue-property-decorator';
import Hero from 'components/hero/Hero.vue';
import ListPicBlock from 'components/ListPicBlock.vue';
import NumbersBlock from 'components/NumbersBlock.vue';
import MapBlock from 'components/MapBlock.vue';
import PrivilegesBlock from 'components/PrivilegesBlock.vue';
import StageDevelop from 'components/stage-devolop/StageDevelop.vue';
import FutureBlock from 'components/FutureBlock.vue';
import GalleryBlock from 'components/GalleryBlock.vue';
import CardsBlock from 'components/CardsBlock.vue';
import PrideBlock from 'components/PrideBlock.vue';
import FormBlock from 'components/FormBlock.vue';
import Header from 'components/header/Header.vue';
import { getModule } from 'vuex-module-decorators';
import UI from 'src/store/modules/UI';

@Component({
  components: {
    Header,
    FormBlock,
    PrideBlock,
    CardsBlock,
    GalleryBlock,
    FutureBlock,
    StageDevelop,
    PrivilegesBlock,
    MapBlock,
    NumbersBlock,
    ListPicBlock,
    Hero,
  },
  async preFetch({ store }) {
    const ui = getModule(UI, store);
    await ui.getPageData({ name: 'home.HomePage' });
    await ui.getAdvantagesData({ name: 'home.BenefitsPage' });
  },
})
export default class PageIndex extends Vue {
  ui = getModule(UI, this.$store);

  get page(): any {
    return this.ui.pageInfo as any;
  }

  get advantages(): any {
    return this.ui.advantages as any;
  }

  heroScrolled = false;
  scrollIsActive = false;
  transitionDuration = 500;

  onScroll(event) {
    if (event.position === 0 && this.heroScrolled) {
      this.heroScrolled = false;
      this.scrollIsActive = false;
    } else if (event.position >= window.scrollY && event.position !== 0) {
      this.heroScrolled = true;
      this.scrollIsActive = true;
    }
  }

  onTargetScroll() {
    this.scrollIsActive = true;
    this.heroScrolled = true;
  }

  pageScroll(event) {
    if (window.scrollY === 0 && event.deltaY < 0) {
      this.heroScrolled = false;
      this.scrollIsActive = false;
      event.preventDefault();
      return;
    }
    if (!this.scrollIsActive) {
      this.heroScrolled = true;
      setTimeout(() => {
        this.scrollIsActive = true;
      }, this.transitionDuration);
      event.preventDefault();
    }
  }

  // TODO вынести глобально, и испольнозовать в BurgerMenu
  headerOptions = {
    tel: '8 800 555 35 35',
    btn: { label: 'Подбор помещения' },
    list: [
      { href: '#listPicBlock', text: 'Преимущества' },
      { href: '#mapBlock', text: 'Локация' },
      { href: '#privilegesBlock', text: 'Детали' },
      { href: '#stageDevelop', text: 'Строительство' },
      { href: '#futureBlock', text: 'Отделка' },
      { href: '#prideBlock', text: 'Девелопер' },
      { href: '#formBlock', text: 'Контакты' },
    ],
  };

  heroOptions = {
    slide: '1',
    title: 'АКВИЛОН LINKS',
    subTitle: 'БИЗНЕС-ЦЕНТР <span>КЛАССА «А»</span>',
    dateRelease: 'IV КВАРТАЛ 2021 ГОДА ',
    slideList: [
      { name: '1', pic: '01' },
      { name: '2', pic: '01' },
      { name: '3', pic: '01' },
      { name: '4', pic: '01' },
      { name: '5', pic: '01' },
    ],
  };

  listPicBlockOptions = {
    title: 'Инвестиционные преимущества',
    pic: '01',
    list: [
      {
        title: 'Надежный бизнес-актив',
        desc:
          'Объект относится к сегменту недвижимости, генерирующей постоянный доход. '
          + 'Офисная недвижимость устойчива '
          + 'к инфляции, удобна в управлении и гарантирует инвестору высокий доход.',
      },
      {
        title: 'Высокая ликвидность объекта',
        desc:
          'Качественные характеристики проекта, отличное '
          + 'расположение и высокий спрос на офисную недвижимость '
          + 'класса «А» обеспечивают высокую ликвидность Объекту.',
      },
      {
        title: 'Растущие арендные ставки',
        desc:
          'Благодаря выгодному расположению общественно-деловой '
          + 'зоны «Аквилон LINKS», а также функциональным планировкам '
          + 'и инженерной оснащенности, арендные ставки на помещения '
          + 'будут расти. ',
      },
      {
        title: 'Статусное расположение',
        desc:
          'Объект расположен в одном из исторических центров '
          + 'Санкт-Петербурга, на Московском проспекте. Резидентам обеспечена единая'
          + ' социальная среда, престиж и безупречная '
          + 'транспортная доступность.',
      },
    ],
  };

  numbersBlockOptions = [
    {
      title: 'Масштабы проекта',
      unit: 'м²',
      separator: 'slash',
      numList: [
        { name: 'GBA', value: '10 711' },
        { name: 'GLA', value: '8 328' },
      ],
    },
    {
      title: 'Типы планировок',
      unit: 'м²',
      separator: 'dash',
      numList: [
        { name: 'от', value: '14' },
        { name: 'до', value: '885' },
      ],
    },
  ];

  mapBlockOptions = {
    title: 'Местоположение',
    desc:
      'Одним из ключевых преимуществ бизнес-центра «Аквилон LINKS» является '
      + 'его расположение в статусной части Адмиралтейского района. Это состоявшаяся '
      + 'бизнес-локация с объектами жилья и коммерции премиального класса. Резидентам '
      + 'бизнес-центра гарантировано единое социальное окружение и безупречная '
      + 'транспортная доступность. ',
    addressDesc: 'Офис продаж: ',
    addressValue: 'Московский просп., 73, корп. 6, Санкт-Петербург',
    routList: [
      { name: 'Фрунзенская', minutes: 5, icon: 'pedestrian' },
      { name: 'Московские ворота', minutes: 10, icon: 'pedestrian' },
      { name: 'Балтийская', minutes: 15, icon: 'pedestrian' },
      { name: 'До ЗСД', minutes: 5, icon: 'car' },
      { name: 'До аэропорта “Пулково”', minutes: 10, icon: 'car' },
      { name: 'До Невского проспекта', minutes: 15, icon: 'car' },
    ],
    tel: '8 (812) 341-11-11',
    btn: {
      label: 'Консультация',
      color: 'primary',
    },
  };

  privilegesOptions = {
    title: 'Преимущества',
    boxList: [
      {
        title: 'Технологичность',
        to: '/',
        src: 'images/privileges/01.jpg',
      },
      {
        title: 'Энергоэффективность',
        to: '/',
        src: 'images/privileges/02.jpg',
      },
      {
        title: 'Безопасность',
        to: '/',
        src: 'images/privileges/03.jpg',
      },
      {
        title: 'Комфорт',
        to: '/',
        src: 'images/privileges/04.jpg',
      },
    ],
  };

  stageDevelopOptions = {
    title: 'Ход строительства',
    desc:
      'В ноябре 2020 было объявлено о начале стройки ЖК «Авангард» с подземным \n'
      + 'паркингом.\n'
      + ' На сайте ежемесячно появляются наглядные фото о ходе строительства объекта и выполненных работах.',
    releaseDesc: 'Срок сдачи:',
    releaseDate: 'IV КВАРТАЛ 2021 ГОДА',
    btnOnline: {
      label: 'Онлайн-трансляция',
    },
    btnArchive: {
      label: 'Архив',
    },
    galleryList: [
      {
        src: 'images/stage-develop/01.jpg',
        date: 'Июнь 2020',
        count: { value: 24, name: 'фотографии' },
      },
      {
        src: 'images/stage-develop/01.jpg',
        date: 'Июнь 2020',
        count: { value: 24, name: 'фотографии' },
      },
      {
        src: 'images/stage-develop/01.jpg',
        date: 'Июнь 2020',
        count: { value: 24, name: 'фотографии' },
      },
      {
        src: 'images/stage-develop/01.jpg',
        date: 'Июнь 2020',
        count: { value: 24, name: 'фотографии' },
      },
    ],
  };

  futureBlockOptions = {
    title: 'Ваш будущий офис',
    pic: '02',
    descHead: 'Shell & Core',
    descText:
      'Этот формат отделки – идеальное решение для компаний, желающих '
      + 'полностью адаптировать пространство под собственные потребности. ',
    list: [
      {
        title: 'Индивидуальная планировка',
        desc:
          'Планировочное решение будет разработано эксклюзивно под нужды компании заказчика.',
        icon: 'maze',
      },
      {
        title: 'Эксклюзивный дизайн',
        desc:
          'Отделка выполняется с учетом корпоративного стиля'
          + 'компании и визуальных предпочтений заказчика',
        icon: 'palette',
      },
      {
        title: 'Качественная отделка',
        desc:
          'Отделка выполняется с учетом корпоративного стиля '
          + 'компании и визуальных предпочтений заказчика',
        icon: 'bricklaying',
      },
    ],
  };

  galleryBlockOptions = {
    title: 'Офис-формации',
    galleryOptions: {
      bullets: true,
      active: 1,
      list: [
        {
          name: 1,
          imgSrc: 'images/block-gallery/01.jpg',
          descHead: 'Коворкинг 1',
          descText:
            'Уже сейчас один из самых популярных форматов\n'
            + 'для начинающих предпринимателей и фрилансеров.\n'
            + 'Не смотря на особое, зачастую, «плавающее» распределение\n'
            + 'рабочих мест',
        },
        {
          descHead: 'Коворкинг 2',
          descText:
            'Уже сейчас один из самых популярных форматов\n'
            + 'для начинающих предпринимателей и фрилансеров.\n'
            + 'Не смотря на особое, зачастую, «плавающее» распределение\n'
            + 'рабочих мест',
          name: 2,
          imgSrc: 'images/block-gallery/01.jpg',
        },
        {
          descHead: 'Коворкинг 3',
          descText:
            'Уже сейчас один из самых популярных форматов\n'
            + 'для начинающих предпринимателей и фрилансеров.\n'
            + 'Не смотря на особое, зачастую, «плавающее» распределение\n'
            + 'рабочих мест',
          name: 3,
          imgSrc: 'images/block-gallery/01.jpg',
        },
      ],
    },
  };

  cardsBlockOptions = {
    title: 'Гибкая система оплаты',
    cardList: [
      {
        icon: 'todo',
        title: 'Индивидуальные условия рассрочки',
        desc: 'Индивидуальные условия рассрочки',
      },
      {
        icon: 'cal',
        title: 'Рассрочка до конца строительства',
        desc: 'С ежеквартальными платежами или без промежуточных платежей',
      },
      {
        icon: 'analytics',
        title: 'от 10% первоначальный взнос',
        desc: 'Индивидуальные условия рассрочки',
      },
    ],
  };

  prideBlockOptions = {
    title: 'Ключевой арендатор',
    descList: [
      'Группа «Аквилон» — крупнейший строительно-инвестиционный холдинг, реализующий'
        + ' проекты жилой и коммерческой недвижимости в пяти регионах России – Санкт-Петербурге, '
        + 'Ленинградская область, Москве, Архангельске и Северодвинске.',
      'Основная специализация компании – строительство жилья комфорт- и бизнес-класса, '
        + 'проектирование, архитектура, развитие городских территорий. Группа «Аквилон» основана в '
        + '2003 году и за время работы построила в срок и ввела в эксплуатацию более 2 млн кв.м недвижимости – '
        + 'это жилые комплексы, детские сады, школы, офисные и гостиничные комплексы, торгово-развлекательные центры.',
    ],
    btn: {
      label: 'Перейти на сайт',
      to: '/',
    },
    list: [
      {
        title: '16 лет',
        desc: 'на рынке недвижимости',
      },
      {
        title: 'ТОП-20',
        desc: 'крупнейших застройщиков России',
      },
      {
        title: '1,6 млн м²',
        desc: 'площади в реализации в настоящее время',
      },
      {
        title: '>100 объектов',
        desc: 'сдано точно в срок',
      },
      {
        title: 'ТОП-10',
        desc: 'крупнейших застройщиков СПб',
      },
      {
        title: '4 города',
        desc: 'Москва, Санкт-Петербург, Архангельск, Северодвинск',
      },
    ],
  };

  formBlockOptions = {
    title: 'Свяжитесь с нами',
    desc:
      'Персональный менеджер ответит на все вопросы и подготовит для вас индивидуальное предложение.',
    btn: {
      label: 'Отправить',
    },
  };
}
</script>

<style lang="scss">
.video {
  background: $white !important;
}

.content-wrapper {
  background-color: $white;
  position: relative;
  z-index: 1000;

  &_up {
    transform: unset !important;
  }

  @media #{$mq-md} {
    transform: translateY(calc(100vh - #{map-get($header-height, "md")}));
  }

  @media #{$mq-lg} {
    transform: translateY(calc(100vh - #{map-get($header-height, "lg")}));
  }
}
</style>
