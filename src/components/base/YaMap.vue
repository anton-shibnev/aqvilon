<template>
  <yandex-map
    :class="name"
    :coords="coords"
    zoom="15"
    :behaviors="['drag']"
    :controls="['zoomControl']"
  >
    <ymap-marker
      class="y-maps-balloon"
      :coords="officeCoords"
      marker-id="blabla"
      :icon="iconOfficeLayout"
      :hint-content="
        `<span style='margin-right: 15px'>Офис продаж расположен по адресу: Московский просп., 73, корп. 6</span>`
      "
    />
    <ymap-marker
      class="y-maps-balloon"
      :coords="coords"
      marker-id="bla"
      :icon="iconLayout"
      :hint-content="
        `<span style='margin-right: 15px'>БЦ расположен по адресу: Московский пр., дом 83, литера Н</span>`
      "
    />
  </yandex-map>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Vue, Component, Prop } from 'vue-property-decorator';
import { yandexMap, ymapMarker } from 'vue-yandex-maps';

@Component({
  components: { yandexMap, ymapMarker },
})
export default class YaMap extends Vue {
  @Prop({ type: Object }) options: never | undefined;

  name = 'ya-map';

  coords = [59.902203, 30.312392];
  officeCoords = [59.905497, 30.316686];

  iconLayout = {
    layout: 'default#imageWithContent',
    imageSize: [67, 69],
    imageOffset: [-34, -69],
    imageHref: '/map-building-icon.svg',
  }

  iconOfficeLayout = {
    layout: 'default#imageWithContent',
    imageSize: [67, 69],
    imageOffset: [-34, -69],
    imageHref: '/map-office-icon.svg',
  };
}
</script>

<style lang="scss" scoped>
// $
.ya-map {
  @include wh(100%);
}
</style>
