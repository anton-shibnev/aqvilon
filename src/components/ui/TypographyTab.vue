<template>
  <section :class="name">
    <div class="main-title">
      Montserrat
    </div>
    <hr>
    <template
      v-for="n in 7"
    >
      <div
        :key="n"
        :class="`h${n}`"
      >
        Montserrat Medium
      </div>
      <hr
        :key="n"
      >
    </template>
    <template
      v-for="n in 7"
    >
      <div
        :key="n"
        :class="`sp-${n}-1`"
      >
        Roboto Medium
      </div>
      <hr
        :key="n"
      >
    </template>
    <template
      v-for="n in 7"
    >
      <div
        :key="n"
        :class="`sp-${n}-2`"
      >
        Roboto Regular
      </div>
      <hr
        :key="n"
      >
    </template>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class TypographyTab extends Vue {
  @Prop({ type: Object }) options: never | undefined

  name = 'typography-tab'
}
</script>
