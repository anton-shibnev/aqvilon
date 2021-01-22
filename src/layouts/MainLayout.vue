<template>
  <q-layout
    ref="layout"
    view="hHh lpR fFf"
    @resize="onResize()"
  >
    <q-page-container
      class="main panel"
      :style="`margin-bottom: ${layoutMarginBottom}px`"
    >
      <router-view />
      <widgets :class="{ 'absolute': inFooter && $q.screen.gt.sm }" />
    </q-page-container>
    <Footer
      :options="footerOptions"
      v-intersection="onIntersection"
    />
    <q-no-ssr>
      <burger-menu
        :options="burgerMenuOptions"
        :server-data="page"
        :is-active="ui.isOpen"
      />
    </q-no-ssr>
    <q-no-ssr>
      <modal-archive
        v-if="ui.isArchiveModalOpen"
        :options="modalArchiveOptions"
      />
    </q-no-ssr>
    <q-no-ssr>
      <modal-gallery
        v-if="ui.isGalleryModalOpen"
        :options="modalGalleryOptions"
      />
    </q-no-ssr>
    <q-no-ssr>
      <modal-stream
        v-if="ui.isStreamOpen"
      />
    </q-no-ssr>
  </q-layout>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Component, Vue } from 'vue-property-decorator';
import Footer from 'components/base/Footer.vue';
import BurgerMenu from 'components/header/BurgerMenu.vue';
import Modal from 'components/base/Modal.vue';
import ModalArticle from 'components/ModalArticle.vue';
import ModalArchive from 'components/ModalArchive.vue';
import ModalGallery from 'components/ModalGallery.vue';
import Widgets from 'components/base/Widgets.vue';
// import { Screen } from 'quasar';
import ModalAdvantages from 'components/modal-advantages/ModalAdvantages.vue';
import { getModule } from 'vuex-module-decorators';
import UI from 'src/store/modules/UI';
import DocsModal from 'components/DocsModal.vue';
import ModalStream from 'components/ModalStream.vue';

@Component({
  components: {
    ModalStream,
    DocsModal,
    ModalAdvantages,
    Widgets,
    ModalGallery,
    ModalArchive,
    ModalArticle,
    Modal,
    BurgerMenu,
    Footer,
  },
  async preFetch({ store }) {
    const ui = getModule(UI, store);
    await ui.getPageData({ name: 'home.HomePage' });
  },
})

export default class MainLayout extends Vue {
  ui = getModule(UI, this.$store)

  inFooter = true

  mounted() {
    window.addEventListener('message', (e) => {
      const { data } = e;
      switch (data.answer) {
        case 'close-eva':
          this.ui.CLOSE_EVA();
          break;

        case 'route-change':
          if (window.history.pushState) {
            window.history.pushState(null, null, `#${data.msg}`);
          } else {
            window.location.hash = `#${data.msg}`;
          }
          break;

        default:
          console.log(data.answer);
          break;
      }
    }, false);
  }

  getDomElHeight(id:string) {
    if (process.env.CLIENT) {
      const el = document.getElementById(id);

      return el === null ? 0 : el.clientHeight;
    }
    return '';
  }

  layoutMarginBottom = this.getDomElHeight('footer');

  get page(): any {
    return this.ui.pageInfo as any;
  }

  onResize() {
    this.layoutMarginBottom = 0;
  }

  onIntersection() {
    this.inFooter = !this.inFooter;
  }

  modalAdvantagesOptions = {
    title: 'Преимущества',
  }

  modalGalleryOptions = {
    selectName: 'Отчет за:',
    selectOptions: {
      name: 'date',
      model: 'В любое время',
      options: ['С 12 до 15 часов', 'С 15 до 21 часов'],
    },
    galleryOptions: {
      counter: true,
      bullets: false,
      list: [
        { name: 1, imgSrc: 'images/stage-develop/01.jpg' },
        { name: 2, imgSrc: 'images/block-gallery/01.jpg' },
        { name: 3, imgSrc: 'images/block-gallery/01.jpg' },
      ],
    },
  }

  modalArchiveOptions = {
    title: 'Архив',
    galleryList: [
      { src: 'images/stage-develop/01.jpg', date: 'Июнь 2020', count: { value: 24, name: 'фотографии' } },
      { src: 'images/stage-develop/01.jpg', date: 'Июнь 2020', count: { value: 24, name: 'фотографии' } },
      { src: 'images/stage-develop/01.jpg', date: 'Июнь 2020', count: { value: 24, name: 'фотографии' } },
      { src: 'images/stage-develop/01.jpg', date: 'Июнь 2020', count: { value: 24, name: 'фотографии' } },
    ],
  }

