<template>
  <q-page
    padding
    class="bg-light-gray"
  >
    <q-tabs
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
      v-model="tab"
    >
      <q-tab
        v-for="(item, index) in tabList"
        :key="index"
        :name="item"
        :label="item"
      />
    </q-tabs>

    <q-separator />

    <q-tab-panels
      animated
      v-model="tab"
    >
      <q-tab-panel
        v-for="(item, index) in tabList"
        :key="index"
        :name="item"
      >
        <typography-tab v-if="item === 'typography'" />
        <button-tab v-if="item === 'buttons'" />
        <elements-tab v-if="item === 'elements'" />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import TypographyTab from 'components/ui/TypographyTab.vue';
import ButtonTab from 'components/ui/ButtonTab.vue';
import ElementsTab from 'components/ui/ElementsTab.vue';

@Component({
  components: {
    ElementsTab,
    ButtonTab,
    TypographyTab,
  },
})

export default class UI extends Vue {
  tab = 'elements'
  tabList = [
    'typography',
    'buttons',
    'elements',
  ]
}
</script>
