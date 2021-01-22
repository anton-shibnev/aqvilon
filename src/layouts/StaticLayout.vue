<template>
  <q-layout
    ref="layout"
    view="hHh lpR fFf"
  >
    <!--    <Header-->
    <!--      :options="headerOptions"-->
    <!--      :static="true"-->
    <!--      :server-data="ui.pageInfo"-->
    <!--    />-->
    <q-page-container
      class="main"
    >
      <router-view />
      <widgets />
    </q-page-container>
    <Footer
      :options="footerOptions"
      :static="true"
    />
    <burger-menu
      v-if="isModalOpen"
      :options="burgerMenuOptions"
      :server-data="ui.pageInfo"
    />
  </q-layout>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Vue, Component } from 'vue-property-decorator';
import Header from 'components/header/Header.vue';
import Footer from 'components/base/Footer.vue';
import BurgerMenu from 'components/header/BurgerMenu.vue';
import Modal from 'components/base/Modal.vue';
import { getModule } from 'vuex-module-decorators';
import UI from 'src/store/modules/UI';
import Widgets from 'components/base/Widgets.vue';

@Component({
  components: {
    Widgets,
    Modal,
    BurgerMenu,
    Footer,
    Header,
  },
  async preFetch({ store }) {
    const ui = getModule(UI, store);
    await ui.getPageData({ name: 'home.HomePage' });
  },
})
export default class MainLayout extends Vue {
  layoutMarginBottom = 0

  ui = getModule(UI, this.$store)

  headerOptions = {
    tel: '8 800 555 35 35',
    btn: { label: 'Подбор помещения' },
    list: [
      { href: '#', text: 'Преимущества' },
      { href: '#', text: 'Локация' },
      { href: '#', text: 'Детали' },
      { href: '#', text: 'Отделка' },
      { href: '#', text: 'Девелопер' },
      { href: '#', text: 'Строительство' },
      { href: '#', text: 'Контакты' },
    ],
  }

  burgerMenuOptions = {
    drawer: true,
    title: 'Меню',
    list: this.headerOptions.list,
    tel: this.headerOptions.tel,
    btn: this.headerOptions.btn,
  }

  footerOptions = {
    logoSrc: 'images/footer/logo-footer.svg',
    devDesc: 'Девелопер проекта: ',
    devLogoSrc: 'images/footer/dev-logo.svg',
    socList: [
      { href: '#', icon: 'vk' },
      { href: '#', icon: 'instagram' },
      { href: '#', icon: 'facebook' },
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
      { text: 'Правовая информация', href: '/information' },
      { text: 'Политика конфиденциальности', href: '/privacy-policy' },
    ],
    disclaimer: 'Любая информация, представленная на данном сайте, носит исключительно информационный характер и ни '
      + 'при каких условиях не является публичной офертой, определяемой положениями статьи 437 ГК РФ.',
    webDev: { href: 'https://alertgroup.ru/ru', text: 'AlertGroup' },
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-color: $white;
  padding: 0 !important;
  position: relative;
  z-index: 3000;

  @media #{$mq-md} {
    padding-top: 0 !important;
  }
}
</style>
