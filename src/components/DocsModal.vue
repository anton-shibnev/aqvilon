<template>
  <modal @close="close()">
    <div
      :class="`${name}__content`"
    >
      <div
        :class="`${name}__title`"
      >
        Документация
      </div>
      <a-input
        label="Поиск по документам"
        :class="`${name}__search-input`"
        v-model="searchValue"
      >
        <template #prepend>
          <q-icon name="search" />
        </template>
      </a-input>
      <div
        v-if="searchValue.length"
        :class="`${name}__list`"
      >
        <div
          v-for="(doc, i) in searchDoc"
          :key="i"
          :class="`${name}__doc`"
        >
          <div
            :class="`${name}__doc-title`"
            v-text="doc.name"
          />
          <div
            :class="`${name}__doc-list`"
          >
            <file-box
              v-for="(item, j) in [...doc.docs]"
              :key="j"
              :options="item"
            />
          </div>
        </div>
      </div>
      <div
        v-else
        :class="`${name}__list`"
      >
        <div
          v-for="(doc, i) in ui.documents.documents_sets"
          :key="i"
          :class="`${name}__doc`"
        >
          <div
            :class="`${name}__doc-title`"
            v-text="doc.name"
          />
          <div
            :class="`${name}__doc-list`"
          >
            <file-box
              v-for="(item, j) in [...doc.docs]"
              :key="j"
              :options="item"
            />
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import FileBox from 'components/base/FileBox.vue';
import AInput from 'components/base/AInput.vue';
import Modal from 'components/base/Modal.vue';
import { getModule } from 'vuex-module-decorators';
import UI from 'src/store/modules/UI';

@Component({
  components: {
    Modal,
    AInput,
    FileBox,
  },
  async preFetch({ store }) {
    const ui = getModule(UI, store);
    await ui.getDocuments();
  },
})
export default class DocsModal extends Vue {
  @Prop({ type: Object }) options: never | undefined

  name = 'docs-modal'

  ui = getModule(UI, this.$store);

  searchValue = ''

  get searchDoc() {
    const matches: any = [];
    /* eslint array-callback-return: "warn" */
    this.ui.documents.documents_sets.forEach((item: { docs: any[]; name: any; }) => {
      item.docs.find((doc: { title: string; }) => {
        const needle = doc.title.toLowerCase().includes(this.searchValue.toLowerCase());
        if (needle) {
          matches.push({ name: item.name, docs: [doc] });
        }
      });
    });
    return matches;
  }

  async close(): Promise<void> {
    await this.$router.push('/');
  }
}
</script>

<style lang="scss" scoped>
// $
.docs-modal {
  &__content {
    @extend %container-kid;

    @include padding-y-arr((
      "mob": 38px,
      "xs": 75px
    ));

    padding-left: 15px;
    padding-right: 15px;
  }

  &__title {
    @include font(
      ("mob": 34px, "xs": 60px),
      ("mob": 1.29, "xs": 1.07),
      ("mob": 500, "xs": 400),
      ("mob": 0.25px, "xs": -0.5px)
    );
  }

  &__list {
    @include bp-change(margin-top, ("mob": 29px, "xs": 74px));
    @include bp-change(grid-gap, ("mob": 29px, "xs": 74px));

    display: grid;
  }

  &__search-input {
    @include bp-change(margin-top, ("mob": 30px, "xs": 85px));
  }

  &__doc-title {
    //@include font(
    //  ("mob": 20px, "xs": 24px),
    //  ("mob": 1.2, "xs": 1.17),
    //  ("mob": 500),
    //  ("mob": 0.15px, "xs": 0)
    //);
  }

  &__doc-list {
    @include bp-change(margin-top, ("mob": 20px, "xs": 43px));
    @include bp-change(grid-gap, ("mob": 19px, "xs": 17px));

    display: grid;
  }
}
</style>