  // headerOptions = {
  //   tel: '8 800 555 35 35',
  //   btn: { label: 'Подбор помещения' },
  //   list: [
  //     { href: '#', text: 'Преимущества' },
  //     { href: '#', text: 'Локация' },
  //     { href: '#', text: 'Детали' },
  //     { href: '#', text: 'Отделка' },
  //     { href: '#', text: 'Девелопер' },
  //     { href: '#', text: 'Строительство' },
  //     { href: '#', text: 'Контакты' },
  //   ],
  // }

  // TODO вынести глобально, и испольнозовать из Header
  burgerMenuOptions = {
    // drawer: true,
    title: 'Меню',
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
  }

  footerOptions = {
    logoSrc: 'images/footer/logo-footer.svg',
    devDesc: 'Девелопер проекта: ',
    devLogoSrc: 'images/footer/dev-logo.svg',
    socList: [
      { href: 'https://vk.com/akvilon_group', icon: 'vk' },
      { href: 'https://www.instagram.com/akvilon_official/', icon: 'instagram' },
      { href: 'https://www.facebook.com/akviloninvest/', icon: 'facebook' },
    ],
    officeList: [
      [
        { is: 'div', name: 'Офис продаж:', value: 'Московский просп., 73, корп. 6, Санкт-Петербург' },
        { is: 'div', name: 'Время работы:', value: ['пн-пт: 09.00–21.00; ', 'сб: 10.00–20.00; вс 10.00–19.00'] },
        {
          is: 'a', name: 'Телефон:', linkType: 'tel', value: '8 (812) 341-11-11',
        },
        {
          is: 'a', name: 'E-mail:', linkType: 'mailto', value: 'invest@akvilon-invest.ru',
        },
      ],
      [
        { is: 'div', name: 'Офис на объекте:', value: 'Московский просп., 73, корп. 6, Санкт-Петербург' },
        { is: 'div', name: 'Время работы:', value: 'ежедневно: 09.00–21.00;' },
        {
          is: 'a', name: 'Телефон:', linkType: 'tel', value: '8 (812) 341-11-11',
        },
        {
          is: 'a', name: 'E-mail:', linkType: 'mailto', value: 'invest@akvilon-invest.ru',
        },
      ],
    ],
    bottomList: [
      { text: 'Документы', href: '/documents' },
      { text: 'Пользовательское соглашение', href: '/information' },
      { text: 'Политика конфиденциальности', href: '/privacy-policy' },
    ],
    disclaimer: 'Обращаем Ваше внимание на то, что информация, размещенная на сайте, носит\n'
      + 'исключительно информационно-рекламный характер, не является офертой, публичной\n'
      + 'офертой в соответствии со статьей 435 и пунктом 2 статьи 437 Гражданского кодекса\n'
      + 'Российской Федерации.\n'
      + 'Размещенные на сайте планировки не являются точными копиями проектной\n'
      + 'документации или документов технической инвентаризации, и выполнены в рекламных\n'
      + 'целях для наглядного представления характеристик помещений.\n'
      + 'Элементы благоустройства, материалы и цвета отделки фасада строящегося бизнес-\n'
      + 'центра, мест общего пользования и иных помещений в строящемся доме могут\n'
      + 'отличаться от приведенных на сайте. Для получения актуальной информации об условиях '
      + 'продаж, а также о характеристиках\n'
      + 'помещений, мест общего пользования Вы можете обратиться в отдел продаж Группы\n'
      + '«Аквилон».',
    webDev: { href: 'https://alertgroup.ru/ru', text: 'AlertGroup' },
  }

  docsModalOptions = {
    list: [
      {
        title: 'Корпус 1А',
        docList: [
          {
            title: 'ДСогласие на обробатку персональных данных',
            fileType: 'docx',
            size: 0.22,
            date: '15 сентября 2020',
            time: '13:08',
            href: '#',
          },
          {
            title: 'ДСогласие на обробатку персональных данных',
            fileType: 'pdf',
            size: 0.22,
            date: '15 сентября 2020',
            time: '13:08',
            href: '#',
          },
        ],
      },
      {
        title: 'Корпус 2Б',
        docList: [
          {
            title: 'ДСогласие на обробатку персональных данных',
            fileType: 'docx',
            size: 0.22,
            date: '15 сентября 2020',
            time: '13:08',
            href: '#',
          },
          {
            title: 'ДСогласие на обробатку персональных данных',
            fileType: 'pdf',
            size: 0.22,
            date: '15 сентября 2020',
            time: '13:08',
            href: '#',
          },
        ],
      },
    ],
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-color: $white;
  padding-bottom: 0 !important;
  position: relative;
  z-index: 3000;

  @media #{$mq-md} {
    padding-top: 0 !important;
  }

  @media (max-height: $max-height-for-footer) {
    margin-bottom: 0 !important;
  }
}
</style>

<style>
  .absolute {
    position: absolute !important;
  }
</style>
