<template>
  <q-img
    v-bind="$props"
    :class="[name, { [`${name}--dark`]: dark }]"
    v-on="$listeners"
  >
    <slot
      v-for="(_, name) in $slots"
      :slot="name"
      :name="name"
    />
    <template
      v-for="(_, name) in $scopedSlots"
      :slot="name"
      slot-scope="slotData"
    >
      <slot
        :name="name"
        v-bind="slotData"
      />
    </template>
  </q-img>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { QImg } from 'quasar';

@Component
export default class Pic extends QImg {
  @Prop({ type: Boolean, default: true }) dark?: boolean

  name = 'pic'
}
</script>

<style lang="scss" scoped>
// $
.pic {
  &--dark {
    ::v-deep {
      .q-img__content {
        // background-color: rgba($main-color, 0.32);
      }
    }
  }
}

</style>
