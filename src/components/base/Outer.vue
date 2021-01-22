<template>
  <section
    :class="name"
  >
    <div class="container">
      <slot />
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Outer extends Vue {
  @Prop({ type: Object }) options: never | undefined

  name = 'outer'
}
</script>

<style lang="scss" scoped>
// $

.outer {
  @include padding-y-arr($outer-padding);
  //
  //@media #{$mq-xs} {
  //  @include padding-y($outer-padding-xs);
  //}
  //
  //@media #{$mq-md} {
  //  @include padding-y($outer-padding-md);
  //}
  //
  //@media #{$mq-lg} {
  //  @include padding-y($outer-padding-lg);
  //}
}
</style>
