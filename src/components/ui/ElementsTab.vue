<template>
  <section :class="name">
    <h2>SPECIAL OFFER</h2>
    <div class="__box">
      <special-offer />
    </div>
    <h2>ICONS</h2>
    <div class="__icon-list">
      <q-icon
        v-for="item in iconList"
        :key="item"
        class="__icon"
        :name="`svguse:icons.svg#${item}`"
      />
    </div>
    <hr>
    <h2>INPUT</h2>
    <a-input
      label="Ваше Имя"
    />
    <hr>
    <h2>DROPDOWN - 1</h2>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import SpecialOffer from 'components/hero/SpecialOffer.vue';
import AInput from 'components/base/AInput.vue';

@Component({
  components: { AInput, SpecialOffer },
})
export default class ElementsTab extends Vue {
  @Prop({ type: Object }) options: never | undefined

  name = 'elements-tab'

  iconList = [
    'maze',
    'bricklaying',
    'palette',
    'todo',
    'analytics',
    'cal',
    'special-offer',
    'pedestrian',
    'car',
  ]
}
</script>

<style lang="scss" scoped>
.elements-tab {
  .__box {
    background-color: $main-color;
    margin-bottom: 40px;
    padding: 24px;
  }

  .__icon-list {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 30px;
    justify-content: start;
  }

  .__icon {
    color: $danger;
    font-size: 64px;
  }
}
</style>
