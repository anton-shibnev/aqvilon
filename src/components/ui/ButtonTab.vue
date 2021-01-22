<template>
  <section :class="name">
    <template
      v-for="(item, index) in btnList"
    >
      <h2
        :key="index"
      >
        {{ item.name }}
      </h2>
      <div
        :key="index"
        :class="`${name}__grid`"
      >
        <Btn
          :key="index"
          :label="`${item.name} button`"
          :custom-color="item.color"
        />
        <Btn
          :key="index"
          :label="`${item.name} button`"
          :icon="`svguse:icons.svg#${item.icon}`"
          :custom-color="item.color"
        />
        <Btn
          :key="index"
          round
          :icon="`svguse:icons.svg#${item.icon}`"
          :custom-color="item.color"
        />
      </div>
      <hr
        :key="index"
      >
    </template>
    <h2>Links</h2>
    <div
      :class="`${name}__grid`"
    >
      <a
        href="#"
        class="link"
      >
        Политика конфиденциальности
      </a>
    </div>
    <hr>
    <h2>Checkbox</h2>
    <div
      :class="`${name}__grid`"
    >
      <checkbox>
        <span>
          Я согласен с условиями <a href="#">политики конфиденциальности</a>
        </span>
      </checkbox>
    </div>
    <hr>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Btn from 'components/base/Btn.vue';
import Checkbox from 'components/base/Checkbox.vue';

@Component({
  components: { Checkbox, Btn },
})
export default class ButtonTab extends Vue {
  name = 'button-tab'
  btnList = [
    {
      name: 'Primary',
      color: 'primary',
      icon: 'telegram',
    },
    {
      name: 'Secondary',
      color: 'secondary',
      icon: 'external-link',
    },
    {
      name: 'Danger',
      color: 'danger',
      icon: 'cross',
    },
  ]
}
</script>

<style lang="scss" scoped>
.button-tab {
  &__grid {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 20px;
    justify-content: start;
    padding-bottom: 20px;
  }
}
</style>
