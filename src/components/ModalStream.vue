<template>
  <modal
    class="modal"
    @close="close()"
  >
    <div class="stream">
      <q-no-ssr>
        <!--        <iframe-->
        <!--          id="fp_embed_player"-->
        <!--          autoplay-->
        <!--          src="https://demo.flashphoner.com:8888/embed_player?urlServer=wss://demo.flashphoner.com:8443&streamName=rtsp://149.126.16.78:22335/rtsp?channelid=5b516626-3069-4a9e-9e87-e9eda6d18735%26login=RtspTTS%26password=9ea09ea2aa2f3beddf0ebbd9304ee453%26streamtype=alternative&mediaProviders=WebRTC,Flash,MSE,WSPlayer?autoplay=1"-->
        <!--          marginwidth="0"-->
        <!--          marginheight="0"-->
        <!--          frameborder="0"-->
        <!--          width="100%"-->
        <!--          height="100%"-->
        <!--          scrolling="no"-->
        <!--          allowfullscreen="allowfullscreen"-->
        <!--        />-->
        <canvas ref="video" />
      </q-no-ssr>
    </div>
  </modal>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Modal from 'components/base/Modal.vue';
import { getModule } from 'vuex-module-decorators';
import UI from 'src/store/modules/UI';

@Component({
  components: { Modal },
})
export default class ModalStream extends Vue {
  ui = getModule(UI, this.$store)

  close() {
    this.ui.TOGGLE_STREAM();
  }

  mounted() {
    /* eslint-disable-next-line global-require,@typescript-eslint/no-var-requires */
    const JSMpeg = require('src/utils/vue-jsmpeg.js');

    const canvas = this.$refs.video;

    // eslint-disable-next-line no-unused-vars
    const player = new JSMpeg.Player('ws://bc.prod.alertgroup.ru/ws', {
      canvas, autoplay: true,
    });
  }
}
</script>

<style lang="scss" scoped>
  .stream {
    align-items: center;
    display: flex;
    height: 100vh;
    justify-content: center;
  }

  .modal {
    background: $black !important;
  }
</style>

<style lang="scss">
  #fp_embed_player body {
    background-color: #0e0f12 !important;
  }
</style>
