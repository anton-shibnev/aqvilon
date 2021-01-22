<template>
  <GmapMap />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class GoogleMap extends Vue {
  @Prop({ type: Object }) options: never | undefined

  bem = 'google-map'
}
</script>

<style lang="scss" scoped>
// $
.google-map {
  @include wh(100%);
}
</style>
